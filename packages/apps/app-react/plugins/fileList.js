// 自定义插件，输出本次打包的所有文件名称
class FileListPlugin {
	constructor(options) {
		this.options = options;
		this.fileName = options.filename || "fileList.md";
	}
	apply(compiler) {
		compiler.hooks.emit.tap("FileListPlugin", (compilation) => {
			const fileName = this.fileName;

			// 资源
			const assets = compilation.assets;

			let fileCount = Object.keys(assets).length;

			let content = `本次打包共生成${fileCount}个文件\n 文件列表\n`;

			for (let filename in assets) {
				content += `- ${filename}\n`;
			}
			compilation.assets[fileName] = {
				source: function () {
					return content;
				},
				size: function () {
					return content.length;
				},
			};
		});
	}
}

exports = module.exports = FileListPlugin;
