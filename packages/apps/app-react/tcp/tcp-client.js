const net = require("net");

// 创建tcp客户端
const client = new net.Socket();

// 连接服务器8000端口
client.connect(8000, "127.0.0.1", () => {
	console.log("connected to server");

	client.write("hello server");
});

// 监听data事件
client.on("data", (data) => {
	console.log("receive from server:", data.toString());
});
