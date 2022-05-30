class trackerModal extends HTMLElement {
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
        modalStyle.setAttribute('href', './styles/tracker-modal.css');

        // create the elements which compose the custom element
        // const modalBackdrop = document.createElement('div'); need?
        const modalContainer = document.createElement('section');
        const questionHeader = document.createElement('h1');
        const imageContainer = document.createElement('div');
        const emoji = document.createElement('emoji');
        const instructionsText = document.createElement('p');
        const buttonsContainer = document.createElement('div');
        const backBtn = document.createElement('button');
        const forwardBtn = document.createElement('button');
        const backBtnImage = document.createElement('img');
        const forwardBtnImage = document.createElement('img');

        // set the attributes of the created elements
        // modalBackdrop.setAttribute('id', 'modal-backdrop');
        modalContainer.setAttribute('id', 'modal-container');
        questionHeader.setAttribute('id', 'question-header');
        imageContainer.setAttribute('id', 'image-container');
        instructionsText.setAttribute('id', 'instruction-text');
        buttonsContainer.setAttribute('id', 'buttons-container');
        backBtn.setAttribute('id', 'back-btn');
        forwardBtn.setAttribute('id', 'forward-btn');
        backBtnImage.setAttribute('src', './icons/arrow-icon.png');
        forwardBtnImage.setAttribute('src', './icons/arrow-icon.png');

        // set the inner text/html of the created elements
        questionHeader.innerText = 'How are you feeling?';
        emoji.innerHTML = '&#129409';

        if (isMobile) {
            instructionsText.innerText = 'Tap to change the emoji';
        } else {
            instructionsText.innerText = 'Click to change the emoji';
        }

        // append elements to container
        backBtn.appendChild(backBtnImage);
        forwardBtn.appendChild(forwardBtnImage);
        buttonsContainer.appendChild(backBtn);
        buttonsContainer.appendChild(forwardBtn);
        imageContainer.appendChild(emoji);
        modalContainer.appendChild(questionHeader);
        modalContainer.appendChild(imageContainer);
        modalContainer.appendChild(instructionsText);
        modalContainer.appendChild(buttonsContainer);
        // modalBackdrop.appendChild(modalContainer);

        // append to the shadowroot
        shadow.appendChild(modalStyle);
        shadow.appendChild(modalContainer);

        // modalContainer.addEventListener('click', closePopupModal);

        const elemID = this.id;
        function closePopupModal() {
            document.getElementById(`${elemID}`).style.display = 'none';
        }
    }
}
customElements.define('tracker-modal', trackerModal);
