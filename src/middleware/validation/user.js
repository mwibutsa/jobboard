import { celebrate, Joi } from 'celebrate';

export const createUserAccount = celebrate({
  body: Joi.object().keys({
    firstName: Joi.string().min(2).max(40),
    lastName: Joi.string().min(2).max(40).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().min(10).max(15),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/)
      .required()
      .min(8),
  }),
});

export const login = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
});

export const getUserProfile = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().min(20).required(),
  }),
});
