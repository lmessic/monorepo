const dgram = require("dgram");
const client = dgram.createSocket("udp4");

const PORT = "3333";
const HOST = "127.0.0.1";

client.send("客户端发送的消息", PORT, HOST, (err, bytes) => {
	if (err) {
		console.log("send error");
	} else {
		console.log("send success", bytes);
	}
});
