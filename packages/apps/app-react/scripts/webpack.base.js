const path = require("path");
// 生产环境处理css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileListPlugin = require("../plugins/fileList");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = function (isDev) {
	return {
		// 1. 输入输出部分
		// 入口
		entry: path.resolve(__dirname, "../src/index.tsx"),
		output: {
			// 打包输出的路径
			path: path.resolve(__dirname, "../dist"),
			// 每个输出js的名称，hash、chunkhash、contenthash
			filename: "static/js/[name].[hash:8].js",
			// 构建前删除一下dist，webpack4没有，4中对应的是clean-webpack-plugin，webpack5内置
			clean: true,
			// 打包后的公共路径
			publicPath: "/",
			environment: {
				// 箭头函数
				arrowFunction: false,
			},
		},
		// 2. resolve部分，让我的文件，优化依赖索引的。
		resolve: {
			// 引入模块时，可以不带文件后缀，本质也是一个优先级的顺序，可能会影响构建性能
			extensions: [".tsx", ".ts", ".js", ".jsx"],
		},
		// 自定义loader
		// resolveLoader: {
		// 	modules: ["node_modules", "./loaders"],
		// },
		// 3. loader部分，对于不同的文件类型，使用对应的loader进行解析
		module: {
			rules: [
				{
					test: /\.(tsx|ts|jsx|js)$/,
					use: [
						{
							loader: "babel-loader",
						},
						// {
						// 	loader: "self-loader",
						// },
					],
				},
				{
					test: /^[^.]+$/,
					type: "asset/resource",
					generator: {
						filename: "static/[name].[hash:8][ext]",
					},
				},
				{
					// oneOf 表示匹配到其中一条规则，就停止匹配
					oneOf: [
						{
							test: /\.module\.(less|css)/,
							include: [path.resolve(__dirname, "../src")],
							use: [
								isDev ? "style-loader" : MiniCssExtractPlugin.loader,
								{
									loader: "css-loader",
									options: {
										modules: {
											localIdentName: "[path][name]__[local]--[hash:base64:5]",
										},
									},
								},
								"postcss-loader",
								"less-loader",
							],
						},
						{
							test: /\.css$/,
							use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
						},
						{
							test: /\.less$/,
							use: [
								isDev ? "style-loader" : MiniCssExtractPlugin.loader,
								"css-loader",
								"postcss-loader",
								"less-loader",
							],
						},
					],
				},
				{
					test: /\.(png|jpg|jpeg|webp|gif|svg)$/,
					generator: {
						filename: "static/images/[name].[contenthash:8].[ext]",
					},
				},
				{
					test: /\.(mp4|mp3|wmv|flv|rvmb)$/,
					generator: {
						filename: "static/media/[name].[contenthash:8].[ext]",
					},
				},
				{
					test: /\.(woff2|eot|ttf|otf)$/,
					generator: {
						filename: "static/fonts/[name].[contenthash8].[ext]",
					},
				},
			],
		},
		// 4. 插件部分
		plugins: [
			// 把生成的js、css注入到一个html模板中
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "../public/index.html"),
				// filename: "index.[contenthash:8].html",
			}),
			// 配置多入口
			// new HtmlWebpackPlugin({
			// 	template: path.resolve(__dirname, "../public/other.html"),
			// 	filename: "other.[contenthash:8].html",
			// }),
			new MiniCssExtractPlugin({
				filename: isDev ? "static/css/[name].css" : "static/css/[name].[contenthash:4].css",
			}),
			// 自定义插件
			// new FileListPlugin({
			// 	fileName: "fileList.md",
			// }),
			// new BundleAnalyzerPlugin(),
		],
	};
};
