const canvasSelectors = document.querySelectorAll(".canvas-selector");
const canvasTitle = document.querySelector(".canvas-title");
const canvasDescription = document.querySelector(".canvas-description");
const canvasImg = document.querySelector(".canvas-img");

canvasSelectors.forEach((canvasSelector, idx) => {
	canvasSelector.addEventListener('click', function () {
		canvasSelectors.forEach(function (c) {
			c.classList.remove('active');
		});
		canvasSelector.classList.add("active");

		var projectIndex = (idx + 1).toString().padStart(2, "0");
		var projectPath = 'projects/' + projectIndex + '/metadata.json';
		var imgSrc = 'projects/' + projectIndex + '/thumbnail.jpg';
		var relativePath = './' + projectIndex;
		localStorage.setItem("currentCanvas", relativePath);
		fetch(projectPath)
			.then(response => response.json())
			.then(data => {
				loadProject(data.title, data.description, imgSrc);
			});
	});
});

function loadProject(title, description, thumbnail, code) {
	canvasTitle.innerHTML = title;
	canvasDescription.innerHTML = description;
	canvasImg.src = thumbnail;
}




