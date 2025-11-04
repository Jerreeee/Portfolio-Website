	bool Renderer::CPUOutsideFrustum(const ScreenProjTriangle& triangle) const
	{
		//depth culling: check if triangle z component is FULLY outside the frustum
		if (std::min({ triangle[0].position.z, triangle[1].position.z, triangle[2].position.z }) < 0 ||
			std::max({ triangle[0].position.z, triangle[1].position.z, triangle[2].position.z }) > 1)
			return true;
		//x frustum culling
		if (std::min({ triangle[0].position.x, triangle[1].position.x, triangle[2].position.z }) < -1 ||
			std::max({ triangle[0].position.x, triangle[1].position.x, triangle[2].position.z }) > 1)
			return true;
		//y frustum culling
		if (std::min({ triangle[0].position.y, triangle[1].position.y, triangle[2].position.y }) < -1 ||
			std::max({ triangle[0].position.y, triangle[1].position.y, triangle[2].position.y }) > 1)
			return true;
		return false;
	}
    