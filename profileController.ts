import {Request,Response} from 'express';
import {profileService} from './profileService';
import path from 'path';




export class ProfileController{
    constructor(){};

    profilePage = async(req:Request,res:Response)=>{
        res.sendFile(path.join(__dirname,'protected/profile.html'));
    }

   

    preferColor = async(req:Request,res:Response)=>{
        const result = await profileService.preferColor(parseInt(req.session['user'].id));
        res.json(result);
    }
    
    hitRate = async(req:Request,res:Response)=>{
        const result = await profileService.hitRate(parseInt(req.session['user'].id));
        res.json(result);
    }
    
    performance = async(req:Request,res:Response)=>{
        const result = await profileService.performance(parseInt(req.session['user'].id));
        res.json(result);
    }

    uploadProfilePic = async(req:Request, res:Response)=>{
      
        const profilePic = await profileService.uploadProfilePic(req.file.filename, parseInt(req.session['user'].id));

        res.json(profilePic);
        
    }

    deletePic = async(req:Request,res:Response)=>{
        const profile_pic = await profileService.deletePic(parseInt(req.session['user'].id));    
        res.json(profile_pic);
     
    }

    profileInfo = async(req:Request, res:Response)=>{
        const info = await profileService.profileInfo(parseInt(req.session['user'].id))
        req.session['user'] = info[0];
        res.json(info);
    }

    histroiesList = async(req:Request, res:Response)=>{
        const histories = await profileService.histroiesList(parseInt(req.session['user'].id))
        res.json(histories);
    }

    deleteHistroies = async(req:Request, res:Response)=>{
        const delhistories = await profileService.deleteHistroies(parseInt(req.session['user'].id))
        res.json(delhistories);
    }

    changeUsername = async(req:Request, res:Response)=>{
      const {newUsername} = req.body;
      const changeusername = await profileService.changeUsername(newUsername,parseInt(req.session['user'].id));
      res.json(changeusername);

    }




    changePassword = async(req:Request, res:Response)=>{
        const {newPassword, conPassword} = req.body;
        const NewPassword = await profileService.changePassword(newPassword, conPassword,parseInt(req.session['user'].id) );
        res.json(NewPassword);
    
    }

    confirmPassword = async(req:Request, res:Response)=>{
        const {password} = req.body;
        const Password = await profileService.confirmPassword(password,parseInt(req.session['user'].id));
        res.json(Password);
    }

    logout = async(req:Request, res:Response)=>{
        req.session.destroy(()=>{
            console.log("logout !");
        });
        res.redirect("/");
    }


}

export const profileController = new ProfileController();