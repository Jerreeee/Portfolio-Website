	void Renderer::CPUPixelShader(const PixelData& p, const Material& mat)
	{
		ColorRGB finalColor{ 1.f, 1.f, 1.f };
		const Vector3 lightDirection = { 0.577f, -0.577f, 0.577f };
		const float lightIntensity = 7.f;
		const float shininess = 25.f;
		const ColorRGB ambientColor = { 0.03f, 0.03f, 0.03f };

		if (m_ShowDepth)
		{
			float depthColor = Remap(p.position.z, 0.985f, 1.f, 0.f, 1.f); //0.9998f
			finalColor = { depthColor, depthColor, depthColor };
		}
		else
		{
			Vector3 normal = p.normal;
			if (m_ShowNormalMap)
			{
				Vector3 biNormal = Vector3::Cross(normal, p.tangent);
				Matrix tangentSpaceAxis = Matrix{ p.tangent, biNormal, normal, Vector3::Zero };
				normal = mat.pNormalMap->Sample(p.uv); //x,y: 0->1 z: 0.5->1
				normal = (2.f * normal) - 1.f; //x,y: -1->1 z: 0->1
				normal = tangentSpaceAxis.TransformVector(normal);
			}

			float observedArea = 1.f;
			if (m_ShadingMode == ShadingMode::ObservedArea || m_ShadingMode == ShadingMode::Combined)
				observedArea = std::max(0.f, Vector3::Dot(-lightDirection, normal));

			float kd = 0.7f;
			ColorRGB pixelColor = mat.pDiffuseMap->Sample(p.uv);
			ColorRGB diffuse{};
			if (m_ShadingMode == ShadingMode::Diffuse || m_ShadingMode == ShadingMode::Combined)
				diffuse = Lambert(kd, pixelColor);

			float ks = 1 - 0.7f;
			ColorRGB specularColor = mat.pSpecularMap->Sample(p.uv);
			float glossiness = shininess * mat.pGlossinessMap->Sample(p.uv).r;
			ColorRGB specular{};
			if (m_ShadingMode == ShadingMode::Specular || m_ShadingMode == ShadingMode::Combined)
				specular = Phong(ks, glossiness, specularColor, lightDirection, p.viewDirection, normal);

			ColorRGB BRDF{ colors::White };
			if (m_ShadingMode != ShadingMode::ObservedArea)
				BRDF = diffuse + specular + ambientColor;

			finalColor = lightIntensity * BRDF * observedArea;
		}

		//Update Color in Buffer
		finalColor.MaxToOne();
		SetPixelColor(finalColor, int(p.position.x), int(p.position.y));
	}
    