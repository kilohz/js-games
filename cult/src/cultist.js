import { detectCollision } from './collisionDetection.js';

export default class Cultist {

    constructor(game) {
        this.image = document.getElementById('img_ball');
        this.size = 20;
        this.width = this.size;
        this.height = this.size;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.converted = false;
        this.reset();
    }

    reset() {
        let x = Math.floor(Math.random() * 780) + 20;
        x = x - (x % 20);
        let y = Math.floor(Math.random() * 580) + 20;
        y = y - (y % 20);

        if (this.game.player.pos.x === x && this.game.player.pos.y == y) {
            this.reset();
            return;
        }

        this.pos = { x: x, y: y };
    }

    draw(ctx) {
        if (this.converted) {
            ctx.drawImage(document.getElementById('img_cult_red'), this.pos.x, this.pos.y, this.width, this.height);
        } else {
            ctx.drawImage(document.getElementById('img_cult_black'), this.pos.x, this.pos.y, this.width, this.height);
        }
    }

    update(deltaTime) {
        
    }

    move(){
        //random movement
        if (!this.converted) {
            let shouldMove = (Math.floor(Math.random() * 100) + 1) > 50;
            if (shouldMove) {
                let x = Math.floor(Math.random() * 30) + 1;
                let y = Math.floor(Math.random() * 30) + 1;
                if (x > 20) {
                    this.pos.x += 20;
                }
                //if 10 - 20 do nothing
                else if (x < 10) {
                    this.pos.x -= 20;
                }

                if (y > 20) {
                    this.pos.y += 20;
                }
                //if 10 - 20 do nothing
                else if (y < 10) {
                    this.pos.y -= 20;
                }

                //edges
                if (this.pos.x + this.size > this.gameWidth) {
                    this.pos.x = 0;
                }
                if (this.pos.x < 0) {
                    this.pos.x = this.gameWidth - this.size;
                }
                //check if it hits a wall on top/bottom
                if (this.pos.y < 0) {
                    this.pos.y = this.gameHeight - this.size;
                }
                if (this.pos.y + this.size > this.gameHeight) {
                    this.pos.y = 0;
                }
            }

            if (detectCollision(this, this.game.player)) {
                this.converted = true;
                this.game.score += 10;
            }
        }
    }

}