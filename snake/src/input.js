export default class InputHandler{

    constructor(game){
        document.addEventListener('keydown',(event)=>{
            //console.log(event.keyCode);
            switch(event.keyCode)
            {
                case 37://left
                    game.snake.moveLeft();
                    break;
                case 39://right
                    game.snake.moveRight();
                    break;
                case 38://up
                    game.snake.moveUp();
                    break;
                case 40://down
                    game.snake.moveDown();
                    break;
                case 27:
                    game.togglePause();
                    break;
                case 32:
                    game.start();
                    break;
            }
        });
    }
}