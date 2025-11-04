	void Renderer::RenderGPU() const
	{
		if (!m_IsDirectXInitialized)
			return;

		// Clear RTV & DSV
		if (m_UseUniformClearColor)
		{
			float color[4]{ m_UniformClearColor.r, m_UniformClearColor.g, m_UniformClearColor.b, 1.f };
			m_pDeviceContext->ClearRenderTargetView(m_pRenderTargetView, color);
		}
		else
			m_pDeviceContext->ClearRenderTargetView(m_pRenderTargetView, m_DirectXClearColor);
		m_pDeviceContext->ClearDepthStencilView(m_pDepthStencilView, D3D11_CLEAR_DEPTH | D3D11_CLEAR_STENCIL, 1.f, 0);
	
		// Set PIPELINE + INVOKE DRAW CALLS (=RENDER)
		for (const std::unique_ptr<Mesh>& pMesh : m_pMeshes)
			pMesh->RenderGPU(m_pDeviceContext, m_pCamera->GetViewProjectionMatrix(), m_pCamera->origin, m_SamplerState, m_CullMode);

		// Present Backbuffer (SWAP)
		m_pSwapChain->Present(0, 0);
	}
    