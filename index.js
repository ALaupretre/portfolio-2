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


const fractalImg = document.querySelector('#fractal-img');
const sequenceLength = 125;
const sequenceStart = 1;
let imageCache = {};

function preloadImages(start, end) {
	for (let i = start; i <= end; i++) {
		let imgIndexString = i.toString().padStart(3, 0);
		let imgSrc = `src/Output040/040000${imgIndexString}.png`;
		let img = new Image();
		img.src = imgSrc;
		imageCache[i] = img;
	}
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

// Preload images when the page loads
preloadImages(sequenceStart, sequenceLength);
window.addEventListener('scroll', () => {
	const imgIndex = Math.floor(getElementVisibility(fractalImg) * (sequenceLength - sequenceStart)) + sequenceStart;
	imgIndexString = imgIndex.toString().padStart(3, 0);
	console.log(imgIndexString);
	fractalImg.src = `src/Output040/040000${imgIndexString}.png`;
});
