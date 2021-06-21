import {client} from '../app';
import {hashPassword} from '../hash';

export class RegisterService{
    constructor(){}
    register = async(username:string, password:string, conPassword:string)=>{
    const result = await client.raw(`select * from player where username='${username}'`);
    if(result.rows.length=='0'){
        if(password===conPassword){
            await client.raw(`Insert into player (username,password,profile_pic) VALUES ('${username}','${await hashPassword(password)}', 'default_pic.png')`);
            return {success:true,message:'Success!'};
        }else{
        return {success:false,message:"Confirm Password is wrong! Please re-enter!"};
        }
    }
    else{
        return {success:false,message:'User already exist!'};
    }
}
}
export const registerService = new RegisterService();
