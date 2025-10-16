    void Renderer::CreateDescriptorSetLayouts()
    {
        // UBO (VS and FS)
        VK::DescriptorSetLayoutBinding uboBinding{};
        VK::DescriptorSetLayoutBindingBuilder(uboBinding)
            .SetDescriptorType(VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER)
            .SetStageFlags(VK_SHADER_STAGE_VERTEX_BIT | VK_SHADER_STAGE_FRAGMENT_BIT)
            .Build();

        // Storage buffer (FS)
        VK::DescriptorSetLayoutBinding ssboBinding{};
        VK::DescriptorSetLayoutBindingBuilder(ssboBinding)
            .SetDescriptorType(VK_DESCRIPTOR_TYPE_STORAGE_BUFFER)
            .SetStageFlags(VK_SHADER_STAGE_FRAGMENT_BIT)
            .Build();

        // Sampler (VS and FS)
        VK::DescriptorSetLayoutBinding samplerBinding{};
        VK::DescriptorSetLayoutBindingBuilder(samplerBinding)
            .SetDescriptorType(VK_DESCRIPTOR_TYPE_SAMPLER)
            .SetStageFlags(VK_SHADER_STAGE_VERTEX_BIT | VK_SHADER_STAGE_FRAGMENT_BIT)
            .Build();

        // Combined Image Sampler FS
        VK::DescriptorSetLayoutBinding combinedImageSamplerBinding{};
        VK::DescriptorSetLayoutBindingBuilder(combinedImageSamplerBinding)
            .SetDescriptorType(VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER)
            .SetStageFlags(VK_SHADER_STAGE_VERTEX_BIT | VK_SHADER_STAGE_FRAGMENT_BIT)
            .Build();

        // Sampled image (FS)
        VK::DescriptorSetLayoutBinding textureBinding{};
        VK::DescriptorSetLayoutBindingBuilder(textureBinding)
            .SetDescriptorType(VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE)
            .SetStageFlags(VK_SHADER_STAGE_FRAGMENT_BIT)
            .Build();

        // Bindless array (FS)
        VK::DescriptorSetLayoutBinding textureArrayBinding{};
        VK::DescriptorSetLayoutBindingBuilder(textureArrayBinding)
            .SetDescriptorType(VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE)
            .SetStageFlags(VK_SHADER_STAGE_FRAGMENT_BIT)
            .SetDescriptorCount(1024)
            .SetBindingFlags(
                VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT |
                VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT
            )
            .Build();

        // UBO DescriptorSet with camera data
        VK::DescriptorSetLayoutBuilder(m_CameraDescriptorSetLayout)
            .SetDescriptorSetLayoutBindings({ uboBinding })
            .Build(m_Context);
        m_DeletionQueue.PushDestroy(m_Context, m_CameraDescriptorSetLayout, "m_CameraDescriptorSetLayout");

        //Material set
        VK::DescriptorSetLayoutBuilder(m_MaterialDescriptorSetLayout)
            .SetDescriptorSetLayoutBindings({
                ssboBinding,        // material data
                samplerBinding,     // sharedSampler
                textureArrayBinding // texture array
                })
            .Build(m_Context);
        m_DeletionQueue.PushDestroy(m_Context, m_MaterialDescriptorSetLayout, "m_MaterialDescriptorSetLayout");

        //GBuffer set
        VK::DescriptorSetLayoutBuilder(m_GBufferDescriptorSetLayout)
            .SetDescriptorSetLayoutBindings({
                samplerBinding,                 // sharedSampler
                textureBinding,                 // depth
                textureBinding,                 // albedo
                textureBinding,                 // normal
                textureBinding,                 // metallicRoughness
                combinedImageSamplerBinding,    // environmentMap
                combinedImageSamplerBinding     // diffuseIrradienceMap
                })
            .Build(m_Context);
        m_DeletionQueue.PushDestroy(m_Context, m_GBufferDescriptorSetLayout, "m_GBufferDescriptorSetLayout");
    
        //Lights set
        VK::DescriptorSetLayoutBuilder(m_LightsDescriptorSetLayout)
            .SetDescriptorSetLayoutBindings({ ssboBinding }) // Lights Data
            .Build(m_Context);
        m_DeletionQueue.PushDestroy(m_Context, m_LightsDescriptorSetLayout, "m_LightsDescriptorSetLayout");
        
        //HDR set
        VK::DescriptorSetLayoutBuilder(m_PostProcessDescriptorSetLayout)
            .SetDescriptorSetLayoutBindings({ combinedImageSamplerBinding }) // HDRI
            .Build(m_Context);
        m_DeletionQueue.PushDestroy(m_Context, m_PostProcessDescriptorSetLayout, "m_PostProcessDescriptorSetLayout");
    }