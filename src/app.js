import express from 'express';
import 'dotenv/config';
const app = express();
const port = process.env.SERVER_PORT;

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`서버오픈 ${port} `);
});

//
// 커밋 테스트2
