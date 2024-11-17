import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  registerUserController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/register', ctrlWrapper(registerUserController));
authRouter.post('/login', ctrlWrapper(loginUserController));
export default authRouter;
