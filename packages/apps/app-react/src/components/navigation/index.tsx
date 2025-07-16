import React from "react";
import ZhIcon from "./icon";
import NavMenu from "./menu";
import { router } from "../../router";
import Search from "../search";
import { BellIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { tabs } from "../../pages/home/tabs";
import { NavLink } from "react-router-dom";

const MenuAlarm = () => {
	return (
		<div className="flex mr-10 gap-6">
			<div className="flex flex-col justify-center items-center">
				<BellIcon className="h-5 w-5 text-slate-400 fill-slate-400" />
				<span className="text-slate-400 text-xs">消息</span>
			</div>
			<div className="flex flex-col justify-center items-center">
				<ChatBubbleLeftRightIcon className="h-5 w-5 text-slate-400 fill-slate-400" />
				<span className="text-slate-400 text-xs">私信</span>
			</div>
			<div className="flex justify-center items-center">
				<img
					className="w-7 h-7"
					src="https://picx.zhimg.com/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=32738c0c"
				/>
			</div>
		</div>
	);
};

const TabMenu = () => {
	return(
		<div>
			{tabs.map((item: any) => {
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
	)
}

interface NavigationProps {
	tabVisible?:boolean;
}

const Navigation: React.FC<NavigationProps> = ({tabVisible}) => {
	return (
		<div className="h-13 flex justify-center items-center shadow bg-white min-w-6xl top-0 sticky">
			<div className="max-w-7xl min-w-6xl mx-auto my-0 flex justify-center">
				<div className="w-full h-13 flex justify-between items-center min-w-max">
					<div className="flex items-center transform duration-300">
						<ZhIcon />
						{
							tabVisible ? <NavMenu menus={router} /> : (
								<TabMenu />
							)
						}
					</div>
					<Search />
					<MenuAlarm />
				</div>
			</div>
		</div>
	);
};

export default Navigation;
