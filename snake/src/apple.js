import { detectCollision } from './collisionDetection.js';

export default class Apple {

    constructor(game) {
        this.image = document.getElementById('img_ball');
        this.size = 5;
        this.width = this.size;
        this.height = this.size;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.reset();
    }

    reset() {
        //todo randomize
        let x = Math.floor(Math.random() * 780)+20;
        x = x - (x % 20);
        let y = Math.floor(Math.random() * 580)+20;
        y = y - (y % 20);

        this.game.snake.body.forEach(part => {
            if(part.pos.x === x && part.pos.y == y)
            {   
                this.reset();
                return;
            }
        });
        this.pos = { x: x, y: y };
    }

    draw(ctx) {
        ctx.fillStyle = "black";

        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(this.pos.x+10, this.pos.y+10, 10, 0, 2 * Math.PI);
        ctx.fill();
    }

    update(deltaTime) {
        if(detectCollision(this,this.game.snake))
        {
            this.game.score +=this.game.snake.body.length;
            this.game.snake.growMove();
            this.reset();
        }
    }

}