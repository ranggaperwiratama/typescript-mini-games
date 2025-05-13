class MysteryBox {
    private hasSurprise: boolean;
    private isSelected: boolean = false;
    private element: HTMLElement;

    constructor(public index: number, element: HTMLElement) {
        this.hasSurprise = false;
        this.element = element;
        this.element.addEventListener('click', () => this.select());
    }

    public setSurprise(value: boolean) {
        this.hasSurprise = value;
    }

    public select() {
        boxes.forEach(box => box.deselect());
        this.isSelected = true;
        this.element.classList.add('selected');
        revealButton.disabled = false;
    }

    public deselect() {
        this.isSelected = false;
        this.element.classList.remove('selected');
    }

    public reveal() {
        this.element.classList.add('revealed');
        if (this.hasSurprise) {
            this.element.classList.add('surprise');
            resultDisplay.textContent = `🎉 Box ${this.index + 1} has the surprise!`;
        } else {
            resultDisplay.textContent = `❌ No surprise in Box ${this.index + 1}. Try again!`;
        }
    }

    public isCurrentlySelected(): boolean {
        return this.isSelected;
    }
}

const resetButton = document.getElementById('reset-button') as HTMLButtonElement;
const boxElements = document.querySelectorAll('.box');
const revealButton = document.getElementById('reveal-button') as HTMLButtonElement;
const resultDisplay = document.getElementById('result')!;

const boxes: MysteryBox[] = [];

boxElements.forEach((el, index) => {
    boxes.push(new MysteryBox(index, el as HTMLElement));
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
        const el = document.querySelector(`.box[data-index="${box.index}"]`) as HTMLElement;
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

