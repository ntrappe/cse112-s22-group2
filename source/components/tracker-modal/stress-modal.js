class stressModal extends HTMLElement {
    constructor() {
        super();

        // determines if the user is on mobile by checking its user Agent
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
            .test(navigator.userAgent);

        // write element functionality in here
        const shadow = this.attachShadow({ mode: 'open' });

        // set the style for the shadow DOM elements
        const modalStyle = document.createElement('link');
        modalStyle.setAttribute('rel', 'stylesheet');
        modalStyle.setAttribute('href', './styles/stress-modal.css');

        // create the elements which compose the custom element
        const modalContainer = document.createElement('section');
        const questionHeader = document.createElement('h1');
        const imageContainer = document.createElement('div');
        const stressForm = document.createElement('form');
        const emojiContainer = document.createElement('div');
        const emojiValue = document.createElement('span');
        const inputContainer = document.createElement('div');
        const minValue = document.createElement('span');
        const stressInput = document.createElement('input');
        const maxValue = document.createElement('span');
        const instructionsText = document.createElement('p');
        const buttonsContainer = document.createElement('div');
        const backBtn = document.createElement('button');
        const forwardBtn = document.createElement('button');
        const backBtnImage = document.createElement('img');
        const forwardBtnImage = document.createElement('img');

        // set the attributes of the created elements
        modalContainer.setAttribute('id', 'modal-container');
        questionHeader.setAttribute('id', 'question-header');
        imageContainer.setAttribute('id', 'image-container');
        emojiContainer.setAttribute('id', 'emoji-container');
        inputContainer.setAttribute('id', 'input-container');
        instructionsText.setAttribute('id', 'instruction-text');
        buttonsContainer.setAttribute('id', 'buttons-container');
        backBtn.setAttribute('id', 'back-btn');
        forwardBtn.setAttribute('id', 'forward-btn');
        backBtnImage.setAttribute('src', './icons/arrow-icon.png');
        forwardBtnImage.setAttribute('src', './icons/arrow-icon.png');
        stressInput.setAttribute('type', 'range');
        stressInput.setAttribute('step', '10');

        // set the inner text/html of the created elements
        questionHeader.innerText = 'How stressed are you feeling today?';
        stressInput.value = 1;
        minValue.innerHTML = '😁';
        maxValue.innerHTML = '🤬';
        emojiValue.innerHTML = '😁';

        if (isMobile) {
            instructionsText.innerText = 'Tap and drag to change the meter';
        } else {
            instructionsText.innerText = 'Click and drag to change the meter';
        }

        // append elements to container
        backBtn.appendChild(backBtnImage);
        forwardBtn.appendChild(forwardBtnImage);
        buttonsContainer.appendChild(backBtn);
        buttonsContainer.appendChild(forwardBtn);
        inputContainer.appendChild(minValue);
        inputContainer.appendChild(stressInput);
        inputContainer.appendChild(maxValue);
        emojiContainer.appendChild(emojiValue);
        stressForm.appendChild(emojiContainer);
        stressForm.appendChild(inputContainer);
        imageContainer.appendChild(stressForm);
        modalContainer.appendChild(questionHeader);
        modalContainer.appendChild(imageContainer);
        modalContainer.appendChild(instructionsText);
        modalContainer.appendChild(buttonsContainer);

        // append to the shadowroot
        shadow.appendChild(modalStyle);
        shadow.appendChild(modalContainer);

        stressInput.focus();
        imageContainer.addEventListener('click', focusInput);
        stressInput.addEventListener('input', updateSlider);

        function focusInput() {
            stressInput.focus();
        }

        function updateSlider() {
            const value = parseInt(stressInput.value, 10);
            if (value < 10) {
                emojiValue.innerHTML = '😁';
            } else if (value < 20) {
                emojiValue.innerHTML = '😌';
            } else if (value < 30) {
                emojiValue.innerHTML = '🙂';
            } else if (value < 40) {
                emojiValue.innerHTML = '😐️';
            } else if (value < 50) {
                emojiValue.innerHTML = '😬';
            } else if (value < 60) {
                emojiValue.innerHTML = '😩';
            } else if (value < 70) {
                emojiValue.innerHTML = '😖';
            } else if (value < 80) {
                emojiValue.innerHTML = '😢';
            } else if (value < 90) {
                emojiValue.innerHTML = '😭';
            } else if (value < 100) {
                emojiValue.innerHTML = '😡';
            } else {
                emojiValue.innerHTML = '🤬';
            }
            emojiValue.style.left = `${value}%`;
        }
    }
}
customElements.define('stress-modal', stressModal);
