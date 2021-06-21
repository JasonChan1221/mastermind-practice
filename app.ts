import express from 'express';
import {Request,Response} from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {loginRouter} from './user/loginRouter';
import {isLoggedIn} from './guard';
import path from 'path';
import { registerRouter } from './user/registerRouter';
import {gameRouter} from './game/gameRouter';
import {profileRouter} from './profile/profileRouter';
import Knex from 'knex';
dotenv.config();
const knexConfig = require('./knexfile');
export const client = Knex(knexConfig["development"]);

const app = express();
const PORT = 8080;
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(expressSession({
    secret:"mastermind_demo",
    resave:true,
    saveUninitialized:true
}));

app.get('/register', function (req:Request,res:Response){
    res.sendFile(path.join(__dirname,'public/register.html'));
})
app.get('/game', isLoggedIn,function(req:Request,res:Response){
    res.sendFile(path.join(__dirname,'protected/gameRoom.html'));
})
app.get('/profile',isLoggedIn,(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,'protected/profile.html'));
})
app.use('/user',loginRouter);
app.use('/user',registerRouter);
app.use('/game',gameRouter);
app.use('/profile',profileRouter);
app.use(express.static('public'));
app.use(isLoggedIn,express.static('protected'));
app.listen(PORT,()=>{
    console.log(`Server is hosting at localhost:${PORT}`);
})