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
    //if it is the last item in list and there is
    console.log(currentEntries.size);
    var entryToDelete = this;
    currentEntries.delete(entryToDelete);
    this.parentNode.remove();
    console.log(currentEntries.size);
    //if it is the last entry in the list, and there is an entry above it, autofocus to line above on delete
    if (nextListElement == null && prevListElement != null && currentEntries.size != 0) {
      //focus on text area
      console.log(prevListElement.childNodes[1]);
      prevListElement.childNodes[1].focus();
    } else {
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
    console.log('mostRecentBullet');
    console.log(mostRecentBullet);
    /* Get bullet modal and display bullet and entry from shadow DOM */
    var bulletModal = document.querySelector('bullet-modal').shadowRoot;
    var displayBullet = document.querySelector('bullet-modal').shadowRoot.getElementById('display-bullet');
    var displayText = document.querySelector('bullet-modal').shadowRoot.getElementById('display-text');
    //console.log(JSON.stringify(currentBullet));
    console.log('mostRecentBulletParent');
    console.log(mostRecentBullet.parentNode);
    /* Get current bullet type */
    //if (mostRecentBullet.)
    var bulletType = currentBullet.parentNode.getAttribute('bullet-type');
    console.log(bulletType);
    /* Get text of current entry (currentBullet.nextSibling = textarea)*/
    if (bulletType != 'checkbox-bullet') {
      var entryText = currentBullet.nextSibling.value;
    }
    //var entryText = currentBullet.nextSibling.value;
    /* Remove old display bullet and set display entry to selected bullet and text */
    //console.log(displayBullet);
    if (displayBullet.hasChildNodes() === 'True') {
      displayBullet.removeChild(displayBullet.childNodes[0]);
    };
    displayBullet.appendChild(currentBullet.cloneNode());
    displayText.innerHTML = entryText;
    //console.log(displayText);
    //mostRecentBullet = bullet;
    //console.log(currentBullet);
    //console.log(mostRecentBullet);
    // var selectedEntry = this;
    // var entryText = this.firstChild.value;
    //set value of list element
    //bulletModal.getElementById('bullet-entry').replaceWith(selectedEntry.value);
    //currentBullet = selectedEntry;
    //console.log(selectedEntry);
  // console.log(val);
    //currentBullet.innerHTML = selectedEntry;
    //bulletModal.getElementById('selected-entry').textContent = 'x' + entryText;
    bulletModal.getElementById('wrapper').style.display = 'block';
    if (bulletType == 'default-bullet') {
      bulletModal.getElementById('default-bullet-btn').focus();
      //console.log('hello');
    }
    if (bulletType == 'important-bullet') {
      bulletModal.getElementById('important-bullet-btn').focus();
    }
    if (bulletType == 'checkbox-bullet') {
      bulletModal.getElementById('checkbox-bullet-btn').focus();
    }
    if (bulletType == 'event-bullet') {
      bulletModal.getElementById('event-bullet-btn').focus();
    }
}

export function changeBullet(event) {
  var bulletModal = document.querySelector('bullet-modal').shadowRoot;
  var newBulletNode = null;
  console.log(mostRecentBullet.parentNode);
  console.log(mostRecentBullet.childNodes[0]);
  if (event.target.id == 'default-bullet-btn') {
    mostRecentBullet.parentNode.setAttribute('bullet-type', 'default-bullet');
    //console.log(mostRecentBullet);
    newBulletNode = document.createTextNode(DEFAULTBULLET);
  }
  if (event.target.id == 'important-bullet-btn') {
    mostRecentBullet.parentNode.setAttribute('bullet-type', 'important-bullet');
    //console.log(mostRecentBullet);
    newBulletNode = document.createTextNode(IMPORTANTBULLET);
  }
  if (event.target.id == 'checkbox-bullet-btn') {
    console.log('checkbox parent');
    console.log(mostRecentBullet.parentNode);
    mostRecentBullet.parentNode.setAttribute('bullet-type', 'checkbox-bullet');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type','checkbox');
    newBulletNode = checkbox;
    //console.log(mostRecentBullet);
  }
  if (event.target.id == 'event-bullet-btn') {
    mostRecentBullet.parentNode.setAttribute('bullet-type', 'event-bullet');
    newBulletNode = document.createTextNode(EVENTBULLET);
    //console.log(mostRecentBullet);
  }
  console.log(mostRecentBullet.childNodes[0]);
  mostRecentBullet.removeChild(mostRecentBullet.childNodes[0]);
  mostRecentBullet.appendChild(newBulletNode);
  setTimeout(() => {
    bulletModal.getElementById('wrapper').style.display = 'none';
  }, 180);
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
