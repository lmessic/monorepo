const express = require('express');
const app = express();
const port = 3000;

// 托管静态文件
app.use(express.static('dist'));

// 示例 API 路由
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});