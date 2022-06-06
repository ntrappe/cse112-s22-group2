class waterModal extends HTMLElement {
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
        modalStyle.setAttribute('href', './styles/water-modal.css');

        // create the elements which compose the custom element
        const modalContainer = document.createElement('section');
        const questionHeader = document.createElement('h1');
        const imageContainer = document.createElement('div');
        const gradientContainer = document.createElement('div');
        const waterInput = document.createElement('input');
        const waterMetricText = document.createElement('p');
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
        gradientContainer.setAttribute('id', 'gradient-container');
        waterMetricText.setAttribute('id', 'water-metric-text');
        instructionsText.setAttribute('id', 'instruction-text');
        buttonsContainer.setAttribute('id', 'buttons-container');
        backBtn.setAttribute('id', 'back-btn');
        forwardBtn.setAttribute('id', 'forward-btn');
        backBtnImage.setAttribute('src', './icons/arrow-icon.png');
        forwardBtnImage.setAttribute('src', './icons/arrow-icon.png');
        waterInput.setAttribute('type', 'number');
        waterInput.setAttribute('min', '0');
        waterInput.setAttribute('max', '1000');
        waterInput.value = 0;

        // set the inner text/html of the created elements
        questionHeader.innerText = 'How much water have you drank today?';
        waterMetricText.innerText = 'oz';

        if (isMobile) {
            instructionsText.innerText = 'Tap to change the number';
        } else {
            instructionsText.innerText = 'Click to change the number';
        }

        // append elements to container
        backBtn.appendChild(backBtnImage);
        forwardBtn.appendChild(forwardBtnImage);
        buttonsContainer.appendChild(backBtn);
        buttonsContainer.appendChild(forwardBtn);
        gradientContainer.appendChild(waterInput);
        gradientContainer.appendChild(waterMetricText);
        imageContainer.appendChild(gradientContainer);
        modalContainer.appendChild(questionHeader);
        modalContainer.appendChild(imageContainer);
        modalContainer.appendChild(instructionsText);
        modalContainer.appendChild(buttonsContainer);

        // append to the shadowroot
        shadow.appendChild(modalStyle);
        shadow.appendChild(modalContainer);

        waterInput.focus();
        waterInput.addEventListener('input', sanitize);
        imageContainer.addEventListener('click', focusInput);

        function sanitize() {
            if (parseInt(waterInput.value, 10) > 1000) {
                waterInput.value = 1000;
            }
        }

        function focusInput() {
            waterInput.focus();
        }

        // forwardBtn.addEventListener('click', nextTracker);
        // emo

        /*
        function nextTracker(trackerName) {
            if (emojiPicker.style.display !== 'none') {
                return;
            }

            if (trackerName === 'sleep') {
                const input = document.createElement('input');
                input.setAttribute('min', '0');
                input.setAttribute('min', '0');
                // imageContainer.
            }
            imageContainer.removeChild(emoji);
            modalContainer.removeChild(emojiPicker);
            imageContainer.removeEventListener('click', showEmojiPicker);
        }
        */
    }
}
customElements.define('water-modal', waterModal);
