palette = ['#0c0d12', '#8b7f6f', '#3b3b3b', '#000000', '#000000'];
setCanvasBackground(palette[0]);
ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.globalCompositeOperation = "lighter";



class Line {
	constructor() {
		var angle = Math.random() * (Math.PI * 2);
		var angle2 = Math.random() * (Math.PI * 2);
		var distance = 100;

		this.x1 = canvas.width / 2 + distance * Math.cos(angle);
		this.y1 = canvas.height / 2 + distance * Math.sin(angle);
		const middleX = (this.x1 + this.x3) / 2;
		const middleY = (this.y1 + this.y3) / 2;
		this.x3 = canvas.width / 2 + distance * Math.cos(angle2);
		this.y3 = canvas.height / 2 + distance * Math.sin(angle2);
		this.x2 = (angle + angle2) / 2;
		this.y2 = canvas.height / 2 + (distance / 2) * Math.sin(angle + Math.PI / 2);
	}
	draw() {
		ctx.strokeStyle = palette[1];
		ctx.fillStyle = palette[1];
		ctx.beginPath();
		ctx.arc(this.x1, this.y1, 2, 0, Math.PI * 2);
		ctx.fill();

		ctx.beginPath();
		ctx.arc(this.x3, this.y3, 2, 0, Math.PI * 2);
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(this.x1, this.y1);
		ctx.quadraticCurveTo(this.x2, this.y2, this.x3, this.y3);
		ctx.stroke();
	}
}

// Draw the sphere
var numberOfLines = 50;
for (var i = 0; i < numberOfLines; i++) {

	var line = new Line();
	line.draw();
}


