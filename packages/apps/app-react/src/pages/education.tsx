import React, { useEffect, useState, useRef, startTransition, useReducer, useImperativeHandle } from "react";

const initialState = [
	{ id: 1, count: 1, name: "qiu" },
	{ id: 2, count: 1, name: "yan" },
	{ id: 2, count: 1, name: "xi" },
];

function reducer(tasks: any, action: { type: any; }) {
	switch (action.type) {
		case 'add':
			return {...tasks, count: tasks.count + 1};
		case 'decrement':
			return { ...tasks, count: tasks.count - 1};
		default:
			throw Error('unsupported action type')
	}
}

const Education: React.FC = () => {
	// const [tasks, dispatch] = useReducer(reducer, initialState);
	// dispatch({type: 'add'})

	const [state, setState] = useState(initialState);
	const [count, setCount] = useState<number>(1);
	const numRef = useRef(1);
	const [info, setInfo] = useState({
		name: "张三",
		age: 28,
	});
	setTimeout(() => {
		setCount(count + 1)
	}, 3000)

	useImperativeHandle

	useEffect(() => {
		// setInterval(() => {
		// 	console.log(count);
		// 	console.log(numRef)
		// 	console.log(numRef.current)
		// 	console.log(info.age);
		// }, 1000);
	}, []);

	const deleteLi = (index: number) => {
		setState((state) => {
			const newState = JSON.parse(JSON.stringify(state)); //深拷贝数据
			newState.splice(index, 1);
			return newState;
		});
	};

	return (
		<div>
			{state
				? state.map((item, index) => (
						<li key={index}>
							{index + "、"}
							{item.name}
							<button
								onClick={() => {
									deleteLi(index);
								}}
							>
								X
							</button>
						</li>
					))
				: "加载中"}
			<button onClick={() => numRef.current++}>count加一</button>
			<div>
				<button
					onClick={() =>
						setInfo((pre) => {
							return Object.assign(pre, {
								age: pre.age + 1,
							});
						})
					}
				>
					age加一
				</button>
			</div>
			<div>{count}</div>
		</div>
	);
};

export default Education;
