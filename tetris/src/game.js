import Tetrimino from './tetrimino.js';
import InputHandler from './input.js';
import Stage from './stage.js';

export const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
}

export default class Game {

    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameObjects = [];
        this.gamestate = GAMESTATE.MENU;
        this.lives = 1;
        this.score = 0;
        this.speed = 5;

        new InputHandler(this);
    }

    update(deltaTime) {
        if (this.lives <= 0) this.gamestate = GAMESTATE.GAMEOVER;

        if (this.gamestate === GAMESTATE.PAUSED
            || this.gamestate === GAMESTATE.MENU
            || this.gamestate === GAMESTATE.GAMEOVER) return;


        this.gameObjects.forEach(object => object.update(deltaTime));
    }

    draw(ctx) {

        if (this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }
        if (this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR to Start", this.gameWidth / 2, this.gameHeight / 2);
        }
        if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
            ctx.fillText("Score: " + this.score, this.gameWidth / 2, this.gameHeight / 2 + 50);
        }
        if (this.gamestate === GAMESTATE.RUNNING) {
            //draw grid
            ctx.drawImage(document.getElementById('img_grid'), 0, 0, this.gameWidth, this.gameHeight);

            this.gameObjects.forEach(object => object.draw(ctx));
            
            ctx.fillStyle = "black";
            ctx.fillText(this.score, 50, 50);
        }
    }

    start() {
        if (this.gamestate != GAMESTATE.MENU && this.gamestate != GAMESTATE.NEWLEVEL) return;

        let tetrimino = new Tetrimino(this);
        let stage = new Stage(this);
        this.gameObjects = [tetrimino, stage];
        this.liveBlock = tetrimino;
        this.stage = stage;

        this.gamestate = GAMESTATE.RUNNING;
    }

    togglePause() {
        if (this.gamestate === GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        }
        else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
}