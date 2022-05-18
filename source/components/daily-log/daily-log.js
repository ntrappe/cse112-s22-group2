const CANCEL = 'Cancel';
const SAVE = 'Save';
const DATE = 'Date: ';
const NOTES = 'Notes';
const TRACKERS = 'Trackers';
const JOURNAL = 'Journal';
const LOG_TITLE = 'New Daily Log';

class DailyLog extends HTMLElement {
    constructor() {
        super();

        /* shadow DOM base */
        const shadow = this.attachShadow({ mode: 'open' });

        /* wrap all the content in one */
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');

        /* attach styles */
        const dailyLogStyle = document.createElement('link');
        dailyLogStyle.setAttribute('rel', 'stylesheet');
        dailyLogStyle.setAttribute('href', './styles/daily-log.css');

        /* top of log has controls (buttons) to cancel or save log */
        const controlsContainer = document.createElement('div');
        const cancelBtn = document.createElement('button');
        const saveBtn = document.createElement('button');

        /* add attributes and text to control buttons */
        controlsContainer.setAttribute('class', 'control-container');
        cancelBtn.setAttribute('class', 'control-btn');
        cancelBtn.setAttribute('priority', 'high');
        saveBtn.setAttribute('class', 'control-btn');
        cancelBtn.textContent = CANCEL;
        saveBtn.textContent = SAVE;
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
        dateContainer.setAttribute('id', 'date-container');
        dateTitle.setAttribute('id', 'date-title');
        dateBtn.setAttribute('id', 'date-button');
        title.textContent = LOG_TITLE;
        dateTitle.textContent = DATE;
        heading.appendChild(title);
        heading.appendChild(dateContainer);
        dateContainer.appendChild(dateTitle);
        dateContainer.appendChild(dateBtn);

        /* trackers consists of title and button */
        const trackerTitle = document.createElement('h3');
        const trackerBtn = document.createElement('button');
        trackerTitle.textContent = TRACKERS;
        trackerBtn.textContent = '>';
        trackers.setAttribute('id', 'tracker-container');
        trackerTitle.setAttribute('id', 'tracker-title');
        trackerBtn.setAttribute('class', 'arrow-button');
        trackers.appendChild(trackerTitle);
        trackers.appendChild(trackerBtn);

        /* notes consist of title and input bullet text */
        const notesTitle = document.createElement('h3');
        const notesInput = document.createElement('input');
        notesTitle.textContent = NOTES;
        notes.appendChild(notesTitle);

        const journalTitle = document.createElement('h3');
        const journalInput = document.createElement('input');
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

        /* set the date to default to today */
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

        setDefaultDate();
    }
}

customElements.define('daily-log', DailyLog);

export default DailyLog;
