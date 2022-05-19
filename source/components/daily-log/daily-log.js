//import { fas } from '@fortawesome/free-solid-svg-icons'
const CANCEL = 'Cancel';
const SAVE = 'Save';
const DATE = 'Date: ';
const TRACKERS = 'Trackers';
const NOTES = 'Notes';
const JOURNAL = 'Journal';
const LOG_TITLE = 'New Daily Log';

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
        dateBtn.setAttribute('id', 'date-button');
        dateTitle.setAttribute('id', 'date-title');
        title.textContent = LOG_TITLE;
        dateTitle.textContent = DATE;
        heading.appendChild(title);
        heading.appendChild(dateContainer);
        dateContainer.appendChild(dateTitle);
        dateContainer.appendChild(dateBtn);

        /* trackers consists of title and button */
        trackers.setAttribute('id', 'tracker-container');
        const trackersTitle = document.createElement('h3');
        const trackersBtn = document.createElement('button');
        //const arrowIcon = document.createElement('svg');
       

        /* add attributes and text to trackers section */
        trackersTitle.textContent = TRACKERS;
        //trackersBtn.textContent = ">";
        trackersBtn.innerHTML = `<svg id = "arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
        <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75
        0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/></svg>`;
        //arrowIcon.setAttribute('class', 'fa-solid fa-angle-right');
        trackersBtn.setAttribute('class', 'arrow-btn');
        //trackersBtn.appendChild(arrowIcon);
        trackers.appendChild(trackersTitle);
        trackers.appendChild(trackersBtn);

        

        /* notes consist of title and input bullet text */
        const notesTitle = document.createElement('h3');
        const notesInput = document.createElement('input');
        notesTitle.textContent = NOTES;
        notesInput.textContent = 'Type in a note ...';
        notesInput.setAttribute('id', 'note-text');
        notes.appendChild(notesTitle);
        notes.appendChild(notesInput);

        const journalTitle = document.createElement('h3');
        const journalInput = document.createElement('textarea');
        journalTitle.textContent = JOURNAL;
        journalInput.setAttribute('id', 'journal-text');
        journalInput.setAttribute('placeholder', "Click to start typing...");
        journalInput.oninput = function() {auto_grow(this)};
        journal.appendChild(journalTitle);
        journal.appendChild(journalInput);
    

        shadow.appendChild(dailyLogStyle);
        shadow.appendChild(wrapper);
        wrapper.appendChild(controlsContainer);
        wrapper.appendChild(heading);
        wrapper.appendChild(trackers);
        wrapper.appendChild(notes);
        wrapper.appendChild(journal);

        function auto_grow(element) {
            element.style.height = 'auto';
            element.style.height = (element.scrollHeight)+"px";
        }

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
