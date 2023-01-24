palette = ['#1F1F1F', '#6B6B6B', '#3b3b3b', '#000000', '#000000'];
setCanvasBackground(palette[0]);

ctx.globalCompositeOperation = "lighter";

ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = palette[0];
ctx.fill();
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
class Line {
	constructor() {
		this.angle = Math.random() * (Math.PI * 2);
		this.angle3 = this.angle + .2 * (Math.PI * 2);
		this.angle2 = (this.angle + this.angle3) / 2;

		this.sphereDiameter = canvas.width / 2 * .5;
		this.distance = this.sphereDiameter + (canvas.width / 2 - this.sphereDiameter) * (Math.random());



	}
	draw() {
		this.x1 = canvas.width / 2 + this.distance * Math.cos(this.angle);
		this.y1 = canvas.height / 2 + this.distance * Math.sin(this.angle);

		this.x3 = canvas.width / 2 + this.distance * Math.cos(this.angle3);
		this.y3 = canvas.height / 2 + this.distance * Math.sin(this.angle3);

		this.x2 = mouseX;
		this.y2 = mouseY;


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

const lines = [];

// Draw the sphere
var numberOfLines = 300;
for (var i = 0; i < numberOfLines; i++) {

	var line = new Line();
	lines.push(line);
}



function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	lines.forEach((line) => {
		line.draw();
	});
	console.log(mouseX, mouseY);
	requestAnimationFrame(animate);
}

animate();

var rect = canvas.getBoundingClientRect();
document.addEventListener("mousemove", function (event) {
	mouseX = event.clientX - rect.left;
	mouseY = event.clientY - rect.top;


});


