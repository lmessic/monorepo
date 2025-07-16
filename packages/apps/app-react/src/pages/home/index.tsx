import React, { useEffect, useRef, useState } from "react";
import Navigation from "../../components/navigation";
import Card from "../../components/card";
import Tabs from "./tabs";

const Home: React.FC = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [tabVisible, setTabHidden] = useState<boolean>(true);

	useEffect(() => {
		const sectionOb = new IntersectionObserver((entries) => {
			setTabHidden(entries[0].isIntersecting)
		});
		sectionOb.observe(sectionRef.current!);
	}, [])
	return (
		<div>
			<Navigation tabVisible={tabVisible} />
			<div className="mx-auto max-w-5xl flex my-2 px-2">
				<Card className="w-5/7">
					<div ref={sectionRef}></div>
					<Tabs />
				</Card>
				<div className=" w-2/7 flex flex-col flex-1">
					<Card className="w-full">创作中心</Card>
					<Card className="w-full">推荐关注</Card>
					<Card className="w-full">我的收藏</Card>
				</div>
			</div>
		</div>
	);
};

export default Home;
