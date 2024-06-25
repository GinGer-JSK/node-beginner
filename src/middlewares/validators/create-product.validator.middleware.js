import Joi from 'joi';

export const createProductValidator = async (req, res, next) => {
  try {
    const joiSchema = Joi.object({
      name: Joi.string().required().messages({
        'string.base': '상품명은 문자열이여야 합니다.',
        'any.required': '상품명을 입력해주세요.',
        'string.empty': '상품명은 비어있으면 안됩니다.',
      }),
      description: Joi.string().required().messages({
        'string.base': '상품설명은 문자열이여야 합니다.',
        'any.required': '상품설명을 입력해주세요.',
        'string.empty': '상품설명은 비어있으면 안됩니다.',
      }),
      manager: Joi.string().required().messages({
        'string.base': '담당자는 문자열이여야 합니다.',
        'any.required': '담당자를 입력해주세요.',
        'string.empty': '담당자는 비어있으면 안됩니다.',
      }),
      password: Joi.string().required().messages({
        'string.base': '비밀번호는 문자열이여야 합니다.',
        'any.required': '비밀번호를 입력해주세요.',
        'string.empty': '비밀번호는 비어있으면 안됩니다.',
      }),
    });
    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
