export function randomPick(botPick:string[]){
    const color = ["red","blue","pink","yellow","green","orange"];
    for(let i =0;i<4;i++){
        botPick[i]=color[Math.floor(Math.random()*6)];
    }
    return botPick;
}