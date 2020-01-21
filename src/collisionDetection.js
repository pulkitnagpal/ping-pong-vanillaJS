export function detectCollision(ball, gameObject) {
    let topOfBall = ball.position.y
    let bottomOfBall = ball.position.y + ball.size;

    let topOfObject = gameObject.position.y;
    let leftEndObject = gameObject.position.x;
    let rightEndObject = gameObject.position.x + gameObject.width;
    let bottomOfObject = gameObject.position.y + gameObject.height

    if (bottomOfBall >= topOfObject && topOfBall <= bottomOfObject && ball.position.x > leftEndObject && ball.position.x <= rightEndObject) {
        return true
    }
    return false
}