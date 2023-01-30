palette = ['#14141a', '#ffffff', '#e87373', '#53ee8f', '#3884ff'];
// palette = ["#E7F6F2", "#395B64", "#2C3333", "#A5C9CA", "#FF3A24"];


let alpha = 1;
let radius = .3;
let pointsPerLine = 3;
let maxPoints = 400;
let margin = canvas.height * .15;
let cursorLength = 25;
let cursorWidth = 3;

let points = [];

class Point {
	constructor(x, y, vx, vy, friction, radius) {
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.friction = friction;
	}

	updatePosition() {
		// Update the velocity of the point based on a random acceleration
		this.vx += Math.random() - 0.5;
		this.vy += Math.random() - 0.5;

		// Update the position of the point based on the velocity
		this.x += this.vx;
		this.y += this.vy;

		// Apply friction to the velocity
		this.vx *= this.friction;
		this.vy *= this.friction;

		// Keep the point inside the canvas
		if (this.x <= margin || this.x >= canvas.width - margin) {
			this.vx *= -1;
		}
		if (this.y <= margin || this.y >= canvas.height - margin) {
			this.vy *= -1;
		}
	}

	drawCursor() {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x, canvas.height - margin / 2 - cursorLength / 2);
		ctx.strokeStyle = palette[1];
		ctx.stroke();

		ctx.beginPath();
		ctx.rect(this.x - cursorWidth / 2, canvas.height - margin / 2 - cursorLength / 2, cursorWidth, cursorLength);
		ctx.fillStyle = palette[4];
		ctx.fill();

		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(margin / 2 - cursorLength / 2, this.y);
		ctx.strokeStyle = palette[1];
		ctx.stroke();

		ctx.beginPath();
		ctx.rect(margin / 2 - cursorLength / 2, this.y - cursorWidth / 2, cursorLength, cursorWidth);
		ctx.fillStyle = palette[4];
		ctx.fill();

		// Calculate size to match absolute velocity
		this.squareSize = (Math.abs(this.vx) + Math.abs(this.vy)) * 5 + 5;

		// Draw the point on the canvas
		ctx.beginPath();
		ctx.rect(this.x - this.squareSize / 2, this.y - this.squareSize / 2, this.squareSize, this.squareSize);
		ctx.strokeStyle = palette[4];
		ctx.lineWidth = 2;
		ctx.stroke();
	}

	drawPointsBetween(otherPoint) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// Calculate the distance between the two points
		var dx = this.x - otherPoint.x;
		var dy = this.y - otherPoint.y;

		// Loop through the 20 points
		for (let i = 0; i < pointsPerLine; i++) {
			// Calculate a random position along the line between the two points
			var t = Math.random();
			let point = {
				x: this.x + (otherPoint.x - this.x) * t,
				y: this.y + (otherPoint.y - this.y) * t,
				alpha: 1,
				radius: radius,
				color: palette[1]
				//  `rgba(${100},${Math.random() * 30 + 50},${20},1)`
				,
				windX: 0,
				windY: Math.random() * -.7
			};

			// Add the point to the array
			points.push(point);

			// If the array reaches its maximum length, remove the oldest point
			if (points.length > maxPoints) {
				points.shift();
			}
		}

		//Draw every points in array
		points.forEach((point) => {
			drawPoint(point);
			point.alpha *= .96;
			point.radius += .05;
			point.x += point.windX;
			point.y += point.windY;
		});
	}

	drawLine(otherPoint) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(otherPoint.x, otherPoint.y);
		ctx.strokeStyle = palette[2];
		ctx.stroke();
	}
}

function drawPoint(point) {
	ctx.globalAlpha = point.alpha;
	ctx.beginPath();
	ctx.arc(point.x, point.y, point.radius, 0, 2 * Math.PI);
	ctx.fillStyle = point.color;
	ctx.fill();
}

// Set the background color of the canvas
setCanvasBackground(palette[0]);

// Create two objects to represent the guide points
let guidePoint1 = new Point(canvas.width * .3, canvas.height * .3, 1, 1, 0.99, 1);
let guidePoint2 = new Point(canvas.width * .7, canvas.height * .7, 1, 1, 0.99, 1);
let guidePoint3 = new Point(canvas.width * .7, canvas.height * .2, 1, 1, 0.99, 1);

// Start the animation loop
function animate() {
	// Update the position of the guide points
	guidePoint1.updatePosition();
	guidePoint2.updatePosition();
	guidePoint3.updatePosition();

	guidePoint1.drawPointsBetween(guidePoint2);
	guidePoint2.drawPointsBetween(guidePoint3);
	guidePoint1.drawPointsBetween(guidePoint3);

	guidePoint1.drawLine(guidePoint2);
	guidePoint2.drawLine(guidePoint3);
	guidePoint1.drawLine(guidePoint3);

	guidePoint1.drawCursor();
	guidePoint2.drawCursor();
	guidePoint3.drawCursor();

	requestAnimationFrame(animate);
}
// Start the animation loop
animate();