palette = ['#000000', '#EECEBA', '#892a2a', '#83fbc3', '#98a02c'];

// setCanvasBackground(palette[0]);

const canvasDiagonal = diagonal(canvas.width, canvas.height);
function diagonal(a, b) {
	return Math.sqrt(a * a + b * b);
}

class Line {
	constructor(ax, ay, bx, by) {
		this.ax = ax;
		this.ay = ay;
		this.bx = bx;
		this.by = by;
		this.originalLength = Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
		this.originalAx = ax;
		this.originalAy = ay;
		this.originalBx = bx;
		this.originalBy = by;
		this.expanding = false;
	}

	draw() {
		this.color1 = palette[0];
		this.color2 = palette[1];
		this.angle = getAngle(this.ax, this.ay, this.bx, this.by);

		var gradient = ctx.createConicGradient(this.angle, this.ax, this.ay);

		gradient.addColorStop(0, this.color1);
		gradient.addColorStop(1, this.color2);

		ctx.save();
		ctx.translate((this.ax + this.bx) / 2, (this.ay + this.by) / 2);
		ctx.rotate(this.angle);
		ctx.translate(-canvasDiagonal * 2, -canvasDiagonal);
		ctx.beginPath();
		ctx.rect(0, 0, canvasDiagonal * 2, canvasDiagonal * 2);
		ctx.restore();
		ctx.fillStyle = gradient;
		ctx.fill();

		var gradient2 = ctx.createConicGradient(this.angle - Math.PI, this.bx, this.by);

		gradient2.addColorStop(1, this.color1);
		gradient2.addColorStop(0, this.color2);

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

	update() {
		var shrinkRate = .01;
		var expandRate = .001;
		let length = Math.sqrt(Math.pow(this.bx - this.ax, 2) + Math.pow(this.by - this.ay, 2));
		if (length <= 10 && !this.expanding) {
			this.expanding = true;
		}
		if (length >= this.originalLength) {
			this.expanding = false;
		}
		if (this.expanding) {
			this.ax += this.originalAx * expandRate;
			this.bx += this.originalBx * expandRate;
			this.ay += this.originalAy * expandRate;
			this.by += this.originalBy * expandRate;
		} else {
			this.ax += (this.bx - this.ax) / 2 * shrinkRate;
			this.bx -= (this.bx - this.ax) / 2 * shrinkRate;
			this.ay += (this.by - this.ay) / 2 * shrinkRate;
			this.by -= (this.by - this.ay) / 2 * shrinkRate;
		}
	}
}
function getAngle(x1, y1, x2, y2) {
	let angle = Math.atan2(y2 - y1, x2 - x1);
	return angle;
}
ctx.globalCompositeOperation = "overlay";
let f = 0;
let lines = [];
for (let i = 0; i < 3; i++) {
	let line = new Line(
		Math.random() * canvasSize, Math.random() * canvasSize, Math.random() * canvasSize, Math.random() * canvasSize);
	lines.push(line);
}
function drawCanvas() {
	ctx.clearRect(0, 0, canvasSize, canvasSize);
	lines.forEach((line) => {
		line.draw();
		line.update();
	});

	requestAnimationFrame(drawCanvas);
}
requestAnimationFrame(drawCanvas);


// var rect = canvas.getBoundingClientRect();
// document.addEventListener("mousemove", function (event) {
// 	ctx.clearRect(0, 0, canvasSize, canvasSize);
// 	let line = new Line(300, 50, 50, 50, "black", "white");
// 	line.ax = event.clientX - rect.left;
// 	line.ay = event.clientY - rect.top;
// 	line.draw();

// });


