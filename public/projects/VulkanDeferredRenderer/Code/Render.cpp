void pom::DepthPrePass::Record(const Context& context, CommandBuffer& commandBuffer, const GeometryPass& gPass, uint32_t imageIndex, const Image& depthImage, const Scene* pScene, Camera* pCamera) const
{
	// -- Update Vertex UBO --
	UniformBufferVS ubo;
	ubo.view = pCamera->GetViewMatrix();
	ubo.proj = pCamera->GetProjectionMatrix();
	vmaCopyMemoryToAllocation(context.allocator, &ubo, m_vUniformBuffers[imageIndex].GetMemoryHandle(), 0, sizeof(ubo));

	// -- Set Up Attachments --
	VkRenderingAttachmentInfo depthAttachment{};
	depthAttachment.sType = VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO;
	depthAttachment.imageView = depthImage.GetView().GetHandle();
	depthAttachment.imageLayout = depthImage.GetCurrentLayout();
	depthAttachment.loadOp = VK_ATTACHMENT_LOAD_OP_CLEAR;
	depthAttachment.storeOp = VK_ATTACHMENT_STORE_OP_STORE;
	depthAttachment.clearValue.depthStencil = { .depth = 1.0f, .stencil = 0 };

	// -- Render Info --
	VkRenderingInfo renderingInfo{};
	renderingInfo.sType = VK_STRUCTURE_TYPE_RENDERING_INFO;
	renderingInfo.renderArea = VkRect2D{ VkOffset2D{0, 0}, depthImage.GetExtent2D() };
	renderingInfo.layerCount = 1;
	renderingInfo.pDepthAttachment = &depthAttachment;

	// -- Render --
	const VkCommandBuffer& vCmdBuffer = commandBuffer.GetHandle();
	Debugger::BeginDebugLabel(commandBuffer, "Depth Pre-Pass", glm::vec4(0.6f, 0.2f, 0.8f, 1));
	vkCmdBeginRendering(vCmdBuffer, &renderingInfo);
	{
		// -- Set Dynamic Viewport --
		VkViewport viewport;
		viewport.x = 0.0f;
		viewport.y = 0.0f;
		viewport.width = static_cast<float>(depthImage.GetExtent2D().width);
		viewport.height = static_cast<float>(depthImage.GetExtent2D().height);
		viewport.minDepth = 0.0f;
		viewport.maxDepth = 1.0f;
		Debugger::InsertDebugLabel(commandBuffer, "Bind Viewport", glm::vec4(0.2f, 1.f, 0.2f, 1.f));
		vkCmdSetViewport(vCmdBuffer, 0, 1, &viewport);

		// -- Set Dynamic Scissors --
		VkRect2D scissor;
		scissor.offset = { .x = 0, .y = 0 };
		scissor.extent = depthImage.GetExtent2D();
		Debugger::InsertDebugLabel(commandBuffer, "Bind Scissor", glm::vec4(1.f, 1.f, 0.2f, 1.f));
		vkCmdSetScissor(vCmdBuffer, 0, 1, &scissor);

		// -- Bind Descriptor Sets --
		Debugger::InsertDebugLabel(commandBuffer, "Bind Uniform Buffer", glm::vec4(0.f, 1.f, 1.f, 1.f));
		vkCmdBindDescriptorSets(vCmdBuffer, VK_PIPELINE_BIND_POINT_GRAPHICS, m_PipelineLayout.GetHandle(), 0, 1, &m_vUniformDS[imageIndex].GetHandle(), 0, nullptr);

		Debugger::InsertDebugLabel(commandBuffer, "Bind Textures", glm::vec4(0.f, 1.f, 1.f, 1.f));
		vkCmdBindDescriptorSets(vCmdBuffer, VK_PIPELINE_BIND_POINT_GRAPHICS, m_PipelineLayout.GetHandle(), 1, 1, &gPass.GetTexturesDescriptorSet().GetHandle(), 0, nullptr);

		// -- Bind Pipeline --
		Debugger::InsertDebugLabel(commandBuffer, "Bind Pipeline (Depth PrePass)", glm::vec4(0.2f, 0.4f, 1.f, 1.f));
		vkCmdBindPipeline(vCmdBuffer, VK_PIPELINE_BIND_POINT_GRAPHICS, m_Pipeline.GetHandle());

		// -- Draw Models --
		for (const Model& model : pScene->GetModels())
		{
			// -- Bind Model Data --
			model.Bind(commandBuffer);

			// -- Draw Opaque --
			for (const Mesh& mesh : model.opaqueMeshes)
			{
				// -- Bind Push Constants --
				Debugger::InsertDebugLabel(commandBuffer, "Push Constants", glm::vec4(1.f, 0.6f, 0.f, 1.f));
				PCModelDataVS pcvs
				{
					.model = mesh.matrix
				};
				vkCmdPushConstants(vCmdBuffer, m_PipelineLayout.GetHandle(), VK_SHADER_STAGE_VERTEX_BIT, 0,
					sizeof(PCModelDataVS), &pcvs);

				glm::uvec3 pcfs
				{
					/*.diffuseIdx*/ mesh.material.albedoIdx,
					/*.opacityIdx*/ mesh.material.opacityIdx,
					/*.textureCount*/ gPass.GetBoundTextureCount(),
				};
				vkCmdPushConstants(vCmdBuffer, m_PipelineLayout.GetHandle(), VK_SHADER_STAGE_FRAGMENT_BIT, sizeof(PCModelDataVS),
					sizeof(pcfs), &pcfs);

				// -- Drawing Time! --
				vkCmdDrawIndexed(vCmdBuffer, mesh.indexCount, 1, mesh.indexOffset, mesh.vertexOffset, 0);
				Debugger::InsertDebugLabel(commandBuffer, "Draw Opaque Mesh - " + mesh.name, glm::vec4(0.4f, 0.8f, 1.f, 1.f));
			}
		}
	}
	vkCmdEndRendering(vCmdBuffer);
	Debugger::EndDebugLabel(commandBuffer);
}
