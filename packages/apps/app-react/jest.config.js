/** @type {import("jest").Config} **/
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	extensionsToTreatAsEsm: [".ts"],
	// 修改覆盖范围
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.{ts,tsx}"],
	transform: {
		"^.+\\.(ts|tsx)$": ["babel-jest", { configFile: "./.babelrc.json" }],
	},
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
};
