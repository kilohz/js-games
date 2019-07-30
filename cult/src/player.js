import { detectCollision } from './collisionDetection.js';

export default class Player {

    constructor(game) {
        this.size = 20;
        this.startSpeed = 15;
        this.speed = this.startSpeed;

        this.width = this.size;
        this.height = this.size;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.movePercent = { x: 0, y: 0 };
        this.game = game;
        this.reset();
    }

    reset() {
        this.speed = this.startSpeed;
        this.vel = { x: this.speed, y: 0 };
        this.pos = { x: 0, y: 200 };
    }

    moveLeft() {
        this.vel = { x: -this.speed, y: 0 };
        this.move();
    }
    moveRight() {
        this.vel = { x: this.speed, y: 0 };
        this.move();
    }
    moveUp() {
        this.vel = { x: 0, y: -this.speed };
        this.move();
    }
    moveDown() {
        this.vel = { x: 0, y: this.speed };
        this.move();
    }

    draw(ctx) {
        ctx.drawImage(document.getElementById('img_cult_king'), this.pos.x, this.pos.y, this.width, this.height);
    }

    move() {
        //move head
        this.pos.x = this.vel.x >= 0 ? this.pos.x + this.size : this.pos.x;
        this.pos.x = this.vel.x <= 0 ? this.pos.x - this.size : this.pos.x;
        this.pos.y = this.vel.y >= 0 ? this.pos.y + this.size : this.pos.y;
        this.pos.y = this.vel.y <= 0 ? this.pos.y - this.size : this.pos.y;
    }

    update(deltaTime) {
        //check if it hits a wall left/right
        if (this.pos.x + this.size > this.gameWidth) {
            this.pos.x = 0;
        }
        if (this.pos.x < 0) {
            this.pos.x = this.gameWidth-this.size;
        }
        //check if it hits a wall on top/bottom
        if (this.pos.y < 0) {
            this.pos.y = this.gameHeight-this.size;
        }
        if (this.pos.y + this.size > this.gameHeight) {
            this.pos.y = 0;
        }

    }

}