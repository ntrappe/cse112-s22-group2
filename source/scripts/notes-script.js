import { currentEntries, auto_grow } from "../components/daily-log/daily-log.js";
import { cancel, click, start } from "./long-press.js";
import { DEFAULTBULLET, IMPORTANTBULLET, EVENTBULLET } from "../components/icons.js";
/* global variable to keep track of the most recently changed bullet */
var mostRecentBullet = null;

/**
 * @function enterKeyPressed
 * Creates a new bullet on the next line if the user presses enter and adds
 * current entry to currentEntries, or if an existing bullet is edited then
 * it updates the entry in currentEntries
 * Helper function for control.
 * @param {Event} event keyup
 */

function enterKeyPressed(event) {
  //check if entry is the only one in the list
  var nextNoteEntry = this.parentNode.nextElementSibling;
  console.log(nextNoteEntry);
  if (event.key === 'Enter') {
    event.preventDefault();
    if (this.getAttribute('new') == 'true' && this.value) {
        currentEntries.set(this, this.value);
        this.setAttribute('new', 'false');  
        createListElement();
    } else if (this.getAttribute('new') == 'false' && nextNoteEntry == null) {
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
  var nextListElement= this.parentNode.nextElementSibling;
  var prevListElement = this.parentNode.previousElementSibling;
  if (!this.value && event.key === "Backspace") {
    console.log('prevlistelementID');
    console.log(prevListElement.id);
    console.log(currentEntries.size);
    var entryToDelete = this;
    currentEntries.delete(entryToDelete);
    this.parentNode.remove();
    console.log(currentEntries.size);
    
    /** if it is the last entry in the list, and there is an entry above it
     * autofocus to line above on delete
     */
    if (nextListElement == null && prevListElement != null && currentEntries.size != 0) {
      //focus on text area
      console.log(prevListElement.id);
      console.log(prevListElement.childNodes[1]);
      prevListElement.childNodes[1].focus();
    } 
    else if (nextListElement == null && prevListElement.id == 'notes-placeholder') {
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
  var notesPlaceholder = document.querySelector('daily-log').shadowRoot.getElementById('notes-placeholder');
  if (currentEntries.size == 0) {
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
    console.log('mostRecentBullet = current target');
    console.log(currentBullet);
    console.log(mostRecentBullet);
    console.log('current bullet child', currentBullet.childNodes[0])

    /* Get bullet modal and display bullet and entry from shadow DOM */
    var bulletModal = document.querySelector('bullet-modal').shadowRoot;
    var displayBullet = document.querySelector('bullet-modal').shadowRoot.getElementById('display-bullet');
    var displayText = document.querySelector('bullet-modal').shadowRoot.getElementById('display-text');

   /* Get bullet type and entry text to display */
    var bulletType = currentBullet.parentNode.getAttribute('bullet-type');
    var entryText = currentBullet.nextSibling.value;

    /** If entry text is longer than 25 chars, only display the first 25 chars followed
     *  by ellipses
     */
    if (entryText.length > 25) {
      entryText = entryText.substring(0,25) + ' ...';
    }

    /* Remove old display bullet and set display entry to selected bullet and text */
    if (displayBullet.hasChildNodes() == true) {
      console.log('hello');
      displayBullet.removeChild(displayBullet.childNodes[0]);
    };
    displayBullet.appendChild(currentBullet.childNodes[0].cloneNode());
    displayText.innerHTML = entryText;

    /* Make modal visible and toggle button corresponding to selected bullet */
    bulletModal.getElementById('wrapper').style.display = 'block';
    if (bulletType == 'default-bullet') {
      bulletModal.getElementById('default-bullet-btn').setAttribute('state', 'on');
    }
    if (bulletType == 'important-bullet') {
      bulletModal.getElementById('important-bullet-btn').setAttribute('state', 'on');
    }
    if (bulletType == 'checkbox-bullet') {
      bulletModal.getElementById('checkbox-bullet-btn').setAttribute('state', 'on');
    }
    if (bulletType == 'event-bullet') {
      bulletModal.getElementById('event-bullet-btn').setAttribute('state', 'on');
    }
}

/**
 * @function changeBullet
 * Changes the bullet type to selected bullet and auto closes modal
 * @param {Event} event the button event that corresponds to the bullet to change to
 */

export function changeBullet(event) {
  var bulletModal = document.querySelector('bullet-modal').shadowRoot;

  /** Get bullet type of current bullet */
  var bulletType = mostRecentBullet.parentNode.getAttribute('bullet-type');
  console.log('buttons');
  var bulletBtns = bulletModal.querySelectorAll('.bullet-btn');
  console.log(bulletBtns);
  var newBulletNode = null;
  console.log('event target');
  console.log(event.target.id);
  console.log('mostRecentBullet');
  console.log(mostRecentBullet.parentNode);
  console.log(mostRecentBullet.childNodes[0]);

  /** Turn buttons off */
  bulletBtns.forEach((button) => {
    button.setAttribute('state', 'off')
  });

  if (event.target.id == 'default-bullet-btn' && bulletType != 'default-bullet') {
    mostRecentBullet.parentNode.setAttribute('bullet-type', 'default-bullet');
    newBulletNode = document.createTextNode(DEFAULTBULLET);
  }
  if (event.target.id == 'important-bullet-btn' && bulletType != 'important-bullet') {
    mostRecentBullet.parentNode.setAttribute('bullet-type', 'important-bullet');
    newBulletNode = document.createTextNode(IMPORTANTBULLET);
  }
  if (event.target.id == 'checkbox-bullet-btn' && bulletType != 'checkbox-bullet') {
    console.log('checkbox parent');
    console.log(mostRecentBullet.parentNode);
    mostRecentBullet.parentNode.setAttribute('bullet-type', 'checkbox-bullet');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type','checkbox');
    newBulletNode = checkbox;
  }
  if (event.target.id == 'event-bullet-btn' && bulletType != 'event-bullet') {
    mostRecentBullet.parentNode.setAttribute('bullet-type', 'event-bullet');
    newBulletNode = document.createTextNode(EVENTBULLET);
  }
  if (newBulletNode != null) {
    mostRecentBullet.removeChild(mostRecentBullet.childNodes[0]);
    mostRecentBullet.appendChild(newBulletNode.cloneNode());
  }
  /** Highlight button on click */
  var currButton = event.target;
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
  var notesContainer = document.querySelector('daily-log').shadowRoot.getElementById('notes-container');

  /** List element structure: <span><span></span><input></input></span>
  * Span element holds bullet container and input area for note entry
  */
  var listElement = document.createElement('span');
  var bulletContainer = document.createElement('span');
  var noteEntry = document.createElement('textarea');

  /* Set attributes for styling */
  listElement.setAttribute('id', 'list-element');
  bulletContainer.setAttribute('id', 'bullet-container');
  noteEntry.setAttribute('id', 'note-entry');

  /* Add default bullet text node to entry */
  var defaultBullet =  document.createTextNode(DEFAULTBULLET);
  bulletContainer.appendChild(defaultBullet);

  /* Set 'bullet-type' attribute for this list element */
  listElement.setAttribute('bullet-type', 'default-bullet');

  /** Note entry textarea should default to one line and dynamically grow with input 
   * Note entry 'new' attribute should be set to true since it is a new entry
   */
  noteEntry.setAttribute('rows', '1');
  noteEntry.oninput = function() {auto_grow(this)};
  noteEntry.setAttribute('new','true');

  /* Append children to List Element */
  listElement.appendChild(bulletContainer);
  listElement.appendChild(noteEntry);

  /* Add event listeners */
  noteEntry.addEventListener('keyup', enterKeyPressed);
  noteEntry.addEventListener('keydown', deleteEntry);
  /* Prevent user from creating a newline with 'Enter' within note entry textarea */
  noteEntry.addEventListener('keydown', function(event){
    if(event.key === 'Enter') {
      event.preventDefault();
    }
  });

  /* Add longpress event listeners to List Element to launch bullet modal */
  bulletContainer.addEventListener("mousedown", start);
  bulletContainer.addEventListener("touchstart", start);
  bulletContainer.addEventListener("click", click);
  bulletContainer.addEventListener("mouseout", cancel);
  bulletContainer.addEventListener("touchend", cancel);
  bulletContainer.addEventListener("touchleave", cancel);
  bulletContainer.addEventListener("touchcancel", cancel);
  bulletContainer.oncontextmenu = (e) => {
    e.preventDefault();
  }
  
  /* Append list element to Notes section */
  notesContainer.appendChild(listElement);

  /* Automatically focus on new element's input area */
  noteEntry.focus();
}
