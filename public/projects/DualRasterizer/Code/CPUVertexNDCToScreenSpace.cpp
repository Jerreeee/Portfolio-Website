	void Renderer::CPUVertexNDCToScreenSpace(ScreenProjVertex& v) const
	{
		v.position.x = ((v.position.x + 1) / 2.f) * m_Width;
		v.position.y = ((1 - v.position.y) / 2.f) * m_Height;
	}
    