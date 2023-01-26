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
const ctx = canvas.getContext('2d');

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

const sequenceLength = 125;
const sequenceStart = 1;
const images = [];

for (let i = sequenceStart; i <= sequenceLength; i++) {
	const image = new Image();
	image.src = `src/Output040/040000${i.toString().padStart(3, 0)}.png`;
	images.push(image);
}

window.addEventListener('scroll', () => {
	const imgIndex = Math.floor(getElementVisibility(canvas) * (sequenceLength - sequenceStart)) + sequenceStart;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(images[imgIndex - 1], 0, 0, canvas.width, canvas.height);
});
