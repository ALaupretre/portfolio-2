palette = ['#000000', '#f7cfcf', '#000000', '#000000', '#000000'];

// setCanvasBackground(palette[0]);

const canvasDiagonal = diagonal(canvas.width, canvas.height);

function diagonal(a, b) {
	return Math.sqrt(a * a + b * b);
}

class Line {
	constructor(ax, ay, bx, by, color1, color2) {
		this.ax = ax;
		this.ay = ay;
		this.bx = bx;
		this.by = by;
		this.color1 = color1;
		this.color2 = color2;
	}

	draw() {
		this.angle = getAngle(this.ax, this.ay, this.bx, this.by);

		var gradient = ctx.createConicGradient(this.angle, this.ax, this.ay);

		gradient.addColorStop(0, palette[0]);
		gradient.addColorStop(1, palette[1]);

		ctx.beginPath();
		ctx.rect(0, 0, canvasSize, canvasSize);
		ctx.fillStyle = gradient;
		ctx.fill();

		var gradient2 = ctx.createConicGradient(this.angle - Math.PI, this.bx, this.by);
		console.log(this.angle);

		gradient2.addColorStop(1, palette[0]);
		gradient2.addColorStop(0, palette[1]);

		ctx.save();
		ctx.translate((this.ax + this.bx) / 2, (this.ay + this.by) / 2);
		ctx.rotate(this.angle - Math.PI);
		ctx.translate(-canvasDiagonal * 2, -canvasDiagonal);
		ctx.beginPath();
		ctx.rect(0, 0, canvasDiagonal * 2, canvasDiagonal * 2);
		ctx.restore();
		ctx.fillStyle = gradient2;
		ctx.fill();
	};
}
function getAngle(x1, y1, x2, y2) {
	let angle = Math.atan2(y2 - y1, x2 - x1);
	return angle;
}

function drawCanvas() {
	let line = new Line(50, 50, 350, 80);
	line.draw();
	let line2 = new Line(200, 200, 400, 150);
	line2.draw();
	let line3 = new Line(80, 400, 350, 400);
	line3.draw();
}
ctx.globalCompositeOperation = "screen";

// var rect = canvas.getBoundingClientRect();
// document.addEventListener("mousemove", function (event) {
// 	ctx.clearRect(0, 0, canvasSize, canvasSize);
// 	let line = new Line(300, 50, 50, 50);
// 	line.ax = event.clientX - rect.left;
// 	line.ay = event.clientY - rect.top;
// 	line.draw();

// });


