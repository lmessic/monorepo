import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const tabs = [
	{ name: "关注", path: "follow" },
	{ name: "推荐", path: "/" },
	{ name: "热榜", path: "hot" },
	{ name: "视频", path: "zvideo" },
];

class MyClass {
	private _name: string;
	constructor() {
		this._name = 'zhangsan';
	}

	get name () {
		return this._name
	}
	set name(val) {
		this._name = val;
	}
}

const Tabs: React.FC = () => {
	const c = new MyClass();
	console.log(c)
	console.log(c.name)
	return (
		<div>
			<div className="py-5">
				{tabs.map((item) => {
					return (
						<NavLink
							key={item.name}
							to={item.path}
							className={({ isActive }) =>
								"whitespace-nowrap p-4 px-6 text-base transition-all " +
								(isActive ? "text-blue-600 font-bold " : "text-black hover:text-blue-900")
							}
						>
							{item.name}
						</NavLink>
					);
				})}
			</div>
			<Outlet />
		</div>
	);
};

export default Tabs;
