// production

const { merge } = require("webpack-merge");
const getBaseConfig = require("./webpack.base");
const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(getBaseConfig(false), {
	mode: "production",
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					compress: {
						pure_funcs: ["console.log", "console.warn"],
					},
				},
			}),
		],
		// 代码自动分包
		splitChunks: {
			cacheGroups: {
				vendors: {
					name: "vendors",
					test: /node_modules/,
				},
				commons: {
					name: "commons",
				},
			},
		},
	},
});
