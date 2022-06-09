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
        const emojiPickerStyle = document.createElement('link');
        modalStyle.setAttribute('rel', 'stylesheet');
        modalStyle.setAttribute('href', './styles/tracker-modal.css');
        emojiPickerStyle.setAttribute('rel', 'stylesheet');
        emojiPickerStyle.setAttribute('href', './styles/emoji-picker.css');

        // create the elements which compose the custom element
        const modalContainer = document.createElement('section');
        const questionHeader = document.createElement('h1');
        const imageContainer = document.createElement('div');
        const emoji = document.createElement('emoji');
        const emojiPicker = document.createElement('emoji-picker');
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
        imageContainer.appendChild(emojiPicker);
        modalContainer.appendChild(instructionsText);
        modalContainer.appendChild(buttonsContainer);

        // append to the shadowroot
        shadow.appendChild(modalStyle);
        shadow.appendChild(modalContainer);

        emojiPicker.shadowRoot.appendChild(emojiPickerStyle);

        emojiPicker.addEventListener('emoji-click', (event) => {
            console.log(event.detail);
            emoji.innerHTML = event.detail.unicode;
            showEmoji();
        });
        imageContainer.addEventListener('click', showEmojiPicker);
        forwardBtn.addEventListener('click', nextTracker);
        // emo

        function showEmojiPicker() {
            emojiPicker.style.display = 'flex';
            emoji.style.display = 'none';
            instructionsText.style.visibility = 'hidden';
            emojiPicker.shadowRoot.children[1].children[1].children[0].children[0].value = '';
            emojiPicker.shadowRoot.children[1].children[1].children[0].children[0]
                .dispatchEvent(new Event('input'));
        }

        function showEmoji() {
            emojiPicker.style.display = 'none';
            emoji.style.display = 'flex';
            imageContainer.style.display = 'flex';
            instructionsText.style.visibility = 'unset';
        }

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
    }
}
customElements.define('tracker-modal', trackerModal);
