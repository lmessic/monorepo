const express = require("express");

const cors = require('cors');

const { mockList } = require('./mockData');

const app = express();

const router = express.Router();

app.use(cors());

router.get('/api/feed', (req, res) => {
    const { startNum = 0, pageSize = 10 } = req.query;
    const resList = mockList.slice(Number(startNum), Number(startNum) + Number(pageSize));
    res.json({ list: resList });
});


app.use(router);

app.listen(3010, () => {
    console.log('app in 3010')
})