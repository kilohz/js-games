import { detectCollision } from './collisionDetection.js';

export default class Brick {
    static WIDTH =51;
    static HEIGHT =25;

    constructor(game, position) {
        this.image = document.getElementById('img_brick');
        this.game = game;
        this.position = position;
        this.height = Brick.HEIGHT;
        this.width = Brick.WIDTH;
        this.markedForDeletion = false;
    }

    update() {
        if(detectCollision(this.game.ball,this)){
            this.game.ball.speed.y = -this.game.ball.speed.y;
            //this.game.ball.speed.x = -this.game.ball.speed.x;
            this.markedForDeletion =true;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image,
            this.position.x,
            this.position.y, 
            Brick.WIDTH, 
            Brick.HEIGHT);
    }

}