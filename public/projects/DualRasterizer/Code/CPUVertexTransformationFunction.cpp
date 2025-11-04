	void Renderer::CPUVertexTransformationFunction(std::unique_ptr<Mesh>& pMesh) const
	{
		//Calculate world view projection matrix
		Matrix worldViewProjMatrix = pMesh->m_WorldMatrix * m_pCamera->viewMatrix * m_pCamera->projectionMatrix;
		for (size_t i{}; i < pMesh->m_Vertices.size(); ++i)
		{
			const VertexIn& v = pMesh->m_Vertices[i];
			pMesh->m_ScreenProjVertices[i].position = worldViewProjMatrix.TransformPoint(v.position.x, v.position.y, v.position.z, v.position.z);
			pMesh->m_ScreenProjVertices[i].position.x /= pMesh->m_ScreenProjVertices[i].position.w;
			pMesh->m_ScreenProjVertices[i].position.y /= pMesh->m_ScreenProjVertices[i].position.w;
			pMesh->m_ScreenProjVertices[i].position.z /= pMesh->m_ScreenProjVertices[i].position.w;
			//pMesh.m_ScreenProjVertices[i].position.w = 1 / pMesh.m_ScreenProjVertices[i].position.w; Some rasterizers store 1 / w

			//copy other attributes
			pMesh->m_ScreenProjVertices[i].color = ColorRGB(v.color);
			pMesh->m_ScreenProjVertices[i].uv = v.uv;
			pMesh->m_ScreenProjVertices[i].normal = pMesh->m_WorldMatrix.TransformVector(v.normal);
			pMesh->m_ScreenProjVertices[i].tangent = pMesh->m_WorldMatrix.TransformVector(v.tangent);

			//Calculate view direction
			pMesh->m_ScreenProjVertices[i].viewDirection = (m_pCamera->origin - pMesh->m_WorldMatrix.TransformPoint(v.position)).Normalized();
		}
	}
    