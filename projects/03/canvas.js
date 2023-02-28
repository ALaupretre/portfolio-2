palette = ['#111111', '#aba576', '#000000', '#000000', '#000000'];
setCanvasBackground(palette[0]);

ctx.globalCompositeOperation = "lighter";

ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = palette[0];
ctx.lineWidth = 2;
ctx.fill();
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

const rotationSpeed = Math.PI * 2 / 2000;
const gridWidth = canvas.width * .5;
const numberOfLines = canvas.width * .01;
const distance = canvas.width * .2;
const sphereDiameter = canvas.width * .2;

//increase inverted position relative to center of canvas (0 = canvas.width/2; 1 = exact opposited)
const shiftZ = 1.4;

class Line {
	constructor(x, y) {
		this.translateX = x;
		this.translateY = y;

		this.angle = Math.random() * (Math.PI * 2);
		this.sphereDiameter = sphereDiameter;
		this.distance = distance;
		// this.color = `rgba(${20 + Math.random() * 20},${30 + Math.random() * 20},${90 + Math.random() * 50},
		// 1)`;

	}
	draw() {
		this.color = palette[1];
		this.centerX = mouseX + this.translateX;
		this.centerY = mouseY + this.translateY;

		this.vPointX = canvas.width / 2 - (mouseX - canvas.width / 2) * shiftZ;
		this.vPointY = canvas.height / 2 - (mouseY - canvas.height / 2) * shiftZ;

		this.angle3 = this.angle + Math.PI;
		this.angle2 = (this.angle + this.angle3) / 2;

		this.x1 = this.centerX + this.distance * Math.cos(this.angle);
		this.y1 = this.centerY + this.distance * Math.sin(this.angle);

		this.x3 = this.centerX + this.distance * Math.cos(this.angle3);
		this.y3 = this.centerY + this.distance * Math.sin(this.angle3);

		this.x2 = this.vPointX - (this.sphereDiameter) * Math.cos(this.angle2);
		this.y2 = this.vPointY - (this.sphereDiameter) * Math.sin(this.angle2);

		// this.x2 = this.vPointX - (this.sphereDiameter) * Math.sin(this.angle2);
		// this.y2 = this.vPointY - (this.sphereDiameter) * Math.cos(this.angle2);


		ctx.strokeStyle = this.color;
		ctx.fillStyle = this.color;
		//draw point1
		ctx.beginPath();
		ctx.arc(this.x1, this.y1, 2, 0, Math.PI * 2);
		ctx.fill();

		//draw point3
		ctx.beginPath();
		ctx.arc(this.x3, this.y3, 2, 0, Math.PI * 2);
		ctx.fill();

		//draw curve
		ctx.beginPath();
		ctx.moveTo(this.x1, this.y1);
		ctx.quadraticCurveTo(this.x2, this.y2, this.x3, this.y3);
		ctx.stroke();
	}
	update() {
		this.angle += rotationSpeed;
	}
}

class Tube {
	constructor() {
		this.lines = [];
		for (let i = -gridWidth; i <= gridWidth; i += gridWidth) {
			for (let j = -gridWidth; j <= gridWidth; j += gridWidth) {
				for (let k = 0; k < numberOfLines; k++) {
					this.lines.push(new Line(i, j));

				}
			}
		}
	}
	draw() {
		this.lines.forEach((line) => {
			line.update();
			line.draw();
		});
	}
}

const tube = new Tube();
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	tube.draw();
	requestAnimationFrame(animate);
}

animate();

var rect = canvas.getBoundingClientRect();
document.addEventListener("mousemove", function (event) {
	mouseX = event.clientX - rect.left;
	mouseY = event.clientY - rect.top;


});


