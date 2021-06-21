let dataSet =[0,0,0,0,0,0];//red,blue,pink,yellow,green,orange
let preferChart = document.getElementById('preferChart');
let hitRateChart = document.getElementById('hitRateChart');
let performanceChart = document.getElementById('performanceChart');

async function openPrefer() {
    document.getElementById("backdrop").style.display = "block"
    document.getElementById("preferColor").style.display = "block"
    document.getElementById("preferColor").classList.add("show")
    const res = await fetch('/preferColor');
    const table  = await res.json();
    let count = table.length;
    for(let i =0;i<count;i++){
        for(let j=0;j<4;j++){
            countColor(table[i][j]);
        }
    }
    let data ={
        labels: [
            'Red',
            'Blue',
            'Pink',
            'Yellow',
            'Green',
            'Orange'
          ],
          datasets: [{
            label: 'Prefer Color',
            data: dataSet,
            backgroundColor: [
              'red',
              'blue',
              'pink',
              'yellow',
              'green',
              'orange'
            ],
            hoverOffset: 4
          }]
    }
    let config = {
        type:'doughnut',
        data:data,
    };
    let dataChart =new Chart(preferChart,config);
}

async function openHitRate(){
    document.getElementById("backdrop").style.display = "block"
    document.getElementById("hitRate").style.display = "block"
    document.getElementById("hitRate").classList.add("show")
    const res = await fetch('/hitRate');
    const table = await res.json();
    let count = table.length;
    let roundSet=[];
    let countSet=[];
    for(let i =0;i<count;i++){
        roundSet.push(table[i].round);
        countSet.push(table[i].count);
    }
    let data ={
        labels: roundSet,
          datasets: [{
            label: 'Hit Rate',
            data: countSet,
            backgroundColor: [
              'red',
              'blue',
              'pink',
              'yellow',
              'green',
              'orange'
            ],
            hoverOffset: 4
          }]
    };
    let config = {
        type:'doughnut',
        data:data,
    };
    let dataChart = new Chart(hitRateChart,config);
}

async function openPerformance() {
    document.getElementById("backdrop").style.display = "block"
    document.getElementById("performance").style.display = "block"
    document.getElementById("performance").classList.add("show")
    const res = await fetch('/performance');
    const table  = await res.json();
    let count = table.length;
    let countSet=[];//Lose,Win
    for(let i =0;i<count;i++){
        countSet.push(table[i].count);
    }
    let data ={
        labels: ['Lose','Win'],
          datasets: [{
            label: 'Performance',
            data: countSet,
            backgroundColor: [
              'red',
              'blue',
            ],
            hoverOffset: 4
          }]
    };
    let config = {
        type:'doughnut',
        data:data,
    };
    let dataChart =new Chart(performanceChart,config);
}

function closeModal() {
    document.getElementById("backdrop").style.display = "none"
    document.getElementById("preferColor").style.display = "none"
    document.getElementById("hitRate").style.display = "none"
    document.getElementById('performance').style.display="none"
    document.getElementById("preferColor").classList.remove("show")
    document.getElementById("hitRate").classList.remove("show")
    document.getElementById('performance').classList.remove('show')
}

function countColor(color){
    switch(color){
        case "red":
           dataSet[0] = dataSet[0]+1;
           break;
        case "blue":
            dataSet[1] = dataSet[1]+1;
            break;
        case "pink":
            dataSet[2] = dataSet[2]+1;
            break;
        case "yellow":
            dataSet[3] =dataSet[3]+1;
            break;
        case "green":
            dataSet[4] = dataSet[4]+1;
            break;
        case "orange":
            dataSet[5] = dataSet[5]+1;
            break;
        default:
            dataSet=dataSet;
    }
}
