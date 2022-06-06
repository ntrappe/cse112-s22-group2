import { currentEntries, auto_grow } from "../components/daily-log/daily-log.js";
import { cancel, click, start } from "./long-press.js";
import { DEFAULTBULLET, IMPORTANTBULLET, EVENTBULLET } from "../components/icons.js";
var mostRecentBullet = null;
window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  //console.log(this.shadowRoot.getElementById('note-entry'));
  console.log(document.querySelector('daily-log').shadowRoot.getElementById('note-entry'));
  console.log(currentEntries);
});


function enterKeyPressed(event) {
  //check if list is the only one in the unordered list
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

function deleteEntry(event) {
  var nextListElement= this.parentNode.nextElementSibling;
  var prevListElement = this.parentNode.previousElementSibling;
  //console.log(prevNoteEntry);
  if (!this.value && event.key === "Backspace") {
    console.log('prevlistelementID');
    console.log(prevListElement.id);
    //console.log('nextlistelementID');
    //console.log(nextListElement.id);
    console.log(currentEntries.size);
    var entryToDelete = this;
    currentEntries.delete(entryToDelete);
    this.parentNode.remove();
    console.log(currentEntries.size);
    //if it is the last entry in the list, and there is an entry above it, autofocus to line above on delete
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

function updateCurrentEntry(noteEntry) {
  currentEntries.set(noteEntry, noteEntry.value);
} 

export function notesClick(event) {
  console.log(event.target)
  var notesPlaceholder = document.querySelector('daily-log').shadowRoot.getElementById('notes-placeholder');
  if (currentEntries.size == 0) {
    //document.querySelector('daily-log').shadowRoot.getElementById('notes-container').setAttribute('empty', 'true');
    notesPlaceholder.style.display = 'none';
    createListElement();
  }
}

export function launchBulletModal(currentBullet) {
    /* update most recent bullet entry */
    mostRecentBullet = currentBullet;
    //console.log('hello');
    console.log('mostRecentBullet = current target');
    console.log(currentBullet);
    console.log(mostRecentBullet);
    console.log('current bullet child', currentBullet.childNodes[0])
    /* Get bullet modal and display bullet and entry from shadow DOM */
    var bulletModal = document.querySelector('bullet-modal').shadowRoot;
    var displayBullet = document.querySelector('bullet-modal').shadowRoot.getElementById('display-bullet');
    var displayText = document.querySelector('bullet-modal').shadowRoot.getElementById('display-text');
   
    var bulletType = currentBullet.parentNode.getAttribute('bullet-type');
    var entryText = currentBullet.nextSibling.value;

    /** If entry text is longer than 25 chars, only display the first 25 chars followed
     *  by ellipses
     */
    if (entryText.length > 25) {
      entryText = entryText.substring(0,25) + ' ...';
    }
   
  
    console.log(bulletType);
    /* Get text of current entry (currentBullet.nextSibling = textarea)*/
    //var entryText = currentBullet.nextSibling.value;
    //var entryText = currentBullet.nextSibling.value;
    /* Remove old display bullet and set display entry to selected bullet and text */
    console.log('displayBulletChildren');
    if (displayBullet.hasChildNodes() == true) {
      console.log('hello');
      displayBullet.removeChild(displayBullet.childNodes[0]);
    };
    displayBullet.appendChild(currentBullet.childNodes[0].cloneNode());
    displayText.innerHTML = entryText;


    bulletModal.getElementById('wrapper').style.display = 'block';
    if (bulletType == 'default-bullet') {
      // bulletModal.getElementById('default-bullet-btn').style.background = 'blue';
      bulletModal.getElementById('default-bullet-btn').setAttribute('state', 'on');
      //console.log('hello');
    }
    
    if (bulletType == 'important-bullet') {
      bulletModal.getElementById('important-bullet-btn').setAttribute('state', 'on');
      //bulletModal.getElementById('important-bullet-btn').focus();
      // bulletModal.getElementById('important-bullet-btn').style.background = 'blue';
    }
    if (bulletType == 'checkbox-bullet') {
      bulletModal.getElementById('checkbox-bullet-btn').setAttribute('state', 'on');
      //bulletModal.getElementById('checkbox-bullet-btn').focus();
      // bulletModal.getElementById('checkbox-bullet-btn').style.background = 'blue';
    }
    if (bulletType == 'event-bullet') {
      bulletModal.getElementById('event-bullet-btn').setAttribute('state', 'on');
      // bulletModal.getElementById('event-bullet-btn').style.background = 'blue';
      //bulletModal.getElementById('event-bullet-btn').focus();
    }
}

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
  //event.target.style.color = 'blue';
  //get rid of blue
  bulletBtns.forEach((button) => {
    button.setAttribute('state', 'off')
  });

  if (event.target.id == 'default-bullet-btn' && bulletType != 'default-bullet') {
    mostRecentBullet.parentNode.setAttribute('bullet-type', 'default-bullet');
    //console.log(mostRecentBullet);
    newBulletNode = document.createTextNode(DEFAULTBULLET);
  }
  if (event.target.id == 'important-bullet-btn' && bulletType != 'important-bullet') {
    mostRecentBullet.parentNode.setAttribute('bullet-type', 'important-bullet');
    //console.log(mostRecentBullet);
    newBulletNode = document.createTextNode(IMPORTANTBULLET);
  }
  if (event.target.id == 'checkbox-bullet-btn' && bulletType != 'checkbox-bullet') {
    console.log('checkbox parent');
    console.log(mostRecentBullet.parentNode);
    mostRecentBullet.parentNode.setAttribute('bullet-type', 'checkbox-bullet');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type','checkbox');
    newBulletNode = checkbox;
    //console.log(mostRecentBullet);
  }
  if (event.target.id == 'event-bullet-btn' && bulletType != 'event-bullet') {
    mostRecentBullet.parentNode.setAttribute('bullet-type', 'event-bullet');
    newBulletNode = document.createTextNode(EVENTBULLET);
    //console.log(mostRecentBullet);
  }
  if (newBulletNode != null) {
    mostRecentBullet.removeChild(mostRecentBullet.childNodes[0]);
    mostRecentBullet.appendChild(newBulletNode.cloneNode());
  }
  //event.target.style.background = 'blue';
  var currButton = event.target;
  currButton.setAttribute('state', 'on');
  console.log(event.target.style.background);
  setTimeout(() => {
    currButton.setAttribute('state', 'off');
    bulletModal.getElementById('wrapper').style.display = 'none';
  }, 200, currButton);

  //bulletModal.getElementById('wrapper').style.display = 'none';
  console.log(mostRecentBullet.childNodes[0]);
  //console.log(mostRecentBullet);
}

/**
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
  //listElement.addEventListener('click', launchBulletModal);
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
    //console.log(e.currentTarget);
    //console.log(e.target.id);
    //console.log(e.target.id);
    e.preventDefault();
  }
  

  /* Append list element to Notes section */
  notesContainer.appendChild(listElement);

  /* Automatically focus on new element's input area */
  noteEntry.focus();

}
