import Ball from './ball';
import Paddle from './paddle';
import InputHandler from './input';
import { buildLevel, level1, level2} from './level'


const GAME_STATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU : 2,
    GAME_OVER : 3
}
export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAME_STATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.lives = 1;
        this.levels = [level1, level2];
        this.currentLevel = 0;
        this.bricks = [];
        new InputHandler(this.paddle, this);
    }

    start() {
        if (this.gamestate !== GAME_STATE.MENU) return;
        this.gamestate = GAME_STATE.RUNNING
        this.bricks = buildLevel(this, this.levels[this.currentLevel])

        this.gameObjects = [
            this.ball,
            this.paddle
        ]
    }
    levelUpStart() {
        this.ball.reset();
        this.bricks = buildLevel(this, this.levels[this.currentLevel])
    }
    draw(ctx) {
        [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));

        if (this.gamestate === GAME_STATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2)
        }
        if (this.gamestate === GAME_STATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("PRESS SPACEBAR TO START", this.gameWidth/2, this.gameHeight/2)
        }
        if (this.gamestate === GAME_STATE.GAME_OVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth/2, this.gameHeight/2)
        }

    }

    update(deltaTime) {
        if (this.lives === 0) this.gamestate = GAME_STATE.GAME_OVER
        if (this.gamestate === GAME_STATE.PAUSED || this.gamestate === GAME_STATE.MENU || this.gamestate === GAME_STATE.GAME_OVER) return;
        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime));
        this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);



        if (this.bricks.length === 0) {
            this.currentLevel ++;
            this.levelUpStart()
        }
    }

    togglePause() {
        if (this.gamestate === GAME_STATE.RUNNING) {
            this.gamestate = GAME_STATE.PAUSED
        } else {
            this.gamestate = GAME_STATE.RUNNING
        }
    }
}