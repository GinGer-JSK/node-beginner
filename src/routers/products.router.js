import express from 'express';
import { Product } from '../schemas/product.schema.js';
const productRouter = express.Router();

// 상품 생성 (CREATE)
productRouter.post('/products', async (req, res) => {
  // 상품정보 파싱하기
  const { name, description, manager, password } = req.body;
  // DB에 저장하기
  const product = new Product({ name, description, manager, password });
  let data = await product.save();
  data = { ...data.toJSON(), password: undefined };
  // 완료 메세지 반환하기
  return res
    .status(201)
    .json({ status: '201', message: '상품 생성에 성공했습니다!', data });
});

// 상품 목록 조회 (READ)
productRouter.get('/products', async (req, res) => {
  // DB에서 조회하기
  const data = await Product.find().sort({ createdAt: 'desc' }).exec();
  // 완료 메세지 반환하기
  return res
    .status(200)
    .json({ status: 200, message: '상품 목록 조회에 성공했습니다.', data });
});

// 상품 상세 조회 (READ)
productRouter.get('/products/:id', async (req, res) => {
  // 상품 ID 파싱하기
  const { id } = req.params;
  // DB에 불러오기
  const data = await Product.findById(id).exec();
  // 완료 메세지 반환하기
  return res
    .status(200)
    .json({ status: 200, message: '상품 상세 조회에 성공했습니다.', data });
});

// 상품 수정 (UPDATE)
productRouter.put('/products/:id', (req, res) => {
  // 상품 ID 파싱하기
  // 수정할 정보 파싱하기
  // DB에서 조회하기 (PW포함)
  // 비밀번호 확인하기
  // DB에서 갱신하기
  // 완료 메세지 반환하기
});

// 상품 삭제 (DELETE)
productRouter.delete('/products/:id', (req, res) => {
  // 상품 ID 파싱하기
  // DB에서 조회하기 (PW포함)
  // 비밀번호 확인하기
  // DB에서 삭제하기
  // 완료 메세지 반환하기
});

export { productRouter };
