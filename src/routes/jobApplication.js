import { Router } from 'express';
import * as validator from '@middleware/validation/jobApplication';
import JobApplicationController from '@controllers/JobApplication';
import requestWrapper from '@middleware/requestWrapper';
import isAuthenticated from '@middleware/isAuthenticated';

const jobApplicationRouter = Router();

jobApplicationRouter.get(
  '/:applicationId',
  isAuthenticated,
  requestWrapper(JobApplicationController.getJobApplicationDetails),
);
jobApplicationRouter.get(
  '/applicant-details',
  isAuthenticated,
  requestWrapper(JobApplicationController.getJobApplicantDetails),
);
jobApplicationRouter.post(
  '/apply-for-job',
  isAuthenticated,
  validator.applyForJob,
  requestWrapper(JobApplicationController.applyForJob),
);
jobApplicationRouter.put(
  '/make-application-decision/:applicationId',
  isAuthenticated,
  validator.makeApplicationDecision,
  requestWrapper(JobApplicationController.makeApplicationDecision),
);

export default jobApplicationRouter;
