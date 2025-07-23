const obj = {
	name: "张三",
	age: 23,
};
// 添加迭代器
obj[Symbol.iterator] = function* () {
	for (let key in this) {
		yield [key, this[key]];
	}
};

// for (let [key, value] of obj) {
// 	console.log(key, value);
// }
Object.prototype.sex = "男";
// 通过Object.keys
// for (let item of Object.keys(obj)) {
// 	console.log(item, obj[item]);
// }

for (let key in obj) {
	console.log(key);
}

// for (let item of Object.entries(obj)) {
// 	console.log(item);
// }
