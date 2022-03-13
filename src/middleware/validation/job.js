import { celebrate, Joi } from 'celebrate';

export const creatJob = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(2),
    description: Joi.string().min(20).required(),
    payRange: Joi.string(),
  }),
});

export const requireParams = celebrate({
  params: Joi.object().keys({
    jobId: Joi.string().min(20).required(),
  }),
});
