import express from 'express';
import { Product } from '../schemas/product.schema.js';
const productRouter = express.Router();

// 상품 생성 (CREATE)
productRouter.post('/products', async (req, res, next) => {
  try {
    // 상품정보 파싱하기
    const { name, description, manager, password } = req.body;
    // DB에서 조회하기
    const existedProduct = await Product.findOne({ name });
    if (existedProduct) {
      return res
        .status(400)
        .json({ status: 400, message: '이미 등록 된 상품입니다.' });
    }
    // DB에 저장하기
    const product = new Product({ name, description, manager, password });
    let data = await product.save();
    data = { ...data.toJSON(), password: undefined };
    // 완료 메세지 반환하기
    return res
      .status(201)
      .json({ status: '201', message: '상품 생성에 성공했습니다!', data });
  } catch (error) {
    next(error);
  }
});

// 상품 목록 조회 (READ)
productRouter.get('/products', async (req, res) => {
  try {
    // DB에서 조회하기
    const data = await Product.find().sort({ createdAt: 'desc' }).exec();
    // 완료 메세지 반환하기
    return res
      .status(200)
      .json({ status: 200, message: '상품 목록 조회에 성공했습니다.', data });
  } catch (error) {
    next(error);
  }
});

// 상품 상세 조회 (READ)
productRouter.get('/products/:id', async (req, res) => {
  try {
    // 상품 ID 파싱하기
    const { id } = req.params;
    // DB에 불러오기
    const data = await Product.findById(id).exec();

    if (!data) {
      return res
        .status(404)
        .json({ status: 404, message: '상품이 존재하지 않습니다.' });
    }
    // 완료 메세지 반환하기
    return res
      .status(200)
      .json({ status: 200, message: '상품 상세 조회에 성공했습니다.', data });
  } catch (error) {
    next(error);
  }
});

// 상품 수정 (UPDATE)
productRouter.put('/products/:id', async (req, res) => {
  try {
    // 상품 ID 파싱하기
    const { id } = req.params;
    // 수정할 정보 파싱하기
    const { name, description, status, manager, password } = req.body;
    // DB에서 조회하기 (PW포함)
    const existedProduct = await Product.findById(id, { password: true });
    if (!existedProduct) {
      return res
        .status(404)
        .json({ status: 404, message: '상품이 존재하지 않습니다.' });
    }
    // 비밀번호 확인하기
    const isPasswordMatched = password === existedProduct.password;
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ status: 401, message: '비밀번호가 일치하지 않습니다.' });
    }
    const productInfo = {
      ...(name && { name }),
      ...(description && { description }),
      ...(status && { status }),
      ...(manager && { manager }),
    };
    // DB에서 갱신하기
    const data = await Product.findByIdAndUpdate(id, productInfo, {
      new: true,
    });
    // 완료 메세지 반환하기
    return res
      .status(200)
      .json({ status: 200, message: '상품 수정에 성공했습니다.', data });
  } catch (error) {
    next(error);
  }
});

// 상품 삭제 (DELETE)
productRouter.delete('/products/:id', async (req, res) => {
  try {
    // 상품 ID 파싱하기
    const { id } = req.params;
    const { password } = req.body;
    // DB에서 조회하기 (PW포함)
    const existedProduct = await Product.findById(id, { password: true });
    if (!existedProduct) {
      return res
        .status(404)
        .json({ status: 404, message: '상품이 존재하지 않습니다.' });
    }
    // 비밀번호 확인하기
    const isPasswordMatched = password === existedProduct.password;
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ status: 401, message: '비밀번호가 일치하지 않습니다.' });
    }
    // DB에서 삭제하기
    const data = await Product.findByIdAndDelete(id);
    // 완료 메세지 반환하기
    return res
      .status(200)
      .json({ status: 200, message: '상품 삭제에 성공했습니다.', data });
  } catch (error) {
    next(error);
  }
});

export { productRouter };
