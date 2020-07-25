let canvas = document.getElementById('cav');
let ctx = canvas.getContext('2d');
let reset = document.getElementById('reset')
const row = 9;
const col = 6;
let sorce = 0;
let timer = '';
let gameover = '';
let brickinfo = { //create brick info
	width: 70,
	height: 20,
	offsetX: 45,
	offsetY: 60,
	spacing: 10,
}
let visitable = true
let bricks = []
let ball = { //create ball
	x: canvas.width / 2,
	y: 400,
	size: 10,
	dx: 4,
	dy: -4,
}
let paddle = {
	x: canvas.width / 2 - 40,
	y: canvas.height - 20,
	width: 80,
	height: 10,
	dx: 0,
	speed: 8,
}
for (let i = 0; i < row; i++) { //将砖块的信息组合成一个数组
	bricks[i] = []
	for (let j = 0; j < col; j++) {
		let x = i * (brickinfo.width + brickinfo.spacing) + brickinfo.offsetX;
		let y = j * (brickinfo.height + brickinfo.spacing) + brickinfo.offsetY;
		bricks[i][j] = {
			x,
			y,
			visitable
		} //bug
	}
}

function drawBricks() { //画砖块
	bricks.forEach(items => {
		items.forEach(item => {
			ctx.beginPath()
			ctx.rect(item.x, item.y, 70, 20)
			ctx.fillStyle = item.visitable ? '#0095dd' : 'transparent';
			ctx.fill()
			ctx.closePath()
		})
	})
}

function drawBall() { //draw ball
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
	console.log('球出来了啊！')
	ctx.fillStyle = '#0095dd';
	ctx.fill()
	ctx.closePath()
}

function drawPaddle() {
	ctx.beginPath()
	ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height)
	ctx.fillStyle = '#0095dd';
	console.log(paddle.x, paddle.y)
	ctx.fill()
	ctx.closePath()
}


function movepaddle() {
	paddle.x += paddle.dx
	if (paddle.x <= 0) {
		paddle.x = 0
	}
	if (canvas.width - paddle.x <= paddle.width) {
		paddle.x = canvas.width - paddle.width
	}
}

function drawSorce() {
	ctx.beginPath()
	ctx.font = '18px bold 黑体'
	ctx.fillStyle = 'black'
	ctx.fillText(`分数：${sorce}`, canvas.width - 100, 40)
}

function moveball() {
	ball.x += ball.dx;
	ball.y += ball.dy;

	if (ball.x <= ball.size || ball.x >= canvas.width - ball.size) { //检测撞墙左右两侧
		ball.dx *= -1
	}

	if (ball.y <= ball.size) { //检测碰到顶反弹
		ball.dy *= -1
	}
	if (ball.y >= canvas.height - ball.size) { //检测碰到底部 游戏结束
		gameover = true
	}
	if (ball.x >= paddle.x && ball.x <= paddle.x + paddle.width && ball.y + ball.size >= paddle.y) { //	检测碰到挡板
		ball.dy *= -1
	}
	bricks.forEach(items => {
		items.forEach(brick => {
			if (brick.visitable) {
				if (ball.x + ball.size >= brick.x &&
					ball.y + ball.size >= brick.y &&
					ball.x - ball.size <= brick.x + brickinfo.width &&
					ball.y - ball.size <= brick.y + brickinfo.height
				) {
					brick.visitable = false
					ball.dy *= -1
					sorce++
				}
			}
		})
	})

}

function drawAll() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	drawBricks()
	drawPaddle()
	console.log('paddle')
	drawBall()
	drawSorce()
}

function update() {
	drawAll()
	moveball()
	movepaddle()
	timer = requestAnimationFrame(update)
	if (gameover === true) {
		cancelAnimationFrame(timer)
	}
}
update()

function restartgame() {
	location.reload()
}

function keyDown(e) {
	if (e.key === 'Right' || e.key === 'ArrowRight') {
		paddle.dx = paddle.speed;
	} else if (e.key === 'Left' || e.key === 'ArrowLeft') {
		paddle.dx = -paddle.speed;
	}
}

function keyUp(e) {
	if (
		e.key === 'Right' ||
		e.key === 'ArrowRight' ||
		e.key === 'Left' ||
		e.key === 'ArrowLeft'
	) {
		paddle.dx = 0;
	}
}
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)
reset.addEventListener('click', restartgame)
