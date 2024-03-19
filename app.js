let gameSeq=[];
let userSeq=[];
let btns=["red","yellow","green","purple"];

let started=false;
let level=0;

let h2=document.querySelector("h2");
let start=document.querySelector("#start");

let audio=new Audio("music.mp3");

start.addEventListener("click",function(){
    if(started==false){
        audio.load();
        audio.play();
        console.log("game is started");
        started=true;
    }
    levelUp();
});

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
   
    //random button flash
    let ranIdx=Math.floor(Math.random()* 4);
    let ranColor=btns[ranIdx];
    let ranbtn=document.querySelector(`.${ranColor}`);
    gameSeq.push(ranColor);
    console.log("gameSeq:" ,gameSeq);
    gamefalsh(ranbtn);
}
function gamefalsh(btn){
    setTimeout(function(){
        btn.classList.add("gameflash");
    },800);
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },1000);
}

function userfalsh(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },100);
}

function btnPress(){
    let btn=this;
    userfalsh(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            console.log("userSeq: ",userSeq);
            setTimeout(levelUp(),1000);
        }
    }
    else{
        audio.pause();
        h2.innerHTML=`Game over! Your score was <b>${level}</b> <br> Press start to start again.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="black";
        },100);
        reset();
    }
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
