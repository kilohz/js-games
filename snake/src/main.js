import Game from "./game.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');

const GAME_WIDTH =800;
const GAME_HEIGHT =600;
let game = new Game(GAME_WIDTH,GAME_HEIGHT);

var frameRate = 1000/60;
var lastFrame = 0;
var startTime;
function mainLoop(time){  // time in ms accurate to 1 micro second 1/1,000,000th second
   let deltaTime = 0
   let currentFrame =0;

   if(startTime === undefined){
       startTime = time;
   }else{
       currentFrame = Math.round((time - startTime) / frameRate);
       deltaTime = (currentFrame - lastFrame) * frameRate;
   }
    lastFrame = currentFrame;

    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

    game.update(deltaTime);
    game.draw(ctx);


   requestAnimationFrame(mainLoop);
}
requestAnimationFrame(mainLoop);