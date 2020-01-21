import {detectCollision} from './collisionDetection'
export default class Brick {
    constructor(game, position) {
        this.brick = document.getElementById('img_brick');
        this.position = position
        this.game = game;
        this.width = 80;
        this.height = 24;

        this.markedForDeletion = false
    }

    draw(ctx) {
        ctx.drawImage(this.brick, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        if (detectCollision(this.game.ball, this)) {
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true
        }
    }
}