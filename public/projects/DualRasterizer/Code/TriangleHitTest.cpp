	//Checks if a point lies inside of a triangle in the flat XY plane (!!z component is not used!!)
	bool ScreenProjTriangle::HitTest(const Vector2& point2D, std::array<float, 3>& baryCoords, CullMode cullMode) const
	{
		float signedParallelogramArea = Vector2::Cross(GetEdge3D(0, 1), GetEdge3D(0, 2));
		bool isFrontFace = signedParallelogramArea > 0;
		float parallelogramArea = std::abs(signedParallelogramArea);
		//Loop over all the edges in the triangle and check if the point2D is on
		//the correct side of the infinite line defined by each edge
		int flip = cullMode == CullMode::Front ? -1 : 1;
		for (uint8_t i = 0; i < 3; ++i)
		{
			Vector2 vCurrent = (*this)[i].position.GetXY();
			Vector2 vNext = (*this)[(i + 1) % 3].position.GetXY();
			Vector2 edgeDir = vNext - vCurrent;
			Vector2 dirToPixel = point2D - vCurrent;
			float area = Vector2::Cross(edgeDir, dirToPixel); //2D cross product -> signed area
			if (std::abs(area) < FLT_EPSILON) //too small
				return false;
			if (cullMode == CullMode::None && (isFrontFace && area < 0 || !isFrontFace && area > 0))
				return false;
			else if (area * flip < 0) //cullMode back/front
				return false;
			baryCoords[(i + 2) % 3] = std::abs(area) / parallelogramArea;
		}
		return true;
	}
    