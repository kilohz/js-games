import { detectCollision } from './collisionDetection.js';

export default class Email {

    constructor(game) {
        this.size = 20;
        this.width = this.size;
        this.height = this.size;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.sending = false;
        this.vel = { x: 0, y: 0 };
        this.pos = { x: 0, y: 0 };
        this.deltaCounter = 0;
    }

    draw(ctx) {
        if (this.sending) {
            ctx.drawImage(document.getElementById('img_email'), this.pos.x, this.pos.y, this.width, this.height);
        }
    }

    update(deltaTime) {
        if (this.sending) {
            this.deltaCounter += deltaTime/5;
            if (this.deltaCounter >= 20) {
                this.pos.x += this.vel.x;
                this.pos.y += this.vel.y;
                this.deltaCounter=0;
            }

            if (detectCollision(this, this.game.player)) {
                this.game.end();
            }
            if (this.pos.x < 0 || this.pos.x > this.gameWidth
                || this.pos.y < 0 || this.pos.y > this.gameHeight) {
                this.sending = false;
            }
        }
    }

    move() {

    }

}