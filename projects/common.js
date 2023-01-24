const relativePath = localStorage.getItem("currentCanvas");
function loadCanvasScript() {
	var canvasScript = document.getElementById('canvas-script');
	canvasScript.src = relativePath + "/canvas.js";
}


var prevLink = document.getElementById("prev-link");
var nextLink = document.getElementById("next-link");

prevLink.addEventListener("click", function () {
	var currentCanvas = localStorage.getItem("currentCanvas");
	var currentIndex = parseInt(currentCanvas.substring(2));
	if (currentIndex > 1) {
		var prevIndex = (currentIndex - 1).toString().padStart(2, "0");
		localStorage.setItem("currentCanvas", "./" + prevIndex);
		location.reload();
	} else {
		prevLink.style.display = 'none';
	}
});
nextLink.addEventListener("click", function () {
	var currentCanvas = localStorage.getItem("currentCanvas");
	var currentIndex = parseInt(currentCanvas.substring(2));
	if (currentIndex < 10) {
		var nextIndex = (currentIndex + 1).toString().padStart(2, "0");
		localStorage.setItem("currentCanvas", "./" + nextIndex);
		location.reload();
	} else {
		nextLink.style.display = 'none';
	}
});


const title = document.getElementById("title");
const description = document.getElementById("description");
const infoBox = document.getElementById("info-box");
title.addEventListener("click", () => {
	infoBox.classList.toggle("active");
});
function loadProjectData() {
	var currentCanvas = localStorage.getItem("currentCanvas");
	var currentIndex = parseInt(currentCanvas.substring(2));

	if (currentIndex === 1) {
		prevLink.style.display = 'none';
	}
	else if (currentIndex === 10) {
		nextLink.style.display = 'none';
	}
	else {
		prevLink.style.display = 'inline';
		nextLink.style.display = 'inline';
	}

	var metadataPath = relativePath + '/metadata.json';

	// Use fetch API to get metadata.json file
	fetch(metadataPath)
		.then(response => response.json())
		.then(data => {

			document.title = data.title;
			title.innerHTML = data.title;
			description.innerHTML = data.description;
		});
}

loadProjectData();

const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

canvas.addEventListener("click", () => {
	if (infoBox.classList.contains("active")) {
		infoBox.classList.remove("active");
	}
});


let canvasSize = Math.min(window.innerWidth, window.innerHeight);
canvas.width = canvasSize;
canvas.height = canvasSize;

let palette = ["#FFFFFF", "#59461D", "#59461D", "#59461D", "#59461D"];
let showPalette = false;

if (showPalette) {
	const colorInputs = [];

	for (let i = 0; i < 5; i++) {
		let colorInput = document.createElement("INPUT");

		colorInput.setAttribute("type", "color");

		document.getElementById("palette").appendChild(colorInput);

		colorInputs.push(colorInput);

		colorInput.addEventListener('input', updateCanvas);

		palette.push(colorInput.value);
	}

	function updatePalette() {
		// Clear the palette array
		palette = [];

		colorInputs.forEach(input => {
			palette.push(input.value);
		});
	}
}

function setCanvasBackground(color) {
	canvas.style.background = color;
}
setCanvasBackground(palette[0]);


function updateCanvas() {
	updatePalette();
	setCanvasBackground(palette[0]);
	console.log(palette);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

}


function paletteRandom() {
	var excludedColors = Array.prototype.slice.call(arguments);
	var filteredPalette = palette.filter(function (color) {
		return !excludedColors.includes(color);
	});
	return filteredPalette[Math.floor(Math.random() * filteredPalette.length)];
}

function clickReload() {
	canvas.addEventListener("click", () => {
		location.reload();
	});
}




// Function to update the palette array with the selected colors


// Add event listeners to the color input elements
// colorInputs.forEach((input) => {
// 	input.addEventListener('input', updateCanvas);
// });

window.addEventListener("resize", () => {
	location.reload();
});

