import React, { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

const ThemeSwitcher = () => {
	const { currentTheme, switchTheme, themes } = useTheme();
	const toggleRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!toggleRef.current) return;
		let obser = new MutationObserver((mutations) => {
			console.log(mutations);
		});
		obser.observe(toggleRef.current, {
			childList: true,
		});
	}, []);

	return (
		<div className="flex items-center space-x-4 p-4 bg-card rounded-lg shadow" ref={toggleRef}>
			<div className="text-sm font-medium text-text ">主题:</div>
			<div className="flex space-x-2">
				{themes.map((theme: any) => (
					<button
						key={theme}
						onClick={() => switchTheme(theme)}
						className={`px-3 py-1 rounded-full capitalize ${
							currentTheme === theme ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
						}`}
						aria-label={`切换到${theme}主题`}
					>
						{theme}
					</button>
				))}
			</div>
			<div>{currentTheme}</div>
		</div>
	);
};

export default ThemeSwitcher;
