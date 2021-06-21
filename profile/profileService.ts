import {client} from '../app';
import {checkPassword,hashPassword} from '../hash';

export class ProfileService{
    constructor(){};

    uploadProfilePic = async(profilePic:string, userId:number)=>{
        try{
            await client.raw(`update player set profile_pic = '${profilePic}' where id = ${userId}`);
        return{success:true};
    }catch(ex){
      console.log(ex);
      return{success:false};
    
    }
    }

    deletePic = async(userId:number)=>{
        try{
            await client.raw(`update player set profile_pic = 'default_pic.png' where id = ${userId}`);
            return {success:true};
        }catch(ex){
            console.log(ex);
            return {success:false};
        }
    }

    profileInfo = async(userId:number)=>{
        const info = await client.raw(`select * from player where id = ${userId}`);
        return (info.rows); //info.rows[0].profile_pic
    }

    preferColor = async(userId:number)=>{
        const colorSet = await client.raw(`select color.colorname from logs inner join color on color.id = logs.color_id where logs.player_id =${userId} `);
        let dataSet:string[] =[];
        for(let color of colorSet.rows){
            dataSet.push(color.colorname.split(','));
        }
        return dataSet;
    }

    performance = async(userId:number)=>{
        const winSet = await client.raw(`select winlose,count(winlose) from game inner join player on winner_id =${userId} group by winlose`);
        let dataSet=[];
        for(let winLose of winSet.rows){
            dataSet.push({winLose:winLose.winlose,count:winLose.count});
        }
        return dataSet;
    }

    hitRate = async(userId:number)=>{
        const roundSet = await client.raw(`select game.round,count(game.round) from game inner join player on game.winner_id = ${userId} group by game.round`);
        let dataSet = [];
        for(let round of roundSet.rows ){
            dataSet.push({round:round.round,count:round.count});
        }
        return dataSet;
    }

    histroiesList = async(userId:number)=>{
        const histories = await client.raw(`select game.id as id, answer, created_at, winlose, round  from player left outer join game on game.winner_id = player.id where game.winner_id = ${userId} `);
        const historyGroup = new Map();
        for(let record of histories.rows){
            
                const history = {
                    id:record.id,
                    Date:record.created_at,
                    winlose:record.winlose,
                    answer:record.answer,
                    round:record.round
                }
                historyGroup.set(record.id,history);
            
        }
        return (Array.from(historyGroup.values()));
    }

    deleteHistroies = async(userId:number)=>{
    try{
        await client.raw(`delete from logs where player_id = ${userId}`);
        await client.raw(`delete from game where winner_id = ${userId}`);
        return ({success:true});
       }catch(ex){
        console.log(ex);
        return ({success:false});
       }
    }
    
    changeUsername = async(newUsername:string, userId:number)=>{

        
     await client.raw(`update player set username = '${newUsername}' where id = ${userId}`);

     return ({success:true});
    }


    changePassword = async(newPassword:string, conPassword:string, userId:number)=>{
        if(newPassword === conPassword){
            await client.raw(`update player set password = '${await hashPassword(newPassword)}' where id = ${userId}`);
        return ({success:true});
        }else{
            return ({success:false});
        }
    }

    confirmPassword = async(password:string, userId:number)=>{
        const playerRows = await client.raw(`select * from player where id = ${userId}`);
        const player =playerRows.rows;
        const match = await checkPassword(password,player[0].password);
        if(match)
        {
            return ({success:true});
        }else{
            return ({success:false});
        }
    }

}


export const profileService = new ProfileService();