import Joi from 'joi';
import { PRODUCT_STATUS } from '../../constants/product.constant.js';

export const deleteProductValidator = async (req, res, next) => {
  try {
    const joiSchema = Joi.object({
      description: Joi.string().messages({
        'string.base': '상품설명은 문자열이여야 합니다.',
      }),
      manager: Joi.string().messages({
        'string.base': '담당자는 문자열이여야 합니다.',
      }),
      password: Joi.string().required().messages({
        'string.base': '비밀번호는 문자열이여야 합니다.',
        'any.required': '비밀번호를 입력해주세요.',
        'string.empty': '비밀번호는 비어있으면 안됩니다.',
      }),
      status: Joi.string()
        .valid(...Object.values(PRODUCT_STATUS))
        .messages({
          'string.base': '상품설명은 문자열이여야 합니다.',
          'any.only': '상품 상태는 [FOR_SALE,SOLD_OUT] 중 하나여야 합니다.',
        }),
    });
    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
