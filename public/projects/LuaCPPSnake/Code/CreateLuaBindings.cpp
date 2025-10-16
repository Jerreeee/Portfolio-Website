void Game::CreateLuaBindings()
{
	m_Lua.new_usertype<ColorRGB>("ColorRGB",
		sol::constructors<ColorRGB(uint8_t, uint8_t, uint8_t)>(),
		"r", &ColorRGB::r,
		"g", &ColorRGB::g,
		"b", &ColorRGB::b,
		"ToHSL", &ColorRGB::ToHSL
	);

	m_Lua.new_usertype<ColorHSL>("ColorHSL",
		sol::constructors<ColorHSL(double, double, double)>(),
		"h", &ColorHSL::h,
		"s", &ColorHSL::s,
		"l", &ColorHSL::l,
		"ToRGB", &ColorHSL::ToRGB,
		"Interpolate", &ColorHSL::Interpolate
	);

	m_Lua.new_usertype<POINT>("POINT",
		sol::constructors<POINT(), POINT(LONG, LONG)>(), // Add constructor with x and y parameters
		"x", &POINT::x,
		"y", &POINT::y
	);

	m_Lua.new_usertype<RECT>("RECT",
		sol::constructors<RECT(), RECT(LONG, LONG, LONG, LONG)>(),
		"left", &RECT::left,
		"top", &RECT::top,
		"right", &RECT::right,
		"bottom", &RECT::bottom
	);

	// Bind Bitmap class
	m_Lua.new_usertype<Bitmap>("Bitmap",
		sol::constructors<Bitmap(const tstring&, bool)>(),
		"SetTransparencyColor", [](Bitmap& self, const ColorRGB& color) {
			self.SetTransparencyColor(COLORREF(color));
		},
		"SetOpacity", &Bitmap::SetOpacity,
		"Exists", &Bitmap::Exists,
		"GetWidth", &Bitmap::GetWidth,
		"GetHeight", &Bitmap::GetHeight,
		"GetTransparencyColor", [](const Bitmap& self) -> ColorRGB {
			COLORREF color = self.GetTransparencyColor();
			return ColorRGB{ GetRValue(color), GetGValue(color), GetBValue(color) };
		},
		"GetOpacity", &Bitmap::GetOpacity,
		"HasAlphaChannel", &Bitmap::HasAlphaChannel,
		"SaveToFile", [](Bitmap& self, const std::string& filename) {
			return self.SaveToFile(tstring(filename.begin(), filename.end()));
		}
		//"GetHandle", &Bitmap::GetHandle
	);

	//Expose GameEngine Class to lua
	m_Lua.new_usertype<GameEngine>(
		"GameEngine",
		sol::constructors<GameEngine()>(),
		"SetTitle", &GameEngine::SetTitle,
		"SetKeyList", &GameEngine::SetKeyList,
		"SetWidth", &GameEngine::SetWidth,
		"SetHeight", &GameEngine::SetHeight,
		"IsKeyDown", &GameEngine::IsKeyDown,
		"SetColor", sol::overload(
			[](GameEngine& self, const ColorRGB& color) {
				self.SetColor(COLORREF(color));
			},
			[](GameEngine& self, int r, int g, int b) {
				self.SetColor(RGB(r, g, b));
			}
		),
		"FillWindowRect", sol::overload(
			[](GameEngine& self, const ColorRGB& color) -> bool {
				return self.FillWindowRect(COLORREF(color));
			},
			[](GameEngine& self, int r, int g, int b) -> bool {
				return self.FillWindowRect(RGB(r, g, b));
			}
		),
		"DrawLine", &GameEngine::DrawLine,
		"DrawRect", &GameEngine::DrawRect,
		"FillRect", sol::overload(
			sol::resolve<bool(int, int, int, int) const>(&GameEngine::FillRect),
			sol::resolve<bool(int, int, int, int, int) const>(&GameEngine::FillRect)
		),
		"DrawRoundRect", &GameEngine::DrawRoundRect,
		"FillRoundRect", &GameEngine::FillRoundRect,
		"DrawOval", &GameEngine::DrawOval,
		"FillOval", sol::overload(
			sol::resolve<bool(int, int, int, int) const>(&GameEngine::FillOval),
			sol::resolve<bool(int, int, int, int, int) const>(&GameEngine::FillOval)
		),
		"DrawArc", &GameEngine::DrawArc,
		"FillArc", &GameEngine::FillArc,
		"DrawString", sol::overload(
			sol::resolve<int(const tstring&, int, int) const>(&GameEngine::DrawString),
			sol::resolve<int(const tstring&, int, int, int, int) const>(&GameEngine::DrawString)
		),
		"DrawBitmap", sol::overload(
			sol::resolve<bool(const Bitmap*, int, int) const>(&GameEngine::DrawBitmap),
			sol::resolve<bool(const Bitmap*, RECT, RECT) const>(&GameEngine::DrawBitmap)
		),
		"DrawPolygon", sol::overload(
			sol::resolve<bool(const POINT[], int) const>(&GameEngine::DrawPolygon),
			sol::resolve<bool(const POINT[], int, bool) const>(&GameEngine::DrawPolygon)
		),
		"FillPolygon", sol::overload(
			sol::resolve<bool(const POINT[], int) const>(&GameEngine::FillPolygon),
			sol::resolve<bool(const POINT[], int, bool) const>(&GameEngine::FillPolygon)
		),
		"GetDrawColor", [](const GameEngine& self) -> ColorRGB {
			COLORREF color = self.GetDrawColor();
				return ColorRGB{GetRValue(color), GetGValue(color), GetBValue(color)
			};
		},
		"Repaint", &GameEngine::Repaint,
		"GetTitle", &GameEngine::GetTitle,
		"GetWidth", &GameEngine::GetWidth,
		"GetHeight", &GameEngine::GetHeight,
		"GetFrameRate", &GameEngine::GetFrameRate,
		"GetFrameDelay", &GameEngine::GetFrameDelay
	);
};