    void Renderer::TransitionToDepthPrePass(const RenderPassInfo& info)
    {
        VK::Debug::Label label = m_Context.GetDebugUtils().CreateLabel(info.cmdb, "Transition To DepthPass", { 1.0, 0.0, 0.0, 1.0 });

        m_DepthImages[info.imageIdx].TransitionImageLayout(info.cmdb, VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL,
            { VK_IMAGE_ASPECT_DEPTH_BIT, VK::StageAccess::NONE, VK::StageAccess::EARLY_AND_LATE_FRAG_DEPTH_STENCIL_READ_WRITE });
    }
    void Renderer::DepthPrePass(const RenderPassInfo& info)
    {
        VK::Debug::Label label = m_Context.GetDebugUtils().CreateLabel(info.cmdb, "DepthPass", { 1.0, 0.0, 0.0, 1.0 });

        VkClearValue prepassDepthClear{};
        prepassDepthClear.depthStencil = { 1.0f, 0 };

        VkRenderingAttachmentInfo prepassDepthAttachment{};
        prepassDepthAttachment.sType = VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO;
        prepassDepthAttachment.imageView = m_DepthImageViews[info.imageIdx].GetHandle();
        prepassDepthAttachment.imageLayout = VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL;
        prepassDepthAttachment.loadOp = VK_ATTACHMENT_LOAD_OP_CLEAR;
        prepassDepthAttachment.storeOp = VK_ATTACHMENT_STORE_OP_STORE;
        prepassDepthAttachment.clearValue = prepassDepthClear;

        VkRenderingInfo renderInfo{};
        renderInfo.sType = VK_STRUCTURE_TYPE_RENDERING_INFO;
        renderInfo.renderArea = { {0, 0}, m_Swapchain.GetExtent2D() };
        renderInfo.layerCount = 1;
        renderInfo.colorAttachmentCount = 0;
        renderInfo.pDepthAttachment = &prepassDepthAttachment;

        vkCmdBeginRendering(info.cmdb, &renderInfo);

        vkCmdBindPipeline(info.cmdb, VK_PIPELINE_BIND_POINT_GRAPHICS, m_DepthPrePassPipeline.GetHandle());
        vkCmdSetViewport(info.cmdb, 0, 1, &info.viewport);
        vkCmdSetScissor(info.cmdb, 0, 1, &info.scissor);
        vkCmdBindVertexBuffers(info.cmdb, 0, 1, &info.vertexBuffers[0], &info.offsets[0]);
        vkCmdBindIndexBuffer(info.cmdb, m_pScene->GetIndexBuffer().GetHandle(), 0, VK_INDEX_TYPE_UINT32);

        VkDescriptorSet sets[] = {
            m_CameraDescriptorSets[info.imageIdx],
            m_MaterialsDescriptorSet
        };
        vkCmdBindDescriptorSets(info.cmdb, VK_PIPELINE_BIND_POINT_GRAPHICS, m_DepthPrePassPipelineLayout.GetHandle(),
            0, static_cast<uint32_t>(std::size(sets)), sets, 0, nullptr);

        //Loop through meshes and draw them
        const auto& drawInfos = m_pScene->GetDrawInfos();
        for (const auto& drawInfo : drawInfos)
        {
            DepthPrepassPushConstants pc{};
            pc.model = glm::mat4(1.0f); //Models are preTransformed (use drawInfo.modelMat when not using preTransformed vertices)
            pc.materialIdx = drawInfo.materialIndex;

            vkCmdPushConstants(info.cmdb, m_GBufferPassPipelineLayout.GetHandle(), VK_SHADER_STAGE_VERTEX_BIT | VK_SHADER_STAGE_FRAGMENT_BIT,
                0, sizeof(DepthPrepassPushConstants), &pc
            );
            vkCmdDrawIndexed(info.cmdb, drawInfo.indexCount, 1, drawInfo.indexOffset, 0, 0);
        }

        vkCmdEndRendering(info.cmdb);
    }
