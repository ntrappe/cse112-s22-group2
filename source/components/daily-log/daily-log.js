import { notesClick, populateListElement } from './notes-script.js';
import { ARROWICON } from './bullet-helper.js';
import { setDefaultDate } from '../control/control-helpers.js';

const CANCEL = 'Cancel';
const SAVE = 'Save';
const DATE = 'Date: ';
const TRACKERS = 'Trackers';
const NOTES = 'Notes';
const JOURNAL = 'Journal';
const LOG_TITLE = 'New Daily Log';
const JOURNAL_PLACEHOLDER = 'Click to start typing...';
export const PIXELS = 'px';

/**
 * dictionary to keep track of current note entries
 * currentEntries[entry] = entry.value
 * 'Let' so can be updated globally
 */
// export var currentEntries = new Map();

/**
 * @module DailyLogPreview
 * Class that renders a full daily log
 * @extends HTMLElement
 *
 * @example
 * <daily-log></daily-log>
 */
class DailyLog extends HTMLElement {
    constructor() {
        super();

        /* shadow DOM base */
        const shadow = this.attachShadow({ mode: 'open' });

        /* wrap all the content in one */
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', 'wrapper');
        wrapper.style.height = 'auto'; // auto expand wrapper so no scroll

        const dailyLogStyle = document.createElement('link');
        dailyLogStyle.setAttribute('rel', 'stylesheet');
        dailyLogStyle.setAttribute('href', './styles/daily-log.css');

        /* top of log has controls (buttons) to cancel or save log */
        const controlsContainer = document.createElement('div');
        const cancelBtn = document.createElement('button');
        const saveBtn = document.createElement('button');

        /* add attributes and text to control buttons */
        cancelBtn.textContent = CANCEL;
        saveBtn.textContent = SAVE;
        controlsContainer.setAttribute('class', 'control-container');
        cancelBtn.setAttribute('class', 'control-btn');
        cancelBtn.setAttribute('priority', 'high');
        saveBtn.setAttribute('class', 'control-btn');
        controlsContainer.appendChild(cancelBtn);
        controlsContainer.appendChild(saveBtn);

        /* create the 4 main sections of the daily log */
        const heading = document.createElement('section');
        const trackers = document.createElement('section');
        const notes = document.createElement('section');
        const journal = document.createElement('section');

        /* heading consists of log name and date */
        const title = document.createElement('h2');
        const dateContainer = document.createElement('div');
        const dateTitle = document.createElement('h3');
        const dateBtn = document.createElement('button');

        /* add attributes and text to heading */
        title.textContent = LOG_TITLE;
        dateTitle.textContent = DATE;
        dateContainer.setAttribute('id', 'date-container');
        dateBtn.setAttribute('id', 'date-button');
        dateTitle.setAttribute('id', 'date-title');
        heading.appendChild(title);
        heading.appendChild(dateContainer);
        dateContainer.appendChild(dateTitle);
        dateContainer.appendChild(dateBtn);

        /* trackers consists of title and button */
        trackers.setAttribute('id', 'tracker-container');
        const trackersTitle = document.createElement('h3');
        const trackersBtn = document.createElement('button');

        /* add attributes and text to trackers section */
        trackersTitle.textContent = TRACKERS;
        trackersBtn.innerHTML = ARROWICON;
        trackersBtn.setAttribute('class', 'arrow-btn');
        trackers.appendChild(trackersTitle);
        trackers.appendChild(trackersBtn);

        /* notes consist of title and placeholder */
        notes.setAttribute('id', 'notes-container');
        const notesTitle = document.createElement('h3');
        const notesPlaceholder = document.createElement('p');
        notesPlaceholder.textContent = 'Click to add a note...';
        notesPlaceholder.setAttribute('id', 'notes-placeholder');
        notesTitle.textContent = NOTES;
        notes.appendChild(notesTitle);
        notes.appendChild(notesPlaceholder);

        /* When user clicks placeholder, it should create a new bullet */
        notesPlaceholder.addEventListener('click', notesClick);

        /* journal consists of placeholder and input area */
        journal.setAttribute('id', 'journal-container');
        const journalTitle = document.createElement('h3');
        const journalInput = document.createElement('textarea');
        journalTitle.textContent = JOURNAL;
        journalInput.setAttribute('id', 'journal-text');
        journalInput.setAttribute('placeholder', JOURNAL_PLACEHOLDER);
        journal.appendChild(journalTitle);
        journal.appendChild(journalInput);

        /* on input, journal text area should dynamically grow */
        journalInput.oninput = function () { autoGrow(this); };

        /* Append elements to wrapper and wrapper and style to shadow DOM */
        shadow.appendChild(dailyLogStyle);
        shadow.appendChild(wrapper);
        wrapper.appendChild(controlsContainer);
        wrapper.appendChild(heading);
        wrapper.appendChild(trackers);
        wrapper.appendChild(notes);
        wrapper.appendChild(journal);

        /* Setter functions */
        /**
         * @method defaultFields
         * Set all text to use placeholders or generic text on
         * creation of a new daily log.
         */
        this.defaultFields = () => {
            // notesInput.textContent = NOTES_PLACEHOLDER;
            journalInput.setAttribute('placeholder', JOURNAL_PLACEHOLDER);
            console.log(journalInput.textContent);
            dateBtn.textContent = setDefaultDate();
        };

        /**
         * @method populateFields
         * Fills in daily log component with given data.
         * Helper function for control.
         * @param {String} titleOfLog likely 'Daily Log'
         * @param {String} dateOfLog in form '{day of week}, {month} {date}, {year}'
         * @param {Object} notesOfLog in form [String, ... String]
         * @param {String} journalOfLog
         */
        this.populateFields = (
            titleOfLog,
            dateOfLog,
            notesOfLog,
            journalOfLog,
        ) => {
            title.textContent = titleOfLog;
            dateBtn.textContent = dateOfLog;
            // ignore notesOfLog for now because not set up
            if (notesOfLog === null) {
                console.log('NOT populating notes bc null');
            } else {
                /**
                 * Iterate through each item in the notes array which is an
                 * object with the bullet style + notes content + call
                 * helper function to create a bullet + add to notes
                 */
                for (let i = 0; i < notesOfLog.length; i++) {
                    const savedNote = JSON.parse(notesOfLog[i]);
                    populateListElement(savedNote.bulletStyle, savedNote.noteContent);
                }
            }
            journalInput.textContent = journalOfLog;
        };

        /* Getter functions */
        this.getDate = () => dateBtn.textContent;
        this.getJournal = () => journalInput.value;
        this.getNotes = () => {
            const bulletList = notes.childNodes; // list of notes
            const notesArr = []; // will hold content of each note
            let j = 0;

            /**
             * If children of the list is 2 that represents the placeholder + title
             * so no notes were recorded. If more than that, iterate through each
             * bullet continer object to grab content + bullet style + save in array.
             */
            if (bulletList.length > 2) {
                for (let i = 2; i < bulletList.length; i++) {
                    const bulletType = bulletList[i]; // container for bullet and text
                    const noteEntry = bulletType.childNodes[1]; // kids are (0) bullet & (1) entry
                    const saveNote = { // note object to store in arr
                        bulletStyle: bulletType.getAttribute('bullet-type'),
                        noteContent: noteEntry.value,
                    };
                    notesArr[j++] = JSON.stringify(saveNote);
                }
                return notesArr;
            } else {
                console.log('no bullet points, just placeholder');
                return null;
            }
        };

        /* Events */
        const cancelLogEvent = new CustomEvent('cancelLog', {
            bubbles: true, // event listenable outside of container
            composed: true,
        });

        const saveLogEvent = new CustomEvent('saveLog', {
            bubbles: true, // event listenable outside of container
            composed: true,
        });

        cancelBtn.onclick = () => {
            shadow.dispatchEvent(cancelLogEvent);
        };

        saveBtn.onclick = () => {
            shadow.dispatchEvent(saveLogEvent);
        };

        /* call functions */
        this.defaultFields();
        journalInput.oninput = function () {
            autoGrow(this);
        };
    }
}

/**
 * @method autoGrow
 * Journal textarea (input) expands as user types and the
 * entire daily log also expands so users dont have to
 * scroll within the textarea (no scroll bar within it)
 * @param {Object} element journal input (textarea)
 */
export function autoGrow(element) {
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + PIXELS;
    if (element.id == 'journal-text') {
        element.scrollIntoView();
    }
}

customElements.define('daily-log', DailyLog);
export default DailyLog;
