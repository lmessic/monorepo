import React from "react";

const Search: React.FC = () => {
	return (
		<div className="flex items-center">
			<input
				placeholder="为什么很难共情那位中金女员工"
				className="text-sm w-96 h-8 px-4 border rounded-full border-slate-200 bg-slate-50"
			/>
			<button className="w-16 h-8 mx-4 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300">
				提问
			</button>
		</div>
	);
};

export default Search;
