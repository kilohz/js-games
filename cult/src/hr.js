import { detectCollision } from './collisionDetection.js';

export default class Hr {

    constructor(game) {
        this.size = 20;
        this.width = this.size;
        this.height = this.size;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
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
        ctx.drawImage(document.getElementById('img_hr'), this.pos.x, this.pos.y, this.width, this.height);
    }

    update(deltaTime) {

    }

    move() {
        //random movement
        if (!this.converted) {
            let shouldMove = (Math.floor(Math.random() * 100) + 1) > 50;
            if (shouldMove) {
                //move towards player
                if (this.game.player.pos.x > this.pos.x) {
                    this.pos.x += 20;
                }
                else if (this.game.player.pos.x < this.pos.x) {
                    this.pos.x -= 20;
                }

                if (this.game.player.pos.y > this.pos.y) {
                    this.pos.y += 20;
                }
                else if (this.game.player.pos.y < this.pos.y) {
                    this.pos.y -= 20;
                }
            }

            //check if player is lined up to shoot email at him
            if (this.game.player.pos.x == this.pos.x && !this.game.email.sending) {
                if (this.game.player.pos.y < this.pos.y) {
                    this.game.email.vel = { x: 0, y: -20 };
                } else if (this.game.player.pos.y > this.pos.y) {
                    this.game.email.vel = { x: 0, y: 20 };
                }
                this.game.email.pos = {x:this.pos.x,y:this.pos.y};
                this.game.email.sending = true;
            }
            if (this.game.player.pos.y == this.pos.y && !this.game.email.sending) {
                if (this.game.player.pos.x < this.pos.x) {
                    this.game.email.vel = { x: -20, y: 0 };
                } else if (this.game.player.pos.x > this.pos.x) {
                    this.game.email.vel = { x: 20, y: 0 };
                }
                this.game.email.pos = {x:this.pos.x,y:this.pos.y};
                this.game.email.sending = true;
            }

            if (detectCollision(this, this.game.player)) {
                //if touch HR then game over
                this.game.end();
            }
        }
    }

}