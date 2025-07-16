import React from "react";
import styles from "./app.module.css";
import { HashRouter, useRoutes } from "react-router-dom";
import { router } from "./router";

const App: React.FC = () => {
	const Routers = () => useRoutes(router);
	return (
		<div className="bg-gray-200 h-screen">
			<HashRouter>
				<Routers />
			</HashRouter>
		</div>
	);
};

export default App;
