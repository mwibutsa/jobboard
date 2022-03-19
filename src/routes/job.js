import { Router } from 'express';
import * as validator from '@middleware/validation/job';
import JobController from '@controllers/Job';
import requestWrapper from '@middleware/requestWrapper';
import isAuthenticated from '@middleware/isAuthenticated';

const jobRouter = Router();

jobRouter.get('/all', requestWrapper(JobController.getJobs));
jobRouter.get('/recruiter-jobs', isAuthenticated, requestWrapper(JobController.getRecruiterJobs));
jobRouter.get('/:jobId/applications', validator.requireParams, requestWrapper(JobController.getJobApplications));
jobRouter.get(
  '/:jobId/applications',
  isAuthenticated,
  validator.requireParams,
  requestWrapper(JobController.getApplications),
);
jobRouter.get('/:jobId', isAuthenticated, validator.requireParams, requestWrapper(JobController.getJobDetails));
jobRouter.post('/new-job', isAuthenticated, validator.creatJob, requestWrapper(JobController.postJob));

export default jobRouter;
