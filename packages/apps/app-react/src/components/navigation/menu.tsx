import React from "react";
import type { ZhRouterProps } from "../../router";
import { NavLink, useLocation } from "react-router-dom";

interface NavMenu {
	menus: ZhRouterProps[];
}

const NavMenu: React.FC<NavMenu> = ({ menus }) => {
	const location = useLocation();

  // 有子路径时也选中当前
	const getParentPath = () => {
		let res;
		menus.forEach((item) => {
			(item.children || []).forEach((ele) => {
				if (ele.path && location.pathname.includes(ele.path)) {
					res = item.path;
				}
			});
		});

		return res;
	};

	return (
		<>
			{menus.map((item) => {
				return (
					<NavLink
						className={({ isActive }) => {
							return (
								"hover:text-black mx-4 h-full py-3 transition-all" +
								(isActive || getParentPath() === item.path
									? "font-extrabold text-black border-b-4 border-blue-600"
									: "text-slate-500")
							);
						}}
						to={item.path || ""}
						key={item.path}
					>
						{item.title}
					</NavLink>
				);
			})}
		</>
	);
};

export default NavMenu;
