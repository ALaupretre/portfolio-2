//Creative coding section

const canvasSelectors = document.querySelectorAll('.canvas-selector');
const canvasTitle = document.querySelector('.canvas-title');
const canvasDescription = document.querySelector('.canvas-description');
const canvasImg = document.querySelector('.canvas-img');

let preselectedIndex;
canvasSelectors.forEach((canvasSelector, idx) => {
	if (canvasSelector.classList.contains('active')) preselectedIndex = idx;
});

canvasSelectors.forEach((canvasSelector, idx) => {
	canvasSelector.addEventListener('click', () => {
		canvasSelectors.forEach(c => c.classList.remove('active'));
		canvasSelector.classList.add('active');

		const projectIndex = (idx + 1).toString().padStart(2, '0');
		const projectPath = `projects/${projectIndex}/metadata.json`;
		const imgSrc = `projects/${projectIndex}/thumbnail.jpg`;
		const relativePath = `./${projectIndex}`;
		localStorage.setItem('currentCanvas', relativePath);
		fetch(projectPath)
			.then(response => response.json())
			.then(data => {
				loadProject(data.title, data.description, imgSrc);
			});
	});
});

if (preselectedIndex || preselectedIndex === 0) canvasSelectors[preselectedIndex].click();

function loadProject(title, description, thumbnail) {
	canvasTitle.innerHTML = title;
	canvasDescription.innerHTML = description;
	canvasImg.src = thumbnail;
}

//fractale 3d section
const panelHeadings = document.querySelectorAll(".panel-heading");

panelHeadings.forEach((panelHeading) => {
	panelHeading.addEventListener("click", () => {
		panelHeadings.forEach(pH => pH.parentElement.classList.remove("active"));
		panelHeading.parentElement.classList.toggle("active");
	});
});


const canvas = document.querySelector('#fractal-img-canvas');
const context = canvas.getContext('2d');
const sequenceLength = 250;
const sequenceStart = 1;
let currentImageIndex = sequenceStart;
let images = [];

// Preload all images to improve performance
for (let i = sequenceStart; i <= sequenceLength; i++) {
	let img = new Image();
	img.src = `src/Output041S/041S000${i.toString().padStart(3, 0)}.jpg`;
	images.push(img);
}

function getElementVisibility(element) {
	const elementRect = element.getBoundingClientRect();
	elementBottomX = elementRect.top + elementRect.height;
	const windowHeightExtended = window.innerHeight + elementRect.height;
	elementPositionX = windowHeightExtended - elementBottomX;
	if (elementPositionX <= 0) {
		return 0;
	}
	if (elementPositionX > windowHeightExtended) {
		return 1;
	}
	return elementPositionX / windowHeightExtended;
}

function drawImage() {
	const imgIndex = Math.floor(getElementVisibility(canvas) * (sequenceLength - sequenceStart)) + sequenceStart;
	if (imgIndex !== currentImageIndex) {
		currentImageIndex = imgIndex;
		context.drawImage(images[imgIndex - sequenceStart], 0, 0, canvas.width, canvas.height);
		console.log("img drawn");
	}
	requestAnimationFrame(drawImage);
}

window.addEventListener('scroll', drawImage);
drawImage();
