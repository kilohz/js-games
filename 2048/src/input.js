import { GAMESTATE } from './game.js';

export default class InputHandler {

    constructor(game) {

        document.addEventListener('keydown', (event) => {
            //console.log(event.keyCode);
            switch (event.keyCode) {
                case 37://left
                    game.stage.moveLeft();
                    break;
                case 39://right
                    game.stage.moveRight();
                    break;
                case 38://up
                    game.stage.moveUp();
                    break;
                case 40://down
                    game.stage.moveDown();
                    break;
                case 27:
                    break;
                case 32:
                    break;
            }
        });
    }
}