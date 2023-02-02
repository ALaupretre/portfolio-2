function getBrowser() {
	const userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.indexOf("chrome") !== -1) {
		return "Chrome";
	} else if (userAgent.indexOf("firefox") !== -1) {
		return "Firefox";
	} else if (userAgent.indexOf("safari") !== -1) {
		return "Safari";
	} else {
		return "Unknown";
	}
}

if (getBrowser() == "Firefox") {
	palette = ['#000000', '#757272', '#6e5c35', '#452d59', '#336a7a'];
	ctx.globalCompositeOperation = "lighter";
	console.log(123);
} else {
	palette = ['#000000', '#e6e6e6', '#d8b569', '#b879ec', '#5bbad7'];
	ctx.globalCompositeOperation = "overlay";
}

const animationSpeed = .02;
const circleRadius = canvas.width * .3;

const canvasDiagonal = diagonal(canvas.width, canvas.height);

function diagonal(a, b) {
	return Math.sqrt(a * a + b * b);
}

class Line {
	constructor(radius, startAngleA, startAngleB, velocityA, velocityB) {
		this.radius = radius;
		this.startAngleA = startAngleA;
		this.startAngleB = startAngleB;
		this.velocityA = velocityA;
		this.velocityB = velocityB;
		this.color1 = palette[0];
		this.color2 = paletteRandom(palette[0]);
	}

	polarToCartesian(radius, angle) {
		const x = radius * Math.cos(angle);
		const y = radius * Math.sin(angle);
		return { x, y };
	}

	draw() {
		const pointA = this.polarToCartesian(this.radius, this.startAngleA);
		pointA.x += canvas.width / 2;
		pointA.y += canvas.height / 2;

		const pointB = this.polarToCartesian(this.radius, this.startAngleB);
		pointB.x += canvas.width / 2;
		pointB.y += canvas.height / 2;

		this.angle = getAngle(pointA.x, pointA.y, pointB.x, pointB.y);

		if (getBrowser() == "Chrome") {
			var gradient = ctx.createConicGradient(this.angle, pointA.x, pointA.y);
			gradient.addColorStop(0, this.color1);
			gradient.addColorStop(1, this.color2);
		} else {
			var gradient = ctx.createConicGradient((this.angle) + Math.PI / 2, pointA.x, pointA.y);
			gradient.addColorStop(0, this.color2);
			gradient.addColorStop(1, this.color1);
		}

		ctx.save();
		ctx.translate((pointA.x + pointB.x) / 2, (pointA.y + pointB.y) / 2);
		ctx.rotate(this.angle);
		ctx.translate(-canvasDiagonal * 2, -canvasDiagonal);
		ctx.beginPath();
		ctx.rect(0, 0, canvasDiagonal * 2, canvasDiagonal * 2);
		ctx.restore();
		ctx.fillStyle = gradient;
		ctx.fill();

		if (getBrowser() == "Chrome") {
			var gradient2 = ctx.createConicGradient(this.angle - Math.PI, pointB.x, pointB.y);
			gradient2.addColorStop(1, this.color1);
			gradient2.addColorStop(0, this.color2);
		} else {
			var gradient2 = ctx.createConicGradient((this.angle - Math.PI) + Math.PI / 2, pointB.x, pointB.y);
			gradient2.addColorStop(0, this.color1);
			gradient2.addColorStop(1, this.color2);
		}

		ctx.save();
		ctx.translate((pointA.x + pointB.x) / 2, (pointA.y + pointB.y) / 2);
		ctx.rotate(this.angle - Math.PI);
		ctx.translate(-canvasDiagonal * 2, -canvasDiagonal);
		ctx.beginPath();
		ctx.rect(0, 0, canvasDiagonal * 2, canvasDiagonal * 2);
		ctx.restore();
		ctx.fillStyle = gradient2;
		ctx.fill();

		ctx.beginPath();
		ctx.lineCap = "round";
		ctx.strokeStyle = this.color2;
		ctx.lineWidth = 2;
		ctx.moveTo(pointA.x, pointA.y);
		ctx.lineTo(pointB.x, pointB.y);
		ctx.stroke();
	};

	update() {
		this.startAngleA += this.velocityA;
		this.startAngleB += this.velocityB;
	}
}

function getAngle(x1, y1, x2, y2) {
	let angle = Math.atan2(y2 - y1, x2 - x1);
	return angle;
}


let f = 0;
let lines = [];
for (let i = 0; i < 3; i++) {
	let line = new Line(circleRadius, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * animationSpeed, (Math.random() - .5) * animationSpeed, palette[1]);
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