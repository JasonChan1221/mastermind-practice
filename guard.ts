import {Request,Response,NextFunction} from 'express';
export const isLoggedIn = (req:Request,res:Response,next:NextFunction)=>{
    if(req.session && req.session["user"]){
        next();
    }
    else{
        res.redirect("/");
    }
}