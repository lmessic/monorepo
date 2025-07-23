import React, { useState } from "react";
import styles from "./app.module.css";
import { BrowserRouter, HashRouter, useRoutes } from "react-router-dom";
import { router } from "./router";
import type { ThemeType } from "./theme";
import { ThemeProvider } from "./context/ThemeContext";

const App: React.FC = () => {
	const Routers = () => useRoutes(router);
	const basename =
		process.env.NODE_ENV === "production"
			? "/monorepo/app-react" // 生产环境基础路径
			: "/"; // 开发环境
	return (
		<ThemeProvider>
			<div className="bg-gray-200 h-screen">
				<BrowserRouter basename={basename}>
					<Routers />
				</BrowserRouter>
			</div>
		</ThemeProvider>
	);
};

export default App;
