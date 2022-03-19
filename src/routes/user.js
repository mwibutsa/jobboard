import { Router } from 'express';
import * as validator from '@middleware/validation/user';
import UserController from '@controllers/User';
import requestWrapper from '@middleware/requestWrapper';
import isAuthenticated from '@middleware/isAuthenticated';

const userRouter = Router();

userRouter.post('/login', validator.login, requestWrapper(UserController.login));
userRouter.get('/:userId', isAuthenticated, validator.getUserProfile, requestWrapper(UserController.getUserProfile));
userRouter.post('/sign-up', validator.createUserAccount, requestWrapper(UserController.signUp));

export default userRouter;
