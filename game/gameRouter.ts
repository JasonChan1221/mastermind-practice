import express, {Request,Response} from 'express';
import {client} from '../app';
import {colorChance,initChance,checkCorrect} from './calculate';
import {randomPick} from './randomPick';

export const gameRouter  = express.Router();

let chanceSet:number[]=initChance();

gameRouter.post('/selection',async(req:Request,res:Response)=>{
    const {pickOne,pickTwo,pickThree,pickFour,round,gameId} =req.body;
    if(pickOne&&pickTwo&&pickThree&&pickFour != null){
        let colorSet =[pickOne,pickTwo,pickThree,pickFour];
        const colorIdRow =  await client.raw(`Insert into color (colorname) VALUES ('${colorSet}') returning id`);
        const roundRow = await client.raw(`Insert into logs 
                                            (game_id,player_id,color_id,round) 
                                            VALUES 
                                            (${gameId},${req.session['user'].id},${colorIdRow.rows[0].id},${round}) returning id`);
        if(roundRow.rows.length>0){
            req.session['round'] = roundRow.rows[0].id;
            console.log(req.session['round']);
        }
        res.json({success:true});
    }
    else
        res.json({success:false,message:"Please pick all the color!"});
})



gameRouter.get('/chance',async(req:Request,res:Response)=>{
    const selectionRow = await client.raw(`select color.colorname , game.answer,logs.round
                                            from game 
                                            inner join logs 
                                            on game.id = logs.game_id 
                                            inner join color 
                                            on color.id = logs.color_id 
                                            where logs.id = ${parseInt(req.session['round'])}
                                            `
    );
    const colorSet = selectionRow.rows[0].colorname.split(',');
    const color = ["red","blue","pink","yellow","green","orange"];
    colorChance(colorSet,chanceSet,selectionRow.rows[0].round,color);
    res.json({success:true,colorchance:chanceSet});
})

//send that round color
gameRouter.get('/color' ,async(req:Request,res:Response)=>{
    const selectionRow  = await client.raw(`select color.colorname , game.answer 
                                            from game 
                                            inner join logs 
                                            on game.id = logs.game_id 
                                            inner join color 
                                            on color.id = logs.color_id 
                                            where logs.id = ${parseInt(req.session['round'])}
                                            `);
    const colorSet = selectionRow.rows[0].colorname.split(',');
    const answerSet = selectionRow.rows[0].answer.split(',');
    const botPick:string[]=[];
    const correct = checkCorrect(colorSet,answerSet);
    const botCorrect = checkCorrect(randomPick(botPick),answerSet);
    console.log(selectionRow.rows[0]);
    if(correct[0]===4)
        res.json({success:true,colorname:selectionRow.rows[0].colorname,correct:correct,botpick:botPick,botcorrect:botCorrect,win:true})
    else
        res.json({success:true,colorname:selectionRow.rows[0].colorname,correct:correct,botpick:botPick,botcorrect:botCorrect,win:false});
})

//insert the answer to db and return the game id
gameRouter.post('/start',async(req:Request,res:Response)=>{
    chanceSet = initChance();
    const gameIdRow= await client.raw(`Insert into game (answer,created_at,winner_id,winlose) VALUES ('${req.body.ans}',CURRENT_TIMESTAMP,${parseInt(req.session['user'].id)},false) returning id`);
    res.json({success:true,gameid:gameIdRow.rows[0].id});
})

//save the winner data
gameRouter.put('/win',async (req:Request,res:Response)=>{
    await client.raw(`Update game set 
                        winner_id = ${req.session['user'].id}, 
                        round = ${req.body.round},
                        winlose = true
                        where id=${req.body.gameid}`);
    res.json({success:true});
})

//pass userName and id to frontend
gameRouter.get('/user',async(req:Request,res:Response)=>{
    const rowsUser = await client.raw(`select id, username, profile_pic from player where id =${req.session['user'].id}`);
    const userName = rowsUser.rows[0].username;
    const userId = rowsUser.rows[0].id;
    const Pic = rowsUser.rows[0].profile_pic;
    res.json({username:userName,id:userId, profile_pic:Pic});
    }
)


