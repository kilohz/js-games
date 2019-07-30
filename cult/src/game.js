import Player from './player.js';
import Cultist from './cultist.js';
import Hr from './hr.js';
import InputHandler from './input.js';

const GAMESTATE = {
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
        this.cultists = [];
        this.gamestate = GAMESTATE.MENU;
        this.player = new Player(this);
        this.lives = 3;
        this.score = 0;
        this.hr = new Hr(this);

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
        //draw grid
        ctx.drawImage(document.getElementById('img_grid'), 0, 0, this.gameWidth, this.gameHeight);

        this.gameObjects.forEach(object => object.draw(ctx));

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
            ctx.drawImage(document.getElementById('img_menu'), 0, 0, this.gameWidth, this.gameHeight);
        }
        if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
            ctx.fillText("Score: "+this.score, this.gameWidth / 2, this.gameHeight / 2 + 50);
        }
    }

    start() {
        if (this.gamestate != GAMESTATE.MENU && this.gamestate != GAMESTATE.NEWLEVEL) return;

        //add cultist
        let cultist1 = new Cultist(this);
        let cultist2 = new Cultist(this);
        let cultist3 = new Cultist(this);
        let cultist4 = new Cultist(this);
        let cultist5 = new Cultist(this);
        let cultist6 = new Cultist(this);
        let cultist7 = new Cultist(this);
        let cultist8 = new Cultist(this);

        this.gameObjects = [this.player,cultist1,cultist2,cultist3,cultist4,cultist5,cultist6,cultist7,cultist8,this.hr];
        this.cultists = [cultist1,cultist2,cultist3,cultist4,cultist5,cultist6,cultist7,cultist8];


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

    end()
    {
        this.gamestate = GAMESTATE.GAMEOVER;
    }
}