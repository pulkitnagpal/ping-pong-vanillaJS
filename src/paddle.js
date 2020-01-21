class Paddle {
    constructor(game){
        this.width = 150;
        this.height = 10;
        this.speed = 0;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight
        this.maxSpeed = 7;
        this.position = {
            x: this.gameWidth / 2 - this.width / 2,
            y: this.gameHeight - this.height - 10
        }
    }
    draw(ctx) {
        ctx.fillStyle = "#000"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        if (this.position.x <= 0){
            this.position.x = 0;
        };
        if (this.position.x >= this.gameWidth - this.width){
            this.position.x = this.gameWidth - this.width
        }
        this.position.x += this.speed;
    }
    moveLeft() {
        this.speed = -this.maxSpeed;
    }
    moveRight() {
        this.speed = this.maxSpeed
    }

    stop() {
        this.speed = 0;
    }
}

export default Paddle;
