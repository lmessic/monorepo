const dgram = require("dgram");
const server = dgram.createSocket("udp4");

const PORT = "3333";
const HOST = "127.0.0.1";

server.on("listening", function () {
	const address = server.address();

	console.log("udp server listening on ", address.address);
});

server.on("message", (message, remote) => {
	console.log("udp server got:", `${message} from ${remote.address}`);

	server.send(message, remote.port, remote.address, (err) => {
		if (err) {
			console.log("send error");
		} else {
			console.log("send success");
		}
	});
});

server.bind(PORT, HOST);
