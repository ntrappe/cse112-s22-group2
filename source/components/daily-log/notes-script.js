// import { currentEntries, autoGrow } from './daily-log.js';
import { autoGrow } from './daily-log.js';
import { cancel, click, start } from './long-press.js';
import { DEFAULTBULLET, IMPORTANTBULLET, EVENTBULLET } from './bullet-helper.js';

/* global variable to keep track of the most recently changed bullet */
let mostRecentBullet = null;

/**
 * dictionary to keep track of current note entries
 * currentEntries[entry] = entry.value
 * 'Let' so can be updated globally
 */
const currentEntries = new Map();

/**
 * @function enterKeyPressed
 * Creates a new bullet on the next line if the user presses enter and adds
 * current entry to currentEntries, or if an existing bullet is edited then
 * it updates the entry in currentEntries
 * Helper function for control.
 * @param {Event} event keyup
 */
function enterKeyPressed(event) {
    // check if entry is the only one in the list
    const nextNoteEntry = this.parentNode.nextElementSibling;
    if (event.key === 'Enter') {
        event.preventDefault();
        if (this.getAttribute('new') === 'true' && this.value) {
            currentEntries.set(this, this.value);
            this.setAttribute('new', 'false');
            createListElement();
        } else if (this.getAttribute('new') === 'false'
                && nextNoteEntry === null
                && this.value) {
            updateCurrentEntry(this);
            createListElement();
        } else {
            updateCurrentEntry(this);
            this.blur();
        }
    }
}

/**
 * @function deleteEntry
 * Deletes a bullet if the user presses backspace on an empty bullet
 * and deletes entry from currentEntries.
 * Helper function for control.
 * @param {Event} event keydown
 */
function deleteEntry(event) {
    const nextListElement = this.parentNode.nextElementSibling;
    const prevListElement = this.parentNode.previousElementSibling;
    if (!this.value && event.key === 'Backspace') {
        const entryToDelete = this;
        currentEntries.delete(entryToDelete);
        this.parentNode.remove();

        /** if it is the last entry in the list, and there is an entry above it
         * autofocus to line above on delete
         */
        if (nextListElement === null && prevListElement !== null
            && currentEntries.size !== 0) { // focus on text area
            prevListElement.childNodes[1].focus();
        } else if (nextListElement === null
                && prevListElement.id === 'notes-placeholder') {
            document.querySelector('daily-log').shadowRoot.getElementById('notes-placeholder').style.display = 'block';
        }
    }
}

/**
 * @function deleteEntry
 * Updates value of entry in currentEntries.
 * @param {Element} noteEntry the entry to update
 */
function updateCurrentEntry(noteEntry) {
    currentEntries.set(noteEntry, noteEntry.value);
}

/**
 * @function notesClick
 * Hides the notes placeholder and creates a new bullet.
 */
export function notesClick() {
    const notesPlaceholder = document.querySelector('daily-log').shadowRoot.getElementById('notes-placeholder');
    if (currentEntries.size === 0) {
        notesPlaceholder.style.display = 'none';
        createListElement();
    }
}

/**
 * @function launchBulletModal
 * Updates most recent bullet with the bullet that triggered this event handler
 * and launches bullet modal with a display of this selected list element
 * @param {Element} currentBullet the bullet that triggered this event handler
 */
export function launchBulletModal(currentBullet) {
    /* update most recent bullet entry */
    mostRecentBullet = currentBullet;

    /* Get bullet modal and display bullet and entry from shadow DOM */
    const bulletModal = document.querySelector('bullet-modal').shadowRoot;
    const displayBullet = document.querySelector('bullet-modal').shadowRoot.getElementById('display-bullet');
    const displayText = document.querySelector('bullet-modal').shadowRoot.getElementById('display-text');

    /* Get bullet type and entry text to display */
    const bulletType = currentBullet.parentNode.getAttribute('bullet-type');
    let entryText = currentBullet.nextSibling.value;

    /** If entry text is longer than 25 chars, only display the first 25 chars followed
     *  by ellipses
     */
    if (entryText.length > 15) {
        entryText = `${entryText.substring(0, 15)} ...`;
    }

    /* Remove old display bullet and set display entry to selected bullet and text */
    if (displayBullet.hasChildNodes() === true) {
        displayBullet.removeChild(displayBullet.childNodes[0]);
    }
    displayBullet.appendChild(currentBullet.childNodes[0].cloneNode());
    displayBullet.setAttribute('bullet-type', bulletType);
    displayText.innerHTML = entryText;

    /* Make modal visible and toggle button corresponding to selected bullet */
    bulletModal.getElementById('wrapper').style.display = 'block';
    if (bulletType === 'default-bullet') {
        bulletModal.getElementById('default-bullet-btn').setAttribute('state', 'on');
    }
    if (bulletType === 'important-bullet') {
        bulletModal.getElementById('important-bullet-btn').setAttribute('state', 'on');
    }
    if (bulletType === 'checkbox-bullet') {
        bulletModal.getElementById('checkbox-bullet-btn').setAttribute('state', 'on');
    }
    if (bulletType === 'event-bullet') {
        bulletModal.getElementById('event-bullet-btn').setAttribute('state', 'on');
    }
}

/**
 * @function changeBullet
 * Changes the bullet type to selected bullet and auto closes modal
 * @param {Event} event the button event that corresponds to the bullet to change to
 */
export function changeBullet(event) {
    const bulletModal = document.querySelector('bullet-modal').shadowRoot;

    /** Get bullet type of current bullet */
    const bulletType = mostRecentBullet.parentNode.getAttribute('bullet-type');

    /** Get bullet option buttons */

    const bulletBtns = bulletModal.querySelectorAll('.bullet-btn');
    let newBulletNode = null;

    /** Turn buttons off */
    bulletBtns.forEach((button) => {
        button.setAttribute('state', 'off');
    });

    if (event.target.id === 'default-bullet-btn' && bulletType !== 'default-bullet') {
        mostRecentBullet.parentNode.setAttribute('bullet-type', 'default-bullet');
        newBulletNode = document.createTextNode(DEFAULTBULLET);
    }
    if (event.target.id === 'important-bullet-btn' && bulletType !== 'important-bullet') {
        mostRecentBullet.parentNode.setAttribute('bullet-type', 'important-bullet');
        newBulletNode = document.createTextNode(IMPORTANTBULLET);
    }
    if (event.target.id === 'checkbox-bullet-btn' && bulletType !== 'checkbox-bullet') {
        mostRecentBullet.parentNode.setAttribute('bullet-type', 'checkbox-bullet');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        newBulletNode = checkbox;
    }
    if (event.target.id === 'event-bullet-btn' && bulletType !== 'event-bullet') {
        mostRecentBullet.parentNode.setAttribute('bullet-type', 'event-bullet');
        newBulletNode = document.createTextNode(EVENTBULLET);
    }
    if (newBulletNode !== null) {
        mostRecentBullet.removeChild(mostRecentBullet.childNodes[0]);
        mostRecentBullet.appendChild(newBulletNode.cloneNode());
    }

    /** Highlight button on click */
    const currButton = event.target;
    currButton.setAttribute('state', 'on');

    /** Automatically close modal 200ms after user selects a bullet */
    setTimeout(() => {
        currButton.setAttribute('state', 'off');
        bulletModal.getElementById('wrapper').style.display = 'none';
    }, 200, currButton);
}

/**
 * @function createListElement
 * Creates a new note entry element and appends it to the Notes section
 */
export function createListElement() {
    /* Get notes section container from Shadow DOM */
    const notesContainer = document.querySelector('daily-log').shadowRoot.getElementById('notes-container');

    /** List element structure: <span><span></span><input></input></span>
     * Span element holds bullet container and input area for note entry
     */
    const listElement = document.createElement('span');
    const bulletContainer = document.createElement('span');
    const noteEntry = document.createElement('textarea');

    /* Set attributes for styling */
    listElement.setAttribute('id', 'list-element');
    bulletContainer.setAttribute('id', 'bullet-container');
    noteEntry.setAttribute('id', 'note-entry');

    /* Add default bullet text node to entry */
    const defaultBullet = document.createTextNode(DEFAULTBULLET);
    bulletContainer.appendChild(defaultBullet);

    /* Set 'bullet-type' attribute for this list element */
    listElement.setAttribute('bullet-type', 'default-bullet');

    /** Note entry textarea should default to one line and dynamically grow with input
     * Note entry 'new' attribute should be set to true since it is a new entry
     */
    noteEntry.setAttribute('rows', '1');
    noteEntry.oninput = function () { autoGrow(this); };
    //noteEntry.onclick = function () { this.scrollIntoView(); };
    noteEntry.setAttribute('new', 'true');

    /* Append children to List Element */
    listElement.appendChild(bulletContainer);
    listElement.appendChild(noteEntry);

    /* Add event listeners */
    noteEntry.addEventListener('keyup', enterKeyPressed);
    noteEntry.addEventListener('keydown', deleteEntry);
    /* Prevent user from creating a newline with 'Enter' within note entry textarea */
    noteEntry.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });

    /* Add longpress event listeners to List Element to launch bullet modal */
    bulletContainer.addEventListener('mousedown', start);
    bulletContainer.addEventListener('touchstart', start);
    bulletContainer.addEventListener('click', click);
    bulletContainer.addEventListener('mouseout', cancel);
    bulletContainer.addEventListener('touchend', cancel);
    bulletContainer.addEventListener('touchleave', cancel);
    bulletContainer.addEventListener('touchcancel', cancel);
    bulletContainer.oncontextmenu = (e) => {
        e.preventDefault();
    };

    /* Append list element to Notes section */
    notesContainer.appendChild(listElement);
    

    /* Automatically focus on new element's input area */
    noteEntry.focus();
    noteEntry.scrollIntoView({block: 'nearest'});
}

/**
 * @method populateListElement
 * Yes this is a very redundant function. (TODO: rely on above fxn).
 * Will repopulate the list of bullet points from local storage
 * by creating a bullet point, adding content, and setting bullet style.
 * @param {String} style (type of bullet like default)
 * @param {String} text (content user typed)
 */
export function populateListElement(style, text) {
    /* Get notes section container from Shadow DOM */
    const notesContainer = document.querySelector('daily-log').shadowRoot.getElementById('notes-container');

    /** List element structure: <span><span></span><input></input></span>
     * Span element holds bullet container and input area for note entry
     */
    const listElement = document.createElement('span');
    const bulletContainer = document.createElement('span');
    const noteEntry = document.createElement('textarea');

    /* Set attributes for styling */
    listElement.setAttribute('id', 'list-element');
    bulletContainer.setAttribute('id', 'bullet-container');
    noteEntry.setAttribute('id', 'note-entry');
    noteEntry.value = text;

    /* Add default bullet text node to entry */
    let bulletPoint = null;

    if (style === 'important-bullet') {
        bulletPoint = document.createTextNode(IMPORTANTBULLET);
    } else if (style === 'event-bullet') {
        bulletPoint = document.createTextNode(EVENTBULLET);
    } else if (style === 'checkbox-bullet') {
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        bulletPoint = checkbox;
    } else {
        bulletPoint = document.createTextNode(DEFAULTBULLET);
    }

    /* Set 'bullet-type' attribute for this list element */
    bulletContainer.appendChild(bulletPoint);
    listElement.setAttribute('bullet-type', style);

    /** Note entry textarea should default to one line and dynamically grow with input
     * Note entry 'new' attribute should be set to true since it is a new entry
     */
    noteEntry.setAttribute('rows', '1');
    noteEntry.oninput = function () { autoGrow(this); };
    noteEntry.setAttribute('new', 'true');

    /* Append children to List Element */
    listElement.appendChild(bulletContainer);
    listElement.appendChild(noteEntry);

    /* Add event listeners */
    noteEntry.addEventListener('keyup', enterKeyPressed);
    noteEntry.addEventListener('keydown', deleteEntry);
    /* Prevent user from creating a newline with 'Enter' within note entry textarea */
    noteEntry.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });

    /* Add longpress event listeners to List Element to launch bullet modal */
    bulletContainer.addEventListener('mousedown', start);
    bulletContainer.addEventListener('touchstart', start);
    bulletContainer.addEventListener('click', click);
    bulletContainer.addEventListener('mouseout', cancel);
    bulletContainer.addEventListener('touchend', cancel);
    bulletContainer.addEventListener('touchleave', cancel);
    bulletContainer.addEventListener('touchcancel', cancel);
    bulletContainer.oncontextmenu = (e) => {
        e.preventDefault();
    };

    /* Append list element to Notes section */
    notesContainer.appendChild(listElement);

    /* Automatically focus on new element's input area */
    noteEntry.focus();

    /* Remove placeholder */
    const notesPlaceholder = document.querySelector('daily-log').shadowRoot.getElementById('notes-placeholder');
    notesPlaceholder.style.display = 'none';
}
