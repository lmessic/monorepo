import { createSlice, configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";

// RTK写法
const initialState: any = {
	name: "张三",
	age: 20,
	sex: "男",
};

const reducers = {
	increment(state: any) {
		state.age++;
	},
	decrement(state: any) {
		state.age--;
	},
	incrementAmount(state: any, action: any) {
		state.count = action.payload;
	},
};

const store = createSlice({
	name: "user",
	initialState,
	reducers,
});

// 导出action
export const { increment, decrement, incrementAmount } = store.actions;
// 导出reducer
export default store.reducer;

// 传统写法

const reducers1 = (state: any, action: any) => {
	switch (action.type) {
		case "add":
			return { ...state, age: state.age + 1 };
		case "minus":
			return { ...state, age: state.age - 1 };
		default:
			return state;
	}
};

// 中间件
const logMiddleware = () => {
	return (next: any) => {
		return (action: any) => {
			const { type } = action;
			console.log("发生一次action", action);
			return next(action);
		};
	};
};
const middleware: any = applyMiddleware(logMiddleware);
const store1 = configureStore({
	reducer: reducers1,
	middleware,
	devTools: true,
});
