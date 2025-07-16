// dev

// 合并webpack文件配置
const { merge } = require("webpack-merge");
const getBaseConfig = require("./webpack.base");
const path = require("path");

module.exports = merge(getBaseConfig(true), {
	mode: "development",
	// 源码调试
	devtool: "eval-cheap-module-source-map",
	devServer: {
		port: 8000,
		compress: false, // 不压缩，热更新快一些
		hot: true, // 热更新
		historyApiFallback: true, // history路由下的404问题
		static: {
			// 托管静态的public文件夹
			directory: path.join(__dirname, "../public"),
		},
	},
});
