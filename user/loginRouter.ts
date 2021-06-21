import express from 'express';
import {loginController} from './loginController';

export const loginRouter = express.Router();
loginRouter.get("/user",loginController.checkUserLogin);
loginRouter.post("/login",loginController.login);
