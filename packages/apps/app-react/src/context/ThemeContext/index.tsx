import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<any>(null);

interface ThemeProviderProps {
	children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	// 可用主题列表
	const themes = ["light", "dark", "rose"];

	// 从 localStorage 获取保存的主题或默认 light
	const [currentTheme, setCurrentTheme] = useState(() => {
		const savedTheme: any = localStorage.getItem("theme");
		return themes.includes(savedTheme) ? savedTheme : "light";
	});

	// 切换主题
	const switchTheme = (theme: any) => {
		if (themes.includes(theme)) {
			setCurrentTheme(theme);
		}
	};

	// 保存主题到 localStorage
	useEffect(() => {
		localStorage.setItem("theme", currentTheme);

		// 移除所有主题类
		document.documentElement.classList.remove(...themes);
		// 添加当前主题类
		document.documentElement.classList.add(currentTheme);
	}, [currentTheme]);

	return <ThemeContext.Provider value={{ currentTheme, switchTheme, themes }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
