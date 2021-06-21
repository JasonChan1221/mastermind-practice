import {client} from './app';
import {checkPassword} from './hash';
export class LoginService{
    constructor(){}
    login = async(username:string,password:string)=>{
        const userRows = await client.raw(`select * from player where username='${username}'`);
        const user = userRows.rows;
        if (user.length > 0){
            const match = await checkPassword(password,user[0].password);
            if(match){
                return {success:true,user:user[0]};
            }else{
                return {success:false,message:"wrong password!"};
            }
        }else{
            return {success:false,message:"User not exist!"};
        }
    }
}

export const loginService = new LoginService();