import express from 'express';
import {Request,Response} from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {loginRouter} from './loginRouter';
import {isLoggedIn} from './guard';
import path from 'path';
import { registerRouter } from './registerRouter';
import {gameRouter} from './gameRouter';
import {profileRouter} from './profileRouter';

import Knex from 'knex';
dotenv.config();
const knexConfig = require('./knexfile');
export const client = Knex(knexConfig["development"]);

const app = express();
const PORT = 8080;
/*export const client = new pg.Client({
    database:process.env.DB_NAME,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST
})
client.connect();
*/
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(expressSession({
    secret:"mastermind_Gp3",
    resave:true,
    saveUninitialized:true
}));

app.get('/register', function (req:Request,res:Response){
    res.sendFile(path.join(__dirname,'public/register.html'));
})
app.get('/gameRoom', isLoggedIn,function(req:Request,res:Response){
    res.sendFile(path.join(__dirname,'protected/gameRoom.html'));
})
app.get('/profile',isLoggedIn,(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,'protected/profile.html'));
})
app.use('/',loginRouter);
app.use('/',registerRouter);
app.use('/',gameRouter);
app.use('/',profileRouter);
app.use(express.static('public'));
app.use(isLoggedIn,express.static('protected'));
app.listen(PORT,()=>{
    console.log(`Server is hosting at localhost:${PORT}`);
})