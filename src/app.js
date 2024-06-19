import express from 'express';
import { SERVER_PORT } from './constants/env.constant.js';
const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(SERVER_PORT, () => {
  console.log(`서버오픈 ${SERVER_PORT} `);
});
