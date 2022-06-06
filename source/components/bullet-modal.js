import { changeBullet } from "/source/scripts/notes-script.js";
import { DEFAULTBULLET, IMPORTANTBULLET, EVENTBULLET } from "./icons.js";
class BulletModal extends HTMLElement {
    constructor() {
        super();

        /* shadow DOM base */
        const shadow = this.attachShadow({ mode: 'open' });

        /* let the style for the shadow DOM elements */
        const bulletModalStyle = document.createElement('link');
        bulletModalStyle.setAttribute('rel', 'stylesheet');
        bulletModalStyle.setAttribute('href', './styles/bullet-modal.css');

        /* create main wrapper */
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', 'wrapper');

        /*create container to hold display entry and bullet option container*/
        const modalContainer = document.createElement('div');
        modalContainer.setAttribute('id', 'modal-container');
        

        /* create list element to show current text of selected bullet entry */
        const displayEntry = document.createElement('span');
        const bullet = document.createElement('span');
        const entry = document.createElement('p');
        displayEntry.setAttribute('id', 'display-entry');
        bullet.setAttribute('id', 'display-bullet');
        entry.setAttribute('id','display-text');
        displayEntry.appendChild(bullet);
        displayEntry.appendChild(entry);

        /* create container to hold bullet options */
        const optionsContainer = document.createElement('div');
        optionsContainer.setAttribute('id', 'options-container');

        /* create button for each bullet option */
        const defaultBulletBtn = document.createElement('button');
        defaultBulletBtn.textContent = 'Default bullet';
        const importantBulletBtn = document.createElement('button');
        importantBulletBtn.textContent = 'Important bullet';
        const checkBoxBtn = document.createElement('button');
        checkBoxBtn.textContent = 'Check box';
        const eventBulletBtn = document.createElement('button');
        eventBulletBtn.textContent = 'Event bullet';

        /* add id attribute to each button type */
        defaultBulletBtn.setAttribute('id', 'default-bullet-btn');
        importantBulletBtn.setAttribute('id','important-bullet-btn');
        checkBoxBtn.setAttribute('id', 'checkbox-bullet-btn');
        eventBulletBtn.setAttribute('id', 'event-bullet-btn');

        /* initialize state of all bullets to 'off' */
        defaultBulletBtn.setAttribute('state', 'off');
        importantBulletBtn.setAttribute('state', 'off');
        checkBoxBtn.setAttribute('state', 'off');
        eventBulletBtn.setAttribute('state', 'off');

        /* add bullet buttons to same class */
        defaultBulletBtn.setAttribute('class', 'bullet-btn');
        importantBulletBtn.setAttribute('class', 'bullet-btn');
        checkBoxBtn.setAttribute('class', 'bullet-btn');
        eventBulletBtn.setAttribute('class', 'bullet-btn');

        /* create symbols for each bullet option */
        const defaultBullet = document.createElement('span');
        defaultBullet.textContent = DEFAULTBULLET;
        const importantBullet = document.createElement('span');
        importantBullet.textContent = IMPORTANTBULLET;
        const eventBullet = document.createElement('span');
        eventBullet.textContent = EVENTBULLET;
        const checkBox = document.createElement('span');
        checkBox.textContent = '☑';
        defaultBullet.setAttribute('class', 'bullet-icon');
        importantBullet.setAttribute('class', 'bullet-icon');
        checkBox.setAttribute('class', 'bullet-icon');
        eventBullet.setAttribute('class', 'bullet-icon');


        /* append symbols to bullet option buttons */
        defaultBulletBtn.appendChild(defaultBullet);
        importantBulletBtn.appendChild(importantBullet);
        checkBoxBtn.appendChild(checkBox);
        eventBulletBtn.appendChild(eventBullet);

         /* append bullet buttons to options container */
        optionsContainer.appendChild(defaultBulletBtn);
        optionsContainer.appendChild(importantBulletBtn);
        optionsContainer.appendChild(checkBoxBtn);
        optionsContainer.appendChild(eventBulletBtn);

         /* append selected entry element and options container to modal container */
        modalContainer.appendChild(displayEntry);
        modalContainer.appendChild(optionsContainer);

         /* append modal container to wrapper */
         wrapper.appendChild(modalContainer);

         /* add event listeners */
        defaultBulletBtn.addEventListener('click', changeBullet);
        importantBulletBtn.addEventListener('click', changeBullet);
        checkBoxBtn.addEventListener('click', changeBullet);
        eventBulletBtn.addEventListener('click', changeBullet);

         /* append to shadow root */
        shadow.appendChild(bulletModalStyle);
        shadow.appendChild(wrapper);
    }
}
/* Custom HTML element can be used as <bullet-modal></bullet-modal> */
customElements.define('bullet-modal', BulletModal);