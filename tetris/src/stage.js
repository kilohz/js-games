
export default class Stage {

    constructor(game) {
        this.blockSize = 20;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.height=400;
        this.speed = 1;
        this.blocks = [];
    }

    draw(ctx) {
        for (let block of this.blocks) {
            ctx.fillStyle = block.color;
            ctx.fillRect(block.pos.x, block.pos.y, this.blockSize, this.blockSize);
        }
    }

    update(deltaTime) {
        //check for lines
        for (let block of this.blocks) {
            if (block.pos.y + this.blockSize < (this.gameHeight-this.height)) {
                this.game.lives--;
                return;
            }
        }
    }


}