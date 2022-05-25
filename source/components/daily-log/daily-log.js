const CANCEL = 'Cancel';
const SAVE = 'Save';
const DATE = 'Date: ';
const TRACKERS = 'Trackers';
const NOTES = 'Notes';
const JOURNAL = 'Journal';
const JOURNAL_PLACEHOLDER = 'Click to start typing...';
// const NOTES_PLACEHOLDER = 'Type in a note ...';
const LOG_TITLE = 'New Daily Log';
const PIXELS = 'px';

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
        trackersTitle.textContent = TRACKERS;

        /* trackers button */
        // UPDATE: commented out bc no longer works :( so switched to img
        // const trackersBtn = document.createElement('button');
        // trackersBtn.innerHTML = `<svg id = "arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
        // <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75
        // 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/></svg>`;
        const trackersBtn = document.createElement('img');
        trackersBtn.setAttribute('src', './icons/arrow-icon.png');
        trackersBtn.setAttribute('class', 'arrow-btn');
        trackers.appendChild(trackersTitle);
        trackers.appendChild(trackersBtn);

        /* notes consist of title and input bullet text */
        const notesTitle = document.createElement('h3');
        const notesInput = document.createElement('ul');
        notesTitle.textContent = NOTES;
        notesInput.setAttribute('id', 'note-text');
        notes.appendChild(notesTitle);

        const journalTitle = document.createElement('h3');
        const journalInput = document.createElement('textarea');
        journalTitle.textContent = JOURNAL;
        journalInput.setAttribute('id', 'journal-text');
        journal.appendChild(journalTitle);
        journal.appendChild(journalInput);

        shadow.appendChild(dailyLogStyle);
        shadow.appendChild(wrapper);
        wrapper.appendChild(controlsContainer);
        wrapper.appendChild(heading);
        wrapper.appendChild(trackers);
        wrapper.appendChild(notes);
        wrapper.appendChild(journal);

        /* define functions */
        /**
         * @method auto_grow
         * Journal textarea (input) expands as user types and the
         * entire daily log also expands so users dont have to
         * scroll within the textarea (no scroll bar within it)
         * @param {Object} element journal input (textarea)
         */
        function autoGrow(element) {
            element.style.height = 'auto';
            wrapper.style.height = 'auto'; // expand too so no scroll bar
            element.style.height = (element.scrollHeight) + PIXELS;
        }

        /**
         * @method defaultFields
         * Set all text to use placeholders or generic text on
         * creation of a new daily log.
         */
        this.defaultFields = () => {
            // notesInput.textContent = NOTES_PLACEHOLDER;
            journalInput.setAttribute('placeholder', JOURNAL_PLACEHOLDER);
            console.log(journalInput.textContent);
            setDefaultDate();
        };

        /**
         * @method populateFields
         * Fills in daily log component with given data.
         * Helper function for control.
         * @param {String} titleOfLog likely "Daily Log"
         * @param {String} dateOfLog in form "{day of week}, {month} {date}, {year}"
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
            journalInput.textContent = journalOfLog;
        };

        /**
         * @method setDefaultDate
         * Helper function to fetch current date and format
         * to be "{day of week}, {month} {date}, {year}"
         */
        function setDefaultDate() {
            const date = new Date();
            const day = date.toLocaleDateString('en-US', { // english version of weekday
                weekday: 'long',
            });
            const month = date.toLocaleDateString('en-US', {
                month: 'long',
            });
            dateBtn.textContent = `${day}, ${month} ${date.getDate()}, ${date.getFullYear()}`;
        }

        /* call functions */
        this.defaultFields();
        journalInput.oninput = function () {
            autoGrow(this);
        };
    }
}

customElements.define('daily-log', DailyLog);

export default DailyLog;
