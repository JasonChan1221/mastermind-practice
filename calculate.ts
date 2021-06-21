export function checkCorrect(colorGuess:string[],answerSet:string[]){
    let correctAll:number =0;
    let correctColor:number = 0;
    let checkAnswer:string[]=[];
    let colorTemp:string[]=[];
    for(let i =0;i<4;i++){
        //initialize array
        checkAnswer[i]=answerSet[i];
        colorTemp[i]=colorGuess[i];
    }
    for(let i = 0;i<colorGuess.length;i++){
        //if pos and color is correct then +1
        correctAll+=colorGuess[i]==answerSet[i]?1:0;
        //remove color then is correct
        if(colorGuess[i]==answerSet[i]){
        checkAnswer[i]="removeAns";
        colorTemp[i]="hitGuess"; 
        }
    }
    for(let i =0 ;i<colorTemp.length;i++){
        if(checkAnswer.includes(colorTemp[i])){
           let idx= checkAnswer.indexOf(colorTemp[i]);
           checkAnswer[idx]="removeAns";
            correctColor++;
        }       
    }
    let set:number[] = [correctAll,correctColor];
    return set;
}

export function colorChance(colorPick:string[],colorChance:number[],round:number,colorSet:string[]){
    for(let i =0;i<colorSet.length;i++){
        if(colorPick.includes(colorSet[i])){
            colorChance[i]=(colorChance[i]+0.25*1)*round/(round+1);
        }
        else{
            colorChance[i]=(colorChance[i]+0.25*0)*round/(round+1);
        }
    }
}

export function initChance(){
    let colorChance:number[]=[];
    for(let i =0;i<6;i++){
        colorChance[i]=1/6;
    }
    return colorChance;
}