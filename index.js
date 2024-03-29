const cursorDefault = document.getElementById("cursor-default");
const cursorPointer = document.getElementById("cursor-pointer");
const pointedElements = document.querySelectorAll('.pointer');

if (!/Mobi|Android/i.test(navigator.userAgent)) {
	document.addEventListener("mousemove", e => {
		cursorDefault.style.top = e.clientY + "px";
		cursorDefault.style.left = e.clientX + "px";

		cursorPointer.style.top = e.clientY + "px";
		cursorPointer.style.left = e.clientX + "px";
	});

	pointedElements.forEach(element => {
		element.addEventListener('mouseover', function () {
			if (!element.classList.contains("active") && !element.parentElement.classList.contains("active")) {
				cursorPointer.style.opacity = 1;
				cursorDefault.style.opacity = 0;
			}
		});
		element.addEventListener('mouseout', function () {
			cursorPointer.style.opacity = 0;
			cursorDefault.style.opacity = 1;
		});
	});
}

//Creative coding section

const canvasSelectors = document.querySelectorAll('.canvas-selector');
const canvasTitle = document.querySelector('.canvas-title');
const canvasDescription = document.querySelector('.canvas-description');
const canvasImg = document.querySelector('.canvas-img');
const projects = [];

canvasSelectors.forEach((canvasSelector, idx) => {
	const projectIndex = (idx + 1).toString().padStart(2, '0');
	const projectPath = `projects/${projectIndex}/metadata.json`;
	const imgSrc = `projects/${projectIndex}/thumbnail.jpeg`;
	const relativePath = `./${projectIndex}`;
	fetch(projectPath)
		.then(response => response.json())
		.then(data => {
			projects[idx] = {
				title: data.title,
				description: data.description,
				thumbnail: imgSrc,
				path: relativePath
			};
			if (idx === 0) {
				localStorage.setItem('currentCanvas', relativePath);
				loadProject(data.title, data.description, imgSrc);
			}
		});
});

canvasSelectors.forEach((canvasSelector, idx) => {
	canvasSelector.addEventListener('click', () => {
		canvasSelectors.forEach(c => c.classList.remove('active'));
		canvasSelector.classList.add('active');
		const project = projects[idx];
		if (project) {
			loadProject(project.title, project.description, project.thumbnail);
			localStorage.setItem('currentCanvas', project.path);
		}
	});
});

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
	img.src = `src/Output041SRGreen/041SRGreen000${i.toString().padStart(3, 0)}.jpg`;
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
	}
	requestAnimationFrame(drawImage);
}

window.addEventListener('scroll', drawImage);
drawImage();
