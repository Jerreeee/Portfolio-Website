	void Mesh::RenderGPU(ID3D11DeviceContext* pDeviceContext, const Matrix& viewProjMat, const Vector3& cameraPos, SamplerState diffuseSamplerState, CullMode cullMode) const
	{
		if (!m_Visible || m_RenderMethod == RasterizerMethod::CPURasterizer)
			return;

		// Set Primitive Topology
		pDeviceContext->IASetPrimitiveTopology(D3D11_PRIMITIVE_TOPOLOGY_TRIANGLELIST);
		
		// Set Input Layout
		pDeviceContext->IASetInputLayout(m_pInputLayout);
		
		// Set VertexBuffer
		constexpr UINT stride = sizeof(VertexIn);
		constexpr UINT offset = 0;
		pDeviceContext->IASetVertexBuffers(0, 1, &m_pVertexBuffer, &stride, &offset);
		
		// Set Index Buffer
		pDeviceContext->IASetIndexBuffer(m_pIndexBuffer, DXGI_FORMAT_R32_UINT, 0);

		// Update shader variables
		//WorldViewProjection matrix
		Matrix worldViewProjMat = m_WorldMatrix * viewProjMat;
		float* pWorldViewProjMatData = reinterpret_cast<float*>(&worldViewProjMat);
		m_pEffect->SetWorldViewProjData(pWorldViewProjMatData);
		if (m_MaterialType == Material::Type::AllMaps)
		{
			EffectAdvanced* pAdvancedEffect = static_cast<EffectAdvanced*>(m_pEffect);
			//World matrix
			const float* pWorldMatData = reinterpret_cast<const float*>(&m_WorldMatrix);
			pAdvancedEffect->SetWorldVariable(pWorldMatData);
			//Camera pos
			const float* pCameraPosData = reinterpret_cast<const float*>(&cameraPos);
			pAdvancedEffect->SetCameraPosVariable(pCameraPosData);
		}
		//Diffuse Sampler state
		m_pEffect->SetDiffuseSamplerState(diffuseSamplerState);
		//CullMode
		m_pEffect->SetCullMode(cullMode);

		// Draw
		D3DX11_TECHNIQUE_DESC techDesc{};
		m_pEffect->GetTechnique()->GetDesc(&techDesc);
		for (UINT p = 0; p < techDesc.Passes; ++p)
		{
			m_pEffect->GetTechnique()->GetPassByIndex(p)->Apply(0, pDeviceContext);
			pDeviceContext->DrawIndexed(m_NumIndices, 0, 0);
		}
	}
    