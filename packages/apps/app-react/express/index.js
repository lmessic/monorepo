const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// 启用cors和json解析
app.use(cors());
app.use(express.json());

// 托管webpack生产包
app.use(express.static("../dist"));

// 示例API端点
app.get("/", (req, res) => {
	res.send("hello express");
});

app.listen(port, () => {
	console.log("express server running at port", port);
});
