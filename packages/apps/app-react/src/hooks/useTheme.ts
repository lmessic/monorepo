// src/hooks/useTheme.js
import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export const useThemeEffect = () => {
	const { colorTheme, darkMode } = useTheme();

	useEffect(() => {
		// 确保主题类被正确应用
		document.documentElement.classList.forEach((cls) => {
			if (cls.startsWith("theme-") && cls !== `theme-${colorTheme}`) {
				document.documentElement.classList.remove(cls);
			}
		});

		if (!document.documentElement.classList.contains(`theme-${colorTheme}`)) {
			document.documentElement.classList.add(`theme-${colorTheme}`);
		}

		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [colorTheme, darkMode]);
};
