// palette = ['#c8c5c0', '#a80000', '#003a66', '#ffffff', '#ffffff'];
palette = ['#ffffff', '#ff0000', '#0055ff', '#ffc800', '#000000'];

setCanvasBackground(palette[0]);

class Point {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	//used for construction only
	draw() {
		ctx.fillStyle = "red";
		ctx.beginPath();
		ctx.arc(this.x, this.y, 2.5, 0, 2 * Math.PI);
		ctx.fill();
	}
}

//vanishing point, middle of canvas by default
const vPoint = new Point(canvasSize / 2, canvasSize / 2, 0);

const perspectiveFactor = 1 / canvasSize;

const calculate2DCoordinates = (point3d, cube) => {
	//calculate origin based on vPoint and cube.z
	const xOrigin = vPoint.x + (cube.x - vPoint.x) / cube.z;
	const yOrigin = vPoint.y + (cube.y - vPoint.y) / cube.z;

	//calcultate 4 positions of corners
	const xPlane = xOrigin + point3d.x * cube.size / cube.z;
	const yPlane = yOrigin + point3d.y * cube.size / cube.z;

	//shift position of planes respecting vPoint perspective
	const x = xPlane + point3d.z * (xPlane - vPoint.x) * cube.size * perspectiveFactor / cube.z;
	const y = yPlane + point3d.z * (yPlane - vPoint.y) * cube.size * perspectiveFactor / cube.z;

	return new Point(x, y);
};

class Cube {
	constructor(x, y, z, size, color) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.size = size;
		this.color = paletteRandom(palette[0], palette[4]);
		this.alpha = 0;
		this.alphaReachedOne = false;
	}

	drawOrigin() {
		ctx.fillStyle = "red";
		ctx.beginPath();
		ctx.arc(this.x, this.y, 2.5, 0, 2 * Math.PI);
		ctx.fill();
	}

	drawPoint(point) {
		ctx.beginPath();
		ctx.arc(this.x + point.x * this.size, this.y + point.y * this.size, 2.5, 0, 2 * Math.PI);
	}

	draw() {
		const A = new Point(1, -1, 1);
		const B = new Point(1, 1, 1);
		const C = new Point(-1, 1, 1);
		const D = new Point(-1, -1, 1);
		const E = new Point(1, -1, -1);
		const F = new Point(1, 1, -1);
		const G = new Point(-1, 1, -1);
		const H = new Point(-1, -1, -1);

		const Ap = calculate2DCoordinates(A, this);
		const Bp = calculate2DCoordinates(B, this);
		const Cp = calculate2DCoordinates(C, this);
		const Dp = calculate2DCoordinates(D, this);
		const Ep = calculate2DCoordinates(E, this);
		const Fp = calculate2DCoordinates(F, this);
		const Gp = calculate2DCoordinates(G, this);
		const Hp = calculate2DCoordinates(H, this);

		ctx.lineWidth = 1;
		ctx.strokeStyle = palette[4];
		ctx.fillStyle = this.color;
		ctx.save();
		ctx.globalAlpha = this.alpha;

		// left face
		ctx.beginPath();
		ctx.moveTo(Ap.x, Ap.y);
		ctx.lineTo(Ep.x, Ep.y);
		ctx.lineTo(Hp.x, Hp.y);
		ctx.lineTo(Dp.x, Dp.y);
		ctx.closePath();

		ctx.fill();
		ctx.stroke();

		//right face
		ctx.beginPath();
		ctx.moveTo(Bp.x, Bp.y);
		ctx.lineTo(Fp.x, Fp.y);
		ctx.lineTo(Gp.x, Gp.y);
		ctx.lineTo(Cp.x, Cp.y);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		//top face
		ctx.beginPath();
		ctx.moveTo(Ap.x, Ap.y);
		ctx.lineTo(Bp.x, Bp.y);
		ctx.lineTo(Fp.x, Fp.y);
		ctx.lineTo(Ep.x, Ep.y);
		ctx.closePath();
		ctx.fill();

		// bottom face
		ctx.beginPath();
		ctx.moveTo(Dp.x, Dp.y);
		ctx.lineTo(Hp.x, Hp.y);
		ctx.lineTo(Gp.x, Gp.y);
		ctx.lineTo(Cp.x, Cp.y);
		ctx.closePath();
		ctx.fill();

		// front face
		ctx.beginPath();
		ctx.moveTo(Ap.x, Ap.y);
		ctx.lineTo(Bp.x, Bp.y);
		ctx.lineTo(Cp.x, Cp.y);
		ctx.lineTo(Dp.x, Dp.y);
		ctx.closePath();

		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}

	update() {
		if (!this.alphaReachedOne) {
			if (this.alpha < 1) {
				this.alpha += 0.1;
			} else {
				this.alpha = 1;
				this.alphaReachedOne = true;
			}
		} else {
			this.alpha *= .993;
		}
		this.z *= 1.007;
	}
}

function drawPoint(point) {
	ctx.fillStyle = "green";
	ctx.beginPath();
	ctx.arc(point.x, point.y, 2.5, 0, 2 * Math.PI);
	ctx.fill();
}

var rect = canvas.getBoundingClientRect();
document.addEventListener("mousemove", function (event) {
	vPoint.x = event.clientX - rect.left;
	vPoint.y = event.clientY - rect.top;

});

let cubes = [];
let j = 0;
function animate() {
	ctx.clearRect(0, 0, canvasSize, canvasSize);
	j++;
	if (Math.random() > .9) {
		const cube = new Cube(Math.random() * canvasSize, Math.random() * canvasSize, 1, Math.random() * canvasSize / 15 + canvasSize / 60);
		cubes.push(cube);
		// cube.drawOrigin();
	}

	if (cubes.length > 15) {
		cubes.shift();
	}

	cubes.forEach((cube) => {
		cube.update();
		cube.draw();
	}

	);
	requestAnimationFrame(animate);
}
// Start the animation loop
animate();



