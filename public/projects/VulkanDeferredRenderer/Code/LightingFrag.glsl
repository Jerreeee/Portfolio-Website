#version 450
#extension GL_EXT_samplerless_texture_functions : enable

layout(push_constant) uniform Push {
    int lightCount;
} pc;

layout(location = 0) in vec2 inTexCoord;
layout(location = 0) out vec4 outColor;

// Camera
layout(set = 0, binding = 0) uniform CameraUBO {
    mat4 _view;
    mat4 _proj;
    mat4 invView;
    mat4 invProj;
    vec3 worldPos;
    float _pad0;
} camera;

// G-buffer
layout(set = 1, binding = 0) uniform sampler   sharedSampler;
layout(set = 1, binding = 1) uniform texture2D depthMap;
layout(set = 1, binding = 2) uniform texture2D albedoMap;               // SRGB view -> samples in linear
layout(set = 1, binding = 3) uniform texture2D normalMap;               // world-space, encoded to [0,1]
layout(set = 1, binding = 4) uniform texture2D metallicRoughnessMap;    // .r = metallic, .g = roughness
layout(set = 1, binding = 5) uniform samplerCube environmentMap;        // cubemap, use samplerCube() function
layout(set = 1, binding = 6) uniform samplerCube diffuseIrradienceMap;  // cubemap, use samplerCube() function

// Light model
const float PI = 3.14159265359;
const int LIGHT_DIRECTIONAL = 0;
const int LIGHT_POINT       = 1;

struct Light
{
    // xyz = dirToLight (directional) OR position (point)
    // w   = type (0 = directional, 1 = point)
    vec4 posDir_type;

    // rgb = color (unit rgb)
    // a   = intensity:
    //  - LIGHT_DIRECTIONAL: illuminance, lux (lm/m^2, luminous flux per unit area)
    //  - LIGHT_POINT: luminous flux, lumens (lm, total luminous flux emitted in all directions)
    vec4 color_intensity;
};

// SSBO with lights
layout(set = 2, binding = 0) readonly buffer LightBuffer {
    Light lights[];
} lightSSBO;

// Single hardcoded DIRECTIONAL light
const Light lights[1] = Light[1](
    Light(
        vec4(normalize(-vec3(0.577, -0.577, -0.577)), float(LIGHT_DIRECTIONAL)), // toward light, type
        vec4(vec3(1.0), 1.0)                                                     // color, lux
    )
);

float DistributionGGX(float NdotH, float alpha)
{
    float a2 = alpha * alpha;
    float d  = (NdotH * NdotH) * (a2 - 1.0) + 1.0;
    return a2 / (PI * d * d);
}

float GeometrySchlickGGX(float NdotX, float k)
{
    return NdotX / (NdotX * (1.0 - k) + k);
}

float GeometrySmith(float NdotV, float NdotL, float roughness)
{
    float k = (roughness + 1.0);
    k = (k * k) / 8.0;
    return GeometrySchlickGGX(NdotV, k) * GeometrySchlickGGX(NdotL, k);
}

vec3 FresnelSchlick(float cosTheta, vec3 F0)
{
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

vec3 FresnelSchlickRoughness(float cosTheta, vec3 F0, float roughness)
{
    return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}  

vec3 GetWorldPositionFromDepth(float depth, ivec2 fragCoords, ivec2 resolution,
                               mat4 invProj, mat4 invView)
{
    vec2 ndc;
    ndc.x = ((float(fragCoords.x) + 0.5) / float(resolution.x)) * 2.0 - 1.0;
    ndc.y = ((float(fragCoords.y) + 0.5) / float(resolution.y)) * 2.0 - 1.0;

    vec4 viewPos = invProj * vec4(ndc, depth, 1.0);
    viewPos /= viewPos.w;
    return (invView * viewPos).xyz;
}

float GeometrySchlickGGX_Direct(in float NdotV, in float roughness)
{
    float r = (roughness + 1.0);
    float k = (r * r) / 8.0;

    float num = NdotV;
    float denom = NdotV * (1.0 - k) + k;

    return num / denom;
}

float GeometrySchlickGGX_Indirect(float NdotV, float roughness)
{
    // IBL uses different k
    float a = roughness;
    float k = (a * a) / 2.0;

    float num = NdotV;
    float denom = NdotV * (1.0 - k) + k;

    return num / denom;
}

float GeometrySmith(in vec3 normal, in vec3 viewDirection, in vec3 lightDirection,
                    in float roughness, in bool indirectLighting)
{
    float NdotV = max(dot(normal, viewDirection), 0.0);
    float NdotL = max(dot(normal, lightDirection), 0.0);
    float ggx2 = 0.0;
    float ggx1 = 0.0;
    if (indirectLighting)
    {
        ggx2 = GeometrySchlickGGX_Indirect(NdotV,  roughness);
        ggx1 = GeometrySchlickGGX_Indirect(NdotL,  roughness);
    }
    else
    {
        ggx2 = GeometrySchlickGGX_Direct(NdotV,  roughness);
        ggx1 = GeometrySchlickGGX_Direct(NdotL,  roughness);
    }

    return ggx1 * ggx2;
}

void main()
{
    float exposureCompensation = 1.0;
    float skyIntensity = 3.0;

    // Fetch Depth
    float depth = texelFetch(sampler2D(depthMap, sharedSampler), ivec2(gl_FragCoord.xy), 0).r;
    ivec2 resolution = textureSize(depthMap, 0);
    vec3 worldPosition = GetWorldPositionFromDepth(depth, ivec2(gl_FragCoord.xy), resolution,
                                                   camera.invProj, camera.invView);
    // Skybox rendering
    if (depth >= 1.f)
    {
        const vec3 sampleDirection = normalize(worldPosition.xyz);
        vec3 sky = texture(environmentMap, sampleDirection).rgb;
        outColor = vec4(sky, 1.f) * skyIntensity;
        return;
    }

    // GBuffer fetch
    vec3 albedo = texture(sampler2D(albedoMap, sharedSampler), inTexCoord).rgb;
    vec3 normalWS = normalize(texture(sampler2D(normalMap, sharedSampler), inTexCoord).rgb * 2.0 - 1.0);
    vec2 mr = texture(sampler2D(metallicRoughnessMap, sharedSampler), inTexCoord).rg;
    float metallic  = clamp(mr.r, 0.0, 1.0);
    float roughness = clamp(mr.g, 0.045, 1.0);
    float ao = 1.0;

    // View vector
    vec3 V = normalize(camera.worldPos - worldPosition);
    float NdotV = max(dot(normalWS, V), 0.0);

    // Material setup
    vec3 F0 = mix(vec3(0.04), albedo, metallic);

    // Accumulate lighting
    vec3 Lo = vec3(0.0); //outgoing radiance

     for (int i = 0; i < pc.lightCount; ++i)
     {
        Light l = lightSSBO.lights[i];

        vec3 lightDir;
        vec3 irradiance;

        // Add 0.5 to ensure correct light type
        // Example: 1.0 might become 0.99 etc. -> rounded becomes 0 (wrong type)
        int type = int(l.posDir_type.w + 0.5);
        vec3 color = l.color_intensity.rgb;
        float intensity = l.color_intensity.a;

        if (type == LIGHT_DIRECTIONAL)
        {
            // lightDir is constant, radiance is constant (lux)
            lightDir = normalize(l.posDir_type.xyz);
            irradiance = color * intensity;
        }
        else
        {
            // compute 1/r^2 falloff from position
            vec3 delta = l.posDir_type.xyz - worldPosition;
            float dist2 = max(dot(delta, delta), 1e-4);
            lightDir = delta * inversesqrt(dist2);

            // Convert lumens -> candela assuming isotropic emission
            // cd = lm / (4 * PI)
            float luminousIntensity = intensity / (4.0 * PI);

            // Illuminance (lux) = candela / r^2
            float illuminance = luminousIntensity / dist2;
            irradiance = color * illuminance;
        }

        float NdotL = max(dot(normalWS, lightDir), 0.0);
        if (NdotL > 0.0)
        {
            vec3 H = normalize(V + lightDir);
            float NdotH = max(dot(normalWS, H), 0.0);
            float HdotV = max(dot(H, V), 0.0);

            float D = DistributionGGX(NdotH, roughness);
            float G = GeometrySmith(NdotV, NdotL, roughness);
            vec3  F = FresnelSchlick(HdotV, F0);

            vec3 specular = (D * G * F) / max(4.0 * NdotV * NdotL, 1e-4);
            vec3 diffuse  = (1.0 - F) * (1.0 - metallic) * albedo / PI;

            Lo += (diffuse + specular) * irradiance * NdotL;
        }
    }

    // Calculate diffuse and specular terms based on roughness
    vec3 F  = FresnelSchlickRoughness(max(dot(normalWS, V), 0.f), F0, roughness);
    vec3 kS = F;
    vec3 kD = 1.f - kS;
    kD *= 1.f - metallic;

    // Calculate ambient diffuse lighting
    const vec3 prefilteredDiffuseIrradiance = texture(diffuseIrradienceMap,
        vec3(normalWS.x, -normalWS.y, normalWS.z)).rgb; // Invert Y due to coordinate system
    const vec3 diffuse = prefilteredDiffuseIrradiance * albedo.rgb;

    // Finalize color
    vec3 ambient    = kD * diffuse * exposureCompensation;
    vec3 finalColor = ambient + Lo;
    outColor = vec4(finalColor, 1.0);
}