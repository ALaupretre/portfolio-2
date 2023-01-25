palette = ['#000000', '#ffffff', '#ffd1da', '#ccf5ff', '#eadbff'];
setCanvasBackground(palette[0]);
const img = new Image();
img.src = "04/dancer.png";

ctx.globalCompositeOperation = "lighter";

let brightnessArray = [];
let particlesArray = [];

const margin = canvas.width * .07;
const particleAmount = canvasSize * 3;

class Particle {
	constructor() {
		this.x = margin + Math.random() * (canvas.width - margin * 2);
		this.y = margin + Math.random() * (canvas.height - margin * 2);
		this.brightness = 0;
		this.velocity = Math.random() * 2 + .5;
		this.radius = 0;
		this.color = paletteRandom(palette[0]);
	}

	update() {
		this.y += this.velocity;
		if (this.y >= canvas.height - margin) {
			this.y = margin;
			this.x = margin + Math.random() * (canvas.width - margin * 2);
		}

		// map 1D imgData to 2D
		this.brightness = brightnessArray[Math.floor(this.y - 1) * canvas.width + Math.floor(this.x)];
	}

	draw() {
		this.radius = 1 + this.velocity * 2 + this.brightness * 0.01;

		this.width = 2 + this.brightness * 0.02;;
		this.height = 2 + this.velocity * 6;
		this.alpha = scale(this.brightness, 0, 255, .05, 1);
		ctx.globalAlpha = this.alpha;

		ctx.beginPath();
		ctx.fillStyle = this.color;
		// ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fill();
	}
}

img.onload = function () {
	ctx.drawImage(img, margin, margin, canvas.width - margin * 2, canvas.height - margin * 2);
	const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < imgData.data.length; i++) {
		const red = imgData.data[i * 4];
		const green = imgData.data[(i * 4) + 1];
		const blue = imgData.data[(i * 4) + 2];
		const brightness = (red + green + blue) / 3;


		brightnessArray.push(brightness);
	}

	for (let i = 0; i < particleAmount; i++) {
		particlesArray.push(new Particle());

	}

	const animate = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		particlesArray.forEach(particle => {
			particle.update();
			particle.draw();
		});
		requestAnimationFrame(animate);
	};

	animate();
};

//map range to other range
function scale(number, inMin, inMax, outMin, outMax) {
	return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}


