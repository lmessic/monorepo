const net = require("net");

// 创建tcp服务端
const server = new net.Server();

// 监听connection事件
server.on("connection", (socket) => {
	// 获取地址
	const address = server.address();

	const message = JSON.stringify(address);

	// 发送数据
	socket.write(message, function () {
		// 大小
		const writeSize = socket.bytesWritten;
		console.log("message", message, "writeSize", writeSize);
	});

	// 监听data事件
	socket.on("data", (data) => {
		console.log("receive data", data.toString());
		console.log("receive data size", socket.bytesRead);
	});
});

// 监听8000端口
server.listen(8000, () => {
	console.log("server listen on port 8000");
});
