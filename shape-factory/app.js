"use strict";
class ShapeSF {
    color;
    type;
    element;
    constructor(color, type) {
        this.color = color;
        this.type = type;
        this.element = document.createElement('div');
        this.element.classList.add('shape', type);
        this.element.style.backgroundColor = color;
        this.setPosition();
        this.element.addEventListener('click', () => this.displayInfo());
    }
    setPosition() {
        const shapeFactoryArea = document.getElementById('game-area');
        const x = Math.random() * (shapeFactoryArea.clientWidth - 50);
        const y = Math.random() * (shapeFactoryArea.clientHeight - 50);
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }
    displayInfo() {
        const info = `Type: ${this.type}, Color: ${this.color}, Position: (${this.element.style.left}, ${this.element.style.top})`;
        document.getElementById('shape-info').textContent = info;
    }
    render(parent) {
        parent.appendChild(this.element);
    }
}
class CircleSF extends ShapeSF {
    constructor(color) {
        super(color, 'circle');
    }
}
class SquareSF extends ShapeSF {
    constructor(color) {
        super(color, 'square');
    }
}
class TriangleSF extends ShapeSF {
    constructor(color) {
        super(color, 'triangle');
    }
}
const shapeFactoryArea = document.getElementById('game-area');
const createCircleButton = document.getElementById('create-circle');
const createSquareButton = document.getElementById('create-square');
const createTriangleButton = document.getElementById('create-triangle');
createCircleButton.addEventListener('click', () => {
    const circle = new CircleSF('red');
    circle.render(shapeFactoryArea);
});
createSquareButton.addEventListener('click', () => {
    const square = new SquareSF('blue');
    square.render(shapeFactoryArea);
});
createTriangleButton.addEventListener('click', () => {
    const triangle = new TriangleSF('green');
    triangle.render(shapeFactoryArea);
});
