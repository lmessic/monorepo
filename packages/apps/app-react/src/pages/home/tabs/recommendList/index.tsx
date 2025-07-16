import React, { useEffect, useRef, useState, type RefObject } from "react";
import {
	ChatBubbleLeftIcon,
	ChevronUpIcon,
	EllipsisHorizontalIcon,
	HeartIcon,
	PaperAirplaneIcon,
	StarIcon,
} from "@heroicons/react/24/solid";
import { getMockList } from "../../../../api/server";

const moreIcon = (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		className="Zi Zi--ArrowDown ContentItem-arrowIcon"
		fill="currentColor"
	>
		<path
			fillRule="evenodd"
			d="M17.776 10.517a.875.875 0 0 1-.248 1.212l-5.05 3.335a.875.875 0 0 1-.964 0L6.47 11.73a.875.875 0 1 1 .965-1.46l4.56 3.015 4.568-3.016a.875.875 0 0 1 1.212.248Z"
			clipRule="evenodd"
		></path>
	</svg>
);

const agreeIcon = (
	<svg
		width="10"
		height="10"
		viewBox="0 0 24 24"
		className="Zi Zi--TriangleUp VoteButton-TriangleUp"
		fill="currentColor"
	>
		<path
			fillRule="evenodd"
			d="M13.792 3.681c-.781-1.406-2.803-1.406-3.584 0l-7.79 14.023c-.76 1.367.228 3.046 1.791 3.046h15.582c1.563 0 2.55-1.68 1.791-3.046l-7.79-14.023Z"
			clipRule="evenodd"
		></path>
	</svg>
);

const disAgreeIcon = (
	<svg width="10" height="10" viewBox="0 0 24 24" className="Zi Zi--TriangleDown" fill="currentColor">
		<path
			fillRule="evenodd"
			d="M13.792 20.319c-.781 1.406-2.803 1.406-3.584 0L2.418 6.296c-.76-1.367.228-3.046 1.791-3.046h15.582c1.563 0 2.55 1.68 1.791 3.046l-7.79 14.023Z"
			clipRule="evenodd"
		></path>
	</svg>
);

const moreMenu = () => (
	<div className="w-44 bg-white shadow-lg p-2 border absolute right-0 top-10 translate-x-1/2 cursor-pointer">
		<div
			style={{
				width: 0,
				height: 0,
				borderLeft: "5px solid transparent",
				borderRight: "5px solid transparent",
				borderBottom: "10px solid #ebeced",
				position: "absolute",
				top: -10,
				left: "50%",
				transform: "translateX(-50%)",
			}}
		></div>
		<div className="hover:bg-gray-100 px-5 py-2">举报</div>
		<div className="hover:bg-gray-100 px-5 py-2">不感兴趣</div>
		<div className="hover:bg-gray-100 px-5 py-2">设置屏蔽关键词</div>
	</div>
);

// 封装无限滚动逻辑，封装hooks
const useRefIntersecOb = (fn: (boo: boolean) => void, ref: RefObject<HTMLDivElement>) => {

	useEffect(() => {
		let interOb = new IntersectionObserver((entries) =>{ 
			fn(entries[0].isIntersecting);
		});
		ref.current && interOb.observe(ref.current);

		return () => {
			ref.current && interOb.unobserve(ref.current);
		}
	}, [])
}

const RecommendList: React.FC = () => {
	const [visible, setVisible] = useState<boolean>(false);
	const [currentId, setCurrentId] = useState<string>("");
	const [open, setOpen] = useState<boolean>(false);

	const [list, setList] = useState<any[]>([]);
	const listRef = useRef<Array<any>>([]);

	const loadingRef = useRef<HTMLDivElement>(null);

	const getData = async () => {
		const res: any = await getMockList("api/feed", {
			startNum: 0,
			pageSize: 10,
		});
		setList(res.list);
	};
	const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: string) => {
		e.stopPropagation();
		setVisible((v) => !v);
		setCurrentId(id);
	};

	const hideMenu = (e: Event) => {
		setVisible(false);
	};

	useRefIntersecOb((boo: boolean) => {
		if (boo) {
			getMockList("api/feed", {
				startNum: list.length,
				pageSize: list.length + 10,
			}).then((res: any) => {
				listRef.current = [...listRef.current, ...res.list];
				setList(listRef.current);
			});
		}
	}, loadingRef)

	useEffect(() => {
		// getData();

		// let interOb = new IntersectionObserver((entries) =>{ 
		// 	if (entries[0].isIntersecting) {
		// 		getMockList("api/feed", {
		// 			startNum: list.length,
		// 			pageSize: list.length + 10,
		// 		}).then((res: any) => {
		// 			listRef.current = [...listRef.current, ...res.list];
		// 			setList(listRef.current);
		// 		});
		// 	}

		// })

		// loadingRef.current && interOb.observe(loadingRef.current);


		window.addEventListener("click", hideMenu);
		return () => {
			document.removeEventListener("click", hideMenu);
			// loadingRef.current && interOb.unobserve(loadingRef.current);
		};
	}, []);

	const openArtical = () => {
		setOpen(true);
	};

	return (
		<div>
			{list.map(
				(item) =>
					item.type === "feed" && (
						<div key={item.id} className="p-5 border-t text-sm">
							<div className="text-black font-bold text-lg cursor-pointer">{item?.target?.question?.title}</div>
							<div className="cursor-pointer hover:text-gray-400">
								{open ? (
									<div dangerouslySetInnerHTML={{ __html: item?.target?.content || "" }} />
								) : (
									<span>
										{item?.target?.author?.name}：{item?.target?.excerpt}
										<button className="inline-flex ml-1 text-blue-900" onClick={openArtical}>
											阅读全文<span className="ml-1">{moreIcon}</span>
										</button>
									</span>
								)}
							</div>
							<div className="flex pt-3 bottom-0 sticky bg-white">
								<div>
									<button className="inline-flex items-center px-3 bg-blue-100 text-blue-600 rounded h-8 justify-center text-xs">
										<div className="mr-2">{agreeIcon}</div>
										<div>赞同</div>
										<div className="ml-2">{item?.target?.voteup_count}</div>
									</button>
									<button className="ml-1 bg-blue-100 text-blue-600 rounded h-8 px-3 inline-flex items-center">
										<div>{disAgreeIcon}</div>
									</button>
								</div>
								<div className="flex items-center ml-4 cursor-pointer text-sm text-gray-700">
									<ChatBubbleLeftIcon className="h-4 w-4 text-gray-500 mr-1 hover:text-gray-600" />
									<span>{item?.target?.comment_count} 评论</span>
								</div>
								<div className="flex items-center ml-4 cursor-pointer text-sm text-gray-700">
									<PaperAirplaneIcon className="h-4 w-4 text-gray-500 mr-1 hover:text-gray-600" />
									分享
								</div>
								<div className="flex items-center ml-4 cursor-pointer text-sm text-gray-700">
									<StarIcon className="h-4 w-4 text-gray-500 mr-1 hover:text-gray-600" />
									收藏
								</div>
								<div className="flex items-center ml-4 cursor-pointer text-sm text-gray-700">
									<HeartIcon className="h-4 w-4 text-gray-500 mr-1 hover:text-gray-600" />
									喜欢
								</div>
								<div className="flex items-center ml-4 cursor-pointer text-sm text-gray-700 relative">
									<EllipsisHorizontalIcon
										className="h-4 w-4 text-gray-500 hover:text-gray-600"
										onClick={(e) => handleClick(e, item.id)}
									/>
									{visible && currentId === item.id && moreMenu()}
								</div>
								{open && (
									<div
										className="flex items-center ml-4 cursor-pointer text-sm text-gray-700"
										onClick={() => setOpen(false)}
									>
										收起
										<ChevronUpIcon className="h-4 w-4 text-gray-500 ml-1 hover:text-gray-600" />
									</div>
								)}
							</div>
						</div>
					),
			)}
			<div ref={loadingRef}>loading...</div>
		</div>
	);
};

export default RecommendList;
