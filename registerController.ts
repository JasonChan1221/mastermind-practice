import {Request,Response} from 'express';
import { registerService } from './registerService';

export class RegisterController{
    constructor(){}
register = async(req:Request,res:Response)=>{
    const {username,password,conPassword} = req.body;
    const result = await registerService.register(username,password,conPassword);
    res.json(result);
    }
}

export const registerController = new RegisterController();