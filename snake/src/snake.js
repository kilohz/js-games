import { detectCollision } from './collisionDetection.js';

export default class Snake {

    constructor(game) {
        this.image = document.getElementById('img_ball');
        this.size = 20;
        this.startSpeed = 10;
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
        this.body = [this.newBodyPart(0, this.pos.y + this.size),
        this.newBodyPart(0, this.pos.y + this.size * 2),
        this.newBodyPart(0, this.pos.y + this.size * 3),
        this.newBodyPart(0, this.pos.y + this.size * 4),
        this.newBodyPart(0, this.pos.y + this.size * 5),
        this.newBodyPart(0, this.pos.y + this.size * 6),
        this.newBodyPart(0, this.pos.y + this.size * 7),
        this.newBodyPart(0, this.pos.y + this.size * 8),
        this.newBodyPart(0, this.pos.y + this.size * 9),
        this.newBodyPart(0, this.pos.y + this.size * 10)];
    }


    newBodyPart(xi, yi) {
        return { pos: { x: xi, y: yi }, width: this.size, height: this.size };
    }

    moveLeft() {
        if (this.vel.y != 0) {
            //this.pos.x -= this.size;
            this.vel = { x: -this.speed, y: 0 };
            this.move(true);
        }
    }
    moveRight() {
        if (this.vel.y != 0) {
            //this.pos.x += this.size;
            this.vel = { x: this.speed, y: 0 };
            this.move(true);
        }
    }
    moveUp() {
        if (this.vel.x != 0) {
            //this.pos.y -= this.size;
            this.vel = { x: 0, y: -this.speed };
            this.move(true);
        }
    }
    moveDown() {
        if (this.vel.x != 0) {
            //this.pos.y += this.size;
            this.vel = { x: 0, y: this.speed };
            this.move(true);
        }
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        //draw head
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        //draw body
        this.body.forEach(part => {
            ctx.fillRect(part.pos.x, part.pos.y, this.width, this.height);
        });
    }

    growMove(){
        this.body.unshift(this.newBodyPart(this.pos.x,this.pos.y));

        //increase speed
        this.speed += 0.5;
            
        //move head
        this.pos.x = this.vel.x >= 0 ? this.pos.x + this.size : this.pos.x;
        this.pos.x = this.vel.x <= 0 ? this.pos.x - this.size : this.pos.x;
        this.pos.y = this.vel.y >= 0 ? this.pos.y + this.size : this.pos.y;
        this.pos.y = this.vel.y <= 0 ? this.pos.y - this.size : this.pos.y;
    }

    move(force) {
        let oldx = this.pos.x;
        let oldy = this.pos.y;
        //move head
        this.pos.x = this.vel.x >= 0 ? this.pos.x + this.size : this.pos.x;
        this.pos.x = this.vel.x <= 0 ? this.pos.x - this.size : this.pos.x;
        this.pos.y = this.vel.y >= 0 ? this.pos.y + this.size : this.pos.y;
        this.pos.y = this.vel.y <= 0 ? this.pos.y - this.size : this.pos.y;
        //move body
        for (let i = 0; i < this.body.length; i++) {
            let tempx = this.body[i].pos.x;
            let tempy = this.body[i].pos.y;

            this.body[i].pos.x = oldx;
            this.body[i].pos.y = oldy;

            oldx = tempx;
            oldy = tempy;
        }
        if (!force) this.movePercent = { x: 0, y: 0 };
    }

    update(deltaTime) {
        //800x600 /20 = 40x30 grid
        this.movePercent = { x: this.movePercent.x + this.vel.x * (deltaTime/60), y: this.movePercent.y + this.vel.y * (deltaTime/60) }
        let move = (this.movePercent.x >= this.size || this.movePercent.y >= this.size)
            || (this.movePercent.x <= this.size * -1 || this.movePercent.y <= this.size * -1);

        if (move) {
            this.move(false);
        }

        //check if collides with body
        this.body.forEach(part => {
            if (detectCollision(this, part)) {
                console.log('collide!');
                this.game.lives--;
                this.reset();
            }
        });

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