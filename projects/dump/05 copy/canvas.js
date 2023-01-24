palette = ['#000000', '#bfad7d', '#000000', '#000000', '#000000'];
setCanvasBackground(palette[0]);


ctx.globalCompositeOperation = "lighter";

class Circle {
	constructor(x, y, radius) {
		this.x = x;
		this.y = y;
		this.radius = radius;
	}
	draw() {
		ctx.strokeStyle = palette[1];
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.stroke();

		// draw center
		ctx.fillStyle = "blue";
		ctx.beginPath();
		ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
		ctx.fill();
	}

	drawSmallCircles(circleAmount, c1, c2) {
		for (let i = 0; i < circleAmount; i++) {
			let angle = (2 * Math.PI * i) / circleAmount;
			let smallCircleX = this.x + (this.radius * Math.cos(angle));
			let smallCircleY = this.y + (this.radius * Math.sin(angle));
			let distanceToC1 = Math.sqrt(Math.pow(c1.x - smallCircleX, 2) + Math.pow(c1.y - smallCircleY, 2)) - c1.radius;
			let distanceToC2 = Math.sqrt(Math.pow(c2.x - smallCircleX, 2) + Math.pow(c2.y - smallCircleY, 2)) - c2.radius;
			let radius = Math.abs(distanceToC2);

			ctx.strokeStyle = palette[1];
			ctx.beginPath();
			ctx.arc(smallCircleX, smallCircleY, radius, 0, Math.PI * 2);
			ctx.stroke();

			//draw center;
			ctx.fillStyle = "red";
			ctx.beginPath();
			ctx.arc(smallCircleX, smallCircleY, 2, 0, Math.PI * 2);
			ctx.fill();
		}
	}
}



var rect = canvas.getBoundingClientRect();
document.addEventListener("mousemove", function (event) {
	ctx.clearRect(0, 0, canvas.height, canvas.height);
	mouseX = event.clientX - rect.left;
	mouseY = event.clientY - rect.top;

	const c1 = new Circle(canvas.width / 2, canvas.height / 2, canvas.width * .3);
	const c2 = new Circle(mouseX, mouseY, 50);
	const c3 = new Circle((c1.x + c2.x) / 2, (c1.y + c2.y) / 2, (c1.radius + c2.radius) / 2);

	c1.draw();
	c2.draw();
	c3.draw();
	c3.drawSmallCircles(3, c1, c2);
});