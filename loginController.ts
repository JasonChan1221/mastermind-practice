import {Request,Response} from 'express';
import {loginService} from './loginService';

export class LoginController{
    constructor(){}
    checkUserLogin = async(req:Request,res:Response)=>{
        res.json(req.session["user"]?req.session["user"]:{message:"No Login"});
    }
    login = async(req:Request,res:Response)=>{
        const {username,password} = req.body;
        const result = await loginService.login(username,password);
        if (result.success){
            req.session["user"] = result.user;
        }
        res.json(result);
    }
}

export const loginController = new LoginController();