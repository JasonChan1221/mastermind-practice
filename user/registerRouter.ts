import express from 'express';
import { registerController} from './registerController';

export const registerRouter = express.Router();
registerRouter.post("/register",registerController.register);

