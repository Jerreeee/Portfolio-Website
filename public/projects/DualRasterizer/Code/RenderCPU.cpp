	void Renderer::RenderCPU()
	{
		//Lock BackBuffer
		SDL_LockSurface(m_pBackBuffer);

		const ColorRGB& clearColor{ m_UseUniformClearColor ? m_UniformClearColor : m_CPUClearColor };

		//Reset backbuffer
		SDL_FillRect(m_pBackBuffer, nullptr, SDL_MapRGB(m_pBackBuffer->format,
			uint8_t(clearColor.r * 255.f),
			uint8_t(clearColor.g * 255.f),
			uint8_t(clearColor.b * 255.f)));

		//Reset depth buffer
		std::fill_n(m_pDepthBufferPixels, m_Width * m_Height, 1.f);

		for (std::unique_ptr<Mesh>& pMesh : m_pMeshes)
		{
			if (!pMesh->m_Visible || pMesh->m_RenderMethod == Mesh::RasterizerMethod::DirectXRasterizer)
				continue;

			//### PROJECTION STAGE ###
			CPUVertexTransformationFunction(pMesh);

			//Triangle loop
			//i + 2 instead of pMesh.m_Indices.size() - 2 because that could cause underflow
			//because size() returns a size_t which is unsigned 0 - 2 will underflow and become very large
			int idxStep = 3;
			for (size_t i{}; i + 2 < pMesh->m_Indices.size(); i += idxStep)
			{
				//check same m_Indices => degenerate triangle
				if (pMesh->m_Indices[i] == pMesh->m_Indices[i + 1] ||
					pMesh->m_Indices[i] == pMesh->m_Indices[i + 2] ||
					pMesh->m_Indices[i + 1] == pMesh->m_Indices[i + 2])
					continue;

				ScreenProjTriangle triangle{
					pMesh->m_ScreenProjVertices[pMesh->m_Indices[i]],
					pMesh->m_ScreenProjVertices[pMesh->m_Indices[i + 1]],
					pMesh->m_ScreenProjVertices[pMesh->m_Indices[i + 2]]
				};

				//### OPTIMIZATION STAGE ###
				//Frustum culling
				if (CPUOutsideFrustum(triangle))
					continue;

				//convert x and y from NDC -> Screen space for rasterization stage
				CPUVertexNDCToScreenSpace(triangle[0]);
				CPUVertexNDCToScreenSpace(triangle[1]);
				CPUVertexNDCToScreenSpace(triangle[2]);

				//### RASTERIZATION STAGE ###
				if (m_ShowBoundingBoxes)
					CPUDrawTriangleBoundingBox(triangle);
				else
					CPURasterize(triangle, pMesh->GetMaterial());
			}
		}

		//Update SDL Surface
		SDL_UnlockSurface(m_pBackBuffer);
		SDL_BlitSurface(m_pBackBuffer, 0, m_pFrontBuffer, 0);
		SDL_UpdateWindowSurface(m_pWindow);
	}
    