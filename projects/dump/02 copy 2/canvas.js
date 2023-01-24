class Point {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	draw() {
		ctx.fillStyle = "red";
		ctx.beginPath();
		ctx.arc(this.x, this.y, 2.5, 0, 2 * Math.PI);
		ctx.fill();
	}
}

//vanishing point
const vPoint = new Point(canvasSize / 2, canvasSize / 2, 0);
ctx.fillStyle = "yellow";
ctx.beginPath();
ctx.arc(vPoint.x, vPoint.y, 2.5, 0, 2 * Math.PI);
ctx.fill();

const calculate2DCoordinates = (point3d, cube) => {
	const xOrigin = vPoint.x + (cube.x - vPoint.x) / cube.z;
	const yOrigin = vPoint.y + (cube.y - vPoint.y) / cube.z;

	const xPlane = xOrigin + point3d.x * cube.size / cube.z;
	const yPlane = yOrigin + point3d.y * cube.size / cube.z;

	const x = xPlane + point3d.z * (xPlane - vPoint.x) * cube.size * .002 / cube.z;
	const y = yPlane + point3d.z * (yPlane - vPoint.y) * cube.size * .002 / cube.z;;
	return new Point(x, y);
};

// const y = cube.y + point3d.y * cube.z + ((vPoint.y - (cube.y + point3d.y * cube.z)) * cube.z * .002) * point3d.z;

// const x = vPoint.x + (cube.x - vPoint.x) / cube.z;
// const y = vPoint.y + (cube.y - vPoint.y) / cube.z;

// const x = vPoint.x + (cube.x - vPoint.x) / cube.z + point3d.x * cube.size / cube.z;
// const y = vPoint.y + (cube.x - vPoint.x) / cube.z + point3d.y * cube.size / cube.z;;

// const x = vPoint.x + (cube.x - vPoint.x) / cube.z + point3d.x * cube.size / cube.z;
// const y = vPoint.y + (cube.x - vPoint.x) / cube.z + point3d.y * cube.size / cube.z;

// const x = vPoint.x + (cube.x - vPoint.x) / cube.z + point3d.x * cube.size / cube.z;
// const y = vPoint.y + (cube.y - vPoint.y) / cube.z + point3d.y * cube.size / cube.z;


class Cube {
	constructor(x, y, z, size) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.size = size;
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

		drawPoint(Ap);
		drawPoint(Bp);
		drawPoint(Cp);
		drawPoint(Dp);
		drawPoint(Ep);
		drawPoint(Fp);
		drawPoint(Gp);
		drawPoint(Hp);

		ctx.strokeStyle = "red";
		ctx.fillStyle = "grey";
		ctx.beginPath();

		// back face
		ctx.moveTo(Ap.x, Ap.y);
		ctx.lineTo(Bp.x, Bp.y);
		ctx.lineTo(Cp.x, Cp.y);
		ctx.lineTo(Dp.x, Dp.y);
		ctx.lineTo(Ap.x, Ap.y);
		ctx.fill();
		ctx.stroke();

		ctx.strokeStyle = "white";

		// connect front and back faces
		ctx.beginPath();
		ctx.moveTo(Ap.x, Ap.y);
		ctx.lineTo(Ep.x, Ep.y);
		ctx.moveTo(Bp.x, Bp.y);
		ctx.lineTo(Fp.x, Fp.y);
		ctx.moveTo(Cp.x, Cp.y);
		ctx.lineTo(Gp.x, Gp.y);
		ctx.moveTo(Dp.x, Dp.y);
		ctx.lineTo(Hp.x, Hp.y);
		ctx.stroke();
		ctx.fillStyle = "white"; ctx.fill();
		// front face
		ctx.beginPath();
		ctx.moveTo(Ep.x, Ep.y);
		ctx.lineTo(Fp.x, Fp.y);
		ctx.lineTo(Gp.x, Gp.y);
		ctx.lineTo(Hp.x, Hp.y);
		ctx.lineTo(Ep.x, Ep.y);
		;
		ctx.stroke();

	}
}

function drawPoint(point) {
	ctx.fillStyle = "green";
	ctx.beginPath();
	ctx.arc(point.x, point.y, 2.5, 0, 2 * Math.PI);
	ctx.fill();
}

// for (let i = 1; i < 10; i++) {
// 	const cube = new Cube(Math.random() * canvasSize, Math.random() * canvasSize, Math.random() + 1, Math.random() * 40);

// 	cube.drawOrigin();

// 	cube.draw();
// }

document.addEventListener("mousemove", function (event) {
	vPoint.x = event.clientX;
	vPoint.y = event.clientY;
	ctx.clearRect(0, 0, canvasSize, canvasSize);
	const cube = new Cube(.2 * canvasSize, .2 * canvasSize, 1, 40);

	cube.drawOrigin();

	cube.draw();
});
