import { celebrate, Joi } from 'celebrate';
import * as jobApplicationStatus from '@constants/jobApplicationStatus';

export const applyForJob = celebrate({
  params: Joi.object().keys({
    jobId: Joi.string().min(20).required(),
  }),
});

export const makeApplicationDecision = celebrate({
  body: Joi.object().keys({
    status: Joi.string()
      .valid(jobApplicationStatus.DROPPED, jobApplicationStatus.PASSED, jobApplicationStatus.PENDING)
      .required(),
  }),

  params: Joi.object().keys({
    applicationId: Joi.string().min(20).required(),
  }),
});
