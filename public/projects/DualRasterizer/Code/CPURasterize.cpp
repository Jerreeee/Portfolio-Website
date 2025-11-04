	void Renderer::CPURasterize(const ScreenProjTriangle& triangle, const Material& mat)
	{
		Bounds2DInt bounds = triangle.GetBounds2DInt(0, m_Width, 0, m_Height);
		for (int px{ bounds.xMin }; px < bounds.xMax; ++px)
		{
			for (int py{ bounds.yMin }; py < bounds.yMax; ++py)
			{
				if (m_BreakOnDebugPixel && px == m_DebugPixel.x && py == m_DebugPixel.y)
					int i = 0; //set breakpoint on this line

				int pixelIdx = px + py * m_Width;
				Vector2 pixel = { px + 0.5f, py + 0.5f };

				std::array<float, 3> baryCoords{};
				bool inside = triangle.HitTest(pixel, baryCoords, m_CullMode);
				if (!inside)
					continue;

				float zInterpolated = 1 / (
					(1 / triangle[0].position.z) * baryCoords[0] +
					(1 / triangle[1].position.z) * baryCoords[1] +
					(1 / triangle[2].position.z) * baryCoords[2]);

				//depth test
				bool succeededDepthTest = zInterpolated > 0 && zInterpolated < 1 && zInterpolated < m_pDepthBufferPixels[pixelIdx];
				if (!succeededDepthTest)
					continue;

				//update depth buffer
				m_pDepthBufferPixels[pixelIdx] = zInterpolated;

				float wInterpolated = 1 / (
					(1 / triangle[0].position.w) * baryCoords[0] +
					(1 / triangle[1].position.w) * baryCoords[1] +
					(1 / triangle[2].position.w) * baryCoords[2]);

				ScreenProjVertex pixelData{};
				pixelData.position = { (float)px, (float)py, zInterpolated, wInterpolated };
				pixelData.color = triangle.InterpolateAttrib(&ScreenProjVertex::color, baryCoords, wInterpolated);
				pixelData.uv = triangle.InterpolateAttrib(&ScreenProjVertex::uv, baryCoords, wInterpolated);
				pixelData.normal = triangle.InterpolateAttrib(&ScreenProjVertex::normal, baryCoords, wInterpolated);
				pixelData.normal.Normalize();
				pixelData.tangent = triangle.InterpolateAttrib(&ScreenProjVertex::tangent, baryCoords, wInterpolated);
				pixelData.tangent.Normalize();
				pixelData.viewDirection = triangle.InterpolateAttrib(&ScreenProjVertex::viewDirection, baryCoords, wInterpolated);;
				pixelData.viewDirection.Normalize();

				CPUPixelShader(pixelData, mat);
			}
		}
	}
    