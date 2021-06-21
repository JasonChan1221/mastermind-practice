var round =1;
let answer=[];
let userId;
let gameId;
let userName;
let win= false;
let gameStart = false;
let colorChance = [];

const color = ["red","blue","pink","yellow","green","orange"];
const historyContent = document.getElementsByClassName('historyContent')[0];
const roundText = document.getElementById('roundCount');
const startBtn = document.getElementById('startBtn');
const historyRound  = document.getElementById('round');
const userNameText = document.getElementById('username');
const guessBtn = document.getElementById('guessBtn');
const ansColor = document.getElementsByClassName('answerColor')[0];
const chanceSet = document.getElementsByClassName('chance');



startBtn.addEventListener('click',()=>{
    if(startBtn.innerHTML=="Start")
    startGame();
        else
        restartGame();
})

    document.querySelector("#colorForm").addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.target;
        const formObject = {};
        formObject["pickOne"] = form.pickOne.value;
        formObject["pickTwo"] = form.pickTwo.value;
        formObject["pickThree"] = form.pickThree.value;
        formObject["pickFour"] = form.pickFour.value;
        formObject['round'] = round;
        formObject['gameId'] = gameId;
        const res = await fetch("/game/selection", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObject)
        });
        const result = await res.json();
        if (result.success) {
            nextRound();
        }
        else    
            alert(`${result.message}`);
    })
    
//start the game
async function startGame(){
    createGame();
    checkStart();
    startBtn.innerHTML="Restart Game";
    roundText.innerHTML=`Round ${round}`;
    for(let i =0;i<6;i++){
        chanceSet[i].innerHTML=`16.7%`;
    }
}

async function winGame(){
    guessBtn.style.visibility='hidden';
    alert('You catch the answer!')
    const res = await fetch('/game/win',{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({round:round,gameid:gameId})
    })
    const result = await res.json();
    historyContent.innerHTML+=`<div>Game End</div>`
    ansColor.innerHTML=`<i style ="color:${answer[0]}" class="bi bi-square-fill"></i>
                         <i style ="color:${answer[1]}" class="bi bi-square-fill"></i>
                         <i style ="color:${answer[2]}" class="bi bi-square-fill"></i>
                         <i style ="color:${answer[3]}" class="bi bi-square-fill"></i>
                        `
}

async function nextRound(){
    await showColorHistory();
    if(win){
        winGame()
    }
    else{ 
    alert("next round!");
    colorOfChance();
    round++;
    roundText.innerHTML=`Round ${round}`;
    }
    
}

//restart the game
function restartGame(){
    round =1;
    gameStart=false;
    checkStart();
    startBtn.innerHTML="Start";
    roundText.innerHTML="Round ---";
    historyContent.innerHTML="";
    for(let i =0;i<6;i++){
        chanceSet[i].innerHTML=``;
    }
}

//show user pick which color and correctPos
async function showColorHistory(){
    const res= await fetch(`/game/color`);
    const result= await res.json();
    const colorSet = result.colorname.split(',');
    const correct = result.correct;
    const botColor = result.botpick;
    const botCorrect = result.botcorrect;
    if(result.win){
        win = true;
    }
    historyContent.innerHTML+= `<div><span>Round${round}</span></div>
                                <div id="history">
                                ${userName} Pick : 
                                <i class="bi bi-square-fill" style ='color:${colorSet[0]}'></i>
                                <i class="bi bi-square-fill" style ='color:${colorSet[1]}'></i>
                                <i class="bi bi-square-fill" style ='color:${colorSet[2]}'></i>
                                <i class="bi bi-square-fill" style ='color:${colorSet[3]}'></i>
                                <span id ="correctText">${correct[0]}A</span>
                                <span id ="correctText">${correct[1]}B</span>
                                </div>
                                <div id ="history">
                                BOT Pick:
                                <i class="bi bi-square-fill" style ='color:${botColor[0]}'></i>
                                <i class="bi bi-square-fill" style ='color:${botColor[1]}'></i>
                                <i class="bi bi-square-fill" style ='color:${botColor[2]}'></i>
                                <i class="bi bi-square-fill" style ='color:${botColor[3]}'></i>
                                <span id ="correctText">${botCorrect[0]}A</span>
                                <span id ="correctText">${botCorrect[1]}B</span>
                                </div>`
}

//generate the answer and return the gameId;
async function createGame(){
    gameStart=true;
    for(let i =0; i<4;i++){
        answer[i]=color[Math.floor(Math.random()*6)];
    }
    const res = await fetch('/game/start',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({ans:answer})
    });
    const result = await res.json();
    gameId = result.gameid;
    if(result.success)
        alert('Start!')
}

//show color chance
async function colorOfChance(){
    const res = await fetch('/game/chance');
    const result = await res.json();
    const chance = result.colorchance;
    console.log(chance);
    for(let i =0;i<6;i++){
        chanceSet[i].innerHTML=`${Math.round(chance[i]*100)}%`;
    }
}

//get user info
async function getUser(){
    const result = await fetch('/game/user');
    const user = await result.json();
    userId= user.id;
    userName = user.username;
    Pic = user.profile_pic;
    console.log(Pic);
    userNameText.innerHTML=`<b>${userName}</b>`;
    document.querySelector("#pic").src = `/uploads/${Pic}`;
}

//check start or not
function checkStart(){
    if(gameStart)
        //show btn to let user start
        guessBtn.style.visibility="visible";
    else
        //hide btn if it isn't start
        guessBtn.style.visibility="hidden";
}

getUser();
checkStart();