import { detectCollision } from './collisionDetection.js';

export default class Ball {

    constructor(game) {
        this.image = document.getElementById('img_ball');
        this.reset();
        this.size = 10;
        this.width = this.size;
        this.height = this.size;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
    }

    reset(){
        this.position = { x: 10, y: 400 };
        this.speed = { x: -40, y: -20 };
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime) {
        this.position.x += this.speed.x / deltaTime;
        this.position.y += this.speed.y / deltaTime;

        //check if it hits a wall left/right
        if (this.position.x + this.size > this.gameWidth || this.position.x < 0)
            this.speed.x = -this.speed.x;
        //check if it hits a wall on top
        if (this.position.y < 0)
            this.speed.y = -this.speed.y;
        //bottom
        if(this.position.y + this.size > this.gameHeight){
            this.game.lives--;
            this.reset();
        }

        //check if it hits the paddle
        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            //this.speed.x = -this.speed.x;
            this.position.y = this.game.paddle.position.y - this.size;
        }

    }

}