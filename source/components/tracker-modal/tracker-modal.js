class TrackerModal extends HTMLElement {
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
        const controlContainer = document.createElement('div');
        const questionHeader = document.createElement('h1');
        const imageContainer = document.createElement('div');

        const cancelBtn = document.createElement('button');
        const saveBtn = document.createElement('button');
        const emoji = document.createElement('emoji');
        const emojiPicker = document.createElement('emoji-picker');
        const instructionsText = document.createElement('p');

        // set the attributes of the created elements
        modalContainer.setAttribute('id', 'modal-container');
        controlContainer.setAttribute('id', 'tracker-control-container');
        questionHeader.setAttribute('id', 'question-header');
        imageContainer.setAttribute('id', 'image-container');
        instructionsText.setAttribute('id', 'instruction-text');
        cancelBtn.setAttribute('id', 'tracker-cancel-btn');
        saveBtn.setAttribute('id', 'tracker-save-btn');

        // set the inner text/html of the created elements
        cancelBtn.textContent = 'Cancel';
        saveBtn.textContent = 'Save';
        questionHeader.innerText = 'How are you feeling?';
        emoji.innerHTML = '&#129409';

        if (isMobile) {
            instructionsText.innerText = 'Tap to change the emoji';
        } else {
            instructionsText.innerText = 'Click to change the emoji';
        }

        // append to the shadowroot
        shadow.appendChild(modalStyle);
        shadow.appendChild(modalContainer);
        modalContainer.appendChild(controlContainer);
        modalContainer.appendChild(questionHeader);
        modalContainer.appendChild(imageContainer);
        modalContainer.appendChild(instructionsText);

        // append elements to container
        controlContainer.appendChild(cancelBtn);
        controlContainer.appendChild(saveBtn);
        imageContainer.appendChild(emoji);
        imageContainer.appendChild(emojiPicker);
        emojiPicker.appendChild(emojiPickerStyle);

        saveBtn.addEventListener('click', () => {
            console.log('current emoji: ' + emoji.textContent);
            shadow.dispatchEvent(saveTrackersEvent);
        });

        cancelBtn.addEventListener('click', () => {
            shadow.dispatchEvent(cancelTrackersEvent);
        });

        emojiPicker.addEventListener('emoji-click', (event) => {
            console.log(event.detail);
            emoji.innerHTML = event.detail.unicode;
            showEmoji();
        });
        imageContainer.addEventListener('click', showEmojiPicker);
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

        /* setter functions for control */

        /**
         * Takes a string emoji, converts to decimal code,
         * then sets emoji on page to match
         * @param {String} savedEmoji like '🦁'
         */
        this.setTrackerEmoji = (savedEmoji) => {
            const emojiDecimal = savedEmoji.codePointAt(0);
            const emojiDecimalCode = '&#' + emojiDecimal;
            emoji.innerHTML = emojiDecimalCode;
        };

        /* Events */
        const saveTrackersEvent = new CustomEvent('saveTrackers', {
            bubbles: true, // event listenable outside of container
            composed: true,
            detail: { emoji: () => emoji.innerHTML },
        });

        const cancelTrackersEvent = new CustomEvent('cancelTrackers', {
            bubbles: true, // event listenable outside of container
            composed: true,
        });
    }
}

customElements.define('tracker-modal', TrackerModal);
export default TrackerModal;
