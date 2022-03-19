import { Router } from 'express';
import jobRouter from './job';
import userRouter from './user';
import jobApplicationRouter from './jobApplication';

const router = Router();

router.use('/user', userRouter);
router.use('/jobs', jobRouter);
router.use('/job-applications', jobApplicationRouter);

export default router;
