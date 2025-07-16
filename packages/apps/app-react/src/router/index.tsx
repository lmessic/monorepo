import type { RouteObject } from "react-router-dom";
import React from "react";
import Home from "../pages/home";
import Education from "../pages/education";
import Question from "../pages/question";
import RecommendList from "../pages/home/tabs/recommendList";

export interface RouterProps {
	title?: string;
}
export type ZhRouterProps = RouteObject & RouterProps;

export const router: ZhRouterProps[] = [
	{
		path: "/",
		title: "首页",
		element: <Home />,
		children: [
			{
				path: "",
				element: <RecommendList />,
			},
			{
				path: "follow",
				element: <div>关注</div>,
			},
			{
				path: "hot",
				element: <div>热门</div>,
			},
			{
				path: "zvideo",
				element: <div>视频</div>,
			},
		],
	},
	{
		path: "/education",
		title: "知乎学堂",
		element: <Education />,
	},
	{
		path: "/question",
		title: "等你来答",
		element: <Question />,
	},
];
