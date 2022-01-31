const canvas = new fabric.Canvas('canvas', { width: 640, height: 360 });

// Resize canvas

const buildZone = document.getElementById('buildZone');
const wrapper = document.getElementById('wrapper');
const paddingShift = 60;

function resizeCanvas() {
	// Width
	const newWidth = canvas.getWidth() + (window.innerWidth - (buildZone.offsetWidth + paddingShift));
	if(newWidth < 640 && newWidth > 200) canvas.setWidth(newWidth);
	
	// Height
	const newHeight = canvas.getHeight() + (window.innerHeight - (wrapper.offsetHeight + paddingShift));
	if(newHeight < 360 && newHeight > 250) canvas.setHeight(newHeight);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();


// Clear canvas - Delete shapes

document.getElementById('clear').addEventListener('click', () => {
	!deleteActiveObjects() && canvas.clear();
});

document.addEventListener('keydown', (event) => {
	 event.keyCode === 46 && deleteActiveObjects();
})

function deleteActiveObjects() {
	const activeObjects = canvas.getActiveObjects();
	if(!activeObjects.length) return false;
	
	if(activeObjects.length) {
		activeObjects.forEach(function(object) {
			canvas.remove(object);
		});
	} else {
		canvas.remove(activeObjects);
	}
	
	return true;
}


// SHAPES STYLES  ―――――――――――――――――――――――――

const styleZone = document.getElementById('styleZone');
const colors = ['#43c8bf', '#896bc8', '#e54f6b'];
let defaultColor = colors[0];
let activeElement = null;
const isSelectedClass = 'isSelected';

colors.forEach((color, i) => {
	const span = document.createElement('span');
	span.style.background = color;
	
	if(i === 0) {
		span.className = isSelectedClass;
		activeElement = span;
	}
	
	let icon = document.createElement('i');
	icon.className = 'feather icon-check';
	span.appendChild(icon);
	
	styleZone.appendChild(span);
	
	span.addEventListener('click', (event) => {
		if(span.className !== isSelectedClass) {
			span.classList.toggle(isSelectedClass);
			activeElement.classList.remove(isSelectedClass);
			activeElement = span;
			strokeColor = color;
		}
		
		if(canvas.getActiveObject()) {
			const activeObjects = canvas.getActiveObjects();
			if (!activeObjects.length) return;

			activeObjects.forEach(function (object) {
				object.set('stroke', strokeColor);
			});
			
			canvas.renderAll();
		}
	})
});


// SHAPES CREATION  ―――――――――――――――――――――――――

let strokeWidth = 2;
let strokeColor = defaultColor;

// Square

document.getElementById('square').addEventListener('click', () => {
	canvas.add(new fabric.Rect({
		strokeWidth: strokeWidth,
		stroke: strokeColor,
		fill: 'transparent',
		width: 50,
		height: 50,
		left: 100,
		top: 100
	}));
});

// Circle

document.getElementById('circle').addEventListener('click', () => {
	canvas.add(new fabric.Circle({
  	radius: 30,
		strokeWidth: strokeWidth,
		stroke: strokeColor,
		fill: 'transparent',
		left: 100,
		top: 100
	}));
});

// Triangle

document.getElementById('triangle').addEventListener('click', () => {
	canvas.add(new fabric.Triangle({
		strokeWidth: strokeWidth,
		stroke: strokeColor,
		fill: 'transparent',
		width: 50,
		height: 50,
		left: 100,
		top: 100
	}));
});