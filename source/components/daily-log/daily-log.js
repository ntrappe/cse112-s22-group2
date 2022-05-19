const CANCEL = 'Cancel';
const SAVE = 'Save';
const DATE = 'Date: ';
const NOTES = 'Notes';
const TRACKERS = 'Trackers';
const JOURNAL = 'Journal';
const LOG_TITLE = 'New Daily Log';
const ENTER = 'Enter';

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

        /* CONTROL: top of log has buttons to cancel or save log */
        const controlsContainer = document.createElement('div');
        const cancelBtn = document.createElement('button');
        const saveBtn = document.createElement('button');

        /* CONTROL: add attributes and text to control buttons */
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

        /* SECTION 1: heading consists of log name and date */
        const title = document.createElement('h2');
        const dateContainer = document.createElement('div');
        const dateTitle = document.createElement('h3');
        const dateBtn = document.createElement('button');
        
        /* SECTION 1: add attributes and text to heading */
        dateContainer.setAttribute('id', 'date-container');
        dateTitle.setAttribute('id', 'date-title');
        dateBtn.setAttribute('id', 'date-button');
        title.textContent = LOG_TITLE;
        dateTitle.textContent = DATE;
        heading.appendChild(title);
        heading.appendChild(dateContainer);
        dateContainer.appendChild(dateTitle);
        dateContainer.appendChild(dateBtn);

        /* SECTION 2: trackers consists of title and button */  
        const trackerTitle = document.createElement('h3');
        const trackerBtn = document.createElement('button');
        const trackerIcon = document.createElement('img');

        /* SECTION 2: add attributes and text to heading */
        trackerTitle.textContent = TRACKERS;
        trackerIcon.setAttribute('src', './icons/arrow-icon.png');
        trackerBtn.setAttribute ('id', 'tracker-button');
        trackers.setAttribute('id', 'tracker-container');
        trackerTitle.setAttribute('id', 'tracker-title');
        trackerBtn.setAttribute('class', 'arrow-button');
        trackerBtn.appendChild(trackerIcon);
        trackers.appendChild(trackerTitle);
        trackers.appendChild(trackerBtn);

        /* SECTION 3: notes consist of title and input bullet text */
        const notesTitle = document.createElement('h3');
        const notesList = document.createElement('ul');
        notesTitle.textContent = NOTES;
        notes.setAttribute ('id', 'notes-container');
        notes.appendChild(notesTitle);
        notes.appendChild (notesList);

        /* SECTION 4: journal */
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

        /**
         * 'global' of whether user clicked inside notes 
         * true when user has clicked and would be actively editing
         * false if user clicks outside notes to stop editing
         */
        let activeEdit = false;

        /**
         * Sets date button to be today's data
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

        /**
         * Creates a new bullet (<li>), appends to the list (<ul>),
         * and sets bullet as focus so user is already in new bullet
         */
        function createBullet() {
            console.log('create new bullet');
            const bullet = document.createElement('li');
            bullet.setAttribute('contenteditable', 'true');
            bullet.setAttribute('class', 'bullet');
            notesList.appendChild(bullet);
            bullet.focus();
        }

        document.addEventListener('keydown', (e) => {
            if (activeEdit && (e.code == ENTER)) {
                createBullet();
            }
        });

        document.addEventListener('mousedown', (e) => {
            if (e.composedPath().includes(notes)) {
                console.log('in notes section');
                if (!activeEdit) {
                    console.log ('create 1st');
                    createBullet();
                    activeEdit = true;
                }
            } else {
                activeEdit = false;
                console.log('outside of notes section');
            }
        });

        setDefaultDate();
    }
}

customElements.define('daily-log', DailyLog);

export default DailyLog;
