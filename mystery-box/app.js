"use strict";
class MysteryBox {
    index;
    hasSurprise;
    isSelected = false;
    element;
    constructor(index, element) {
        this.index = index;
        this.hasSurprise = false;
        this.element = element;
        this.element.addEventListener('click', () => this.select());
    }
    setSurprise(value) {
        this.hasSurprise = value;
    }
    select() {
        boxes.forEach(box => box.deselect());
        this.isSelected = true;
        this.element.classList.add('selected');
        revealButton.disabled = false;
    }
    deselect() {
        this.isSelected = false;
        this.element.classList.remove('selected');
    }
    reveal() {
        this.element.classList.add('revealed');
        if (this.hasSurprise) {
            this.element.classList.add('surprise');
            resultDisplay.textContent = `🎉 Box ${this.index + 1} has the surprise!`;
        }
        else {
            resultDisplay.textContent = `❌ No surprise in Box ${this.index + 1}. Try again!`;
        }
    }
    isCurrentlySelected() {
        return this.isSelected;
    }
}
const resetButton = document.getElementById('reset-button');
const boxElements = document.querySelectorAll('.box');
const revealButton = document.getElementById('reveal-button');
const resultDisplay = document.getElementById('result');
const boxes = [];
boxElements.forEach((el, index) => {
    boxes.push(new MysteryBox(index, el));
});
// Randomly assign the surprise
const surpriseIndex = Math.floor(Math.random() * boxes.length);
boxes[surpriseIndex].setSurprise(true);
revealButton.addEventListener('click', () => {
    const selectedBox = boxes.find(box => box.isCurrentlySelected());
    if (selectedBox) {
        selectedBox.reveal();
        revealButton.disabled = true;
    }
});
resetButton.addEventListener('click', () => {
    // Clear box states
    boxes.forEach(box => {
        box.deselect();
        const el = document.querySelector(`.box[data-index="${box.index}"]`);
        el.classList.remove('revealed', 'surprise');
    });
    // Reset result and buttons
    resultDisplay.textContent = '';
    revealButton.disabled = true;
    // Reassign surprise
    boxes.forEach(box => box.setSurprise(false));
    const newSurpriseIndex = Math.floor(Math.random() * boxes.length);
    boxes[newSurpriseIndex].setSurprise(true);
    console.log(boxes);
});
