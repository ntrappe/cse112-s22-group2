/**
 * @module add-component
 */

const DELETE_ALL = 'delete-all-modal';
const EXIT_SUCCESS = 1;
const EXIT_FAILURE = 0;

import DailyLogPreview from '../daily-log-preview/daily-log-preview.js';
import DailyLog from '../daily-log/daily-log.js';
import { convertDate } from '../control/control-helpers.js';
import { addLog, fetchAll } from '../../backend/storage.js';

/* Sample code of how to render a custom component */
const data = [
    {
        dateOfEntry: '04/17/2022',
        textEntry:
            'We are no strangers to love. You know the rules, and so do I.'
            + 'A full commitment\'s what I\'m thinking of, you wouldn\'t get '
            + 'this from any other guy',
        didTrackers: false,
        didNotes: true,
        didJournal: false,
    },
    {
        dateOfEntry: '04/30/2022',
        textEntry: '',
        didTrackers: true,
        didNotes: true,
        didJournal: false,
    },
    {
        dateOfEntry: '05/19/2022',
        textEntry: 'Never gonna give you up, never gonna let you down',
        didTrackers: true,
        didNotes: true,
        didJournal: true,
    },
];
 
/* grab the point on the HTML page to add component to */
const main = document.getElementById('main');
const logList = document.getElementById('log-list');
const newLogBtn = document.getElementById('new-note-btn');
const editBtn = document.getElementById('edit-btn');

/* global states */
let createNewLog = false;

/* Use a loop to dynamically render the components */
// data.forEach((dailyLog) => {
//     const listItem = document.createElement('li');
//     const checkbox = document.createElement('input');
//     const dailyLogPreview = new DailyLogPreview();
//     dailyLogPreview.setAttribute('class', 'daily-log-preview');
//     checkbox.setAttribute('type', 'checkbox');
//     listItem.appendChild(checkbox);
//     listItem.appendChild(dailyLogPreview);
//     logList.appendChild(listItem);
//     dailyLogPreview.populateFields(
//         dailyLog.dateOfEntry,
//         dailyLog.textEntry,
//         dailyLog.didTrackers,
//         dailyLog.didNotes,
//         dailyLog.didJournal,
//     );
// });

/* Inbox Event Functions */
/**
 * If user clicked delete all and confimed, then remove each log
 * from page and delete all from storage. If user clicked delete
 * selected and confirmed, remove each selected (via queryselect)
 * and delete from storage.
 */
document.addEventListener('deleteConfirm', (event) => {
    if (event.detail.modalType() === DELETE_ALL) {
        // if delete all, call function in backend and remove each log
        // from page 
        removeAllLogs();
    } else {
        // if delete selected, query select each checked, remove it from
        // page and ask backend to remove that log
        const dailyLogs = logList.querySelectorAll('#log-list>li');
        dailyLogs.forEach((log) => {
            const checkbox = log.children[0];
            const preview = log.children[1];

            if (checkbox.checked) {
                logList.removeChild(log);
            }
        });
    }
});

newLogBtn.addEventListener('click', () => {
    if (!createNewLog) {
        editBtn.disabled = true;        // do not let users mess outside of log
        removeAllLogs();                // clear out main
        const dailyLog = new DailyLog();    // create new daily log
        main.appendChild(dailyLog);
        createNewLog = true;

        dailyLog.addEventListener('cancelLog', () => {
            main.removeChild(dailyLog);
            editBtn.disabled = false;
            createNewLog = false;
            populateInbox();
        });

        dailyLog.addEventListener('saveLog', () => {
            main.removeChild(dailyLog);
            editBtn.disabled = false;
            createNewLog = false;
            
            addLog(dailyLog.getDate(), [], dailyLog.getJournal());
            populateInbox();
        });

    }
});

/**
 * Removes logs from the screen (NOT local storage)
 */
function removeAllLogs() {
    while (logList.lastElementChild) {
        logList.removeChild(logList.lastElementChild);
    }
}

/**
 * Uses local storage to fetch contents of each log
 * then populates inbox.html with each log preview
 * @returns success or failure (if nothing to add)
 */
function populateInbox() {
    const allStoredLogs = fetchAll();
    
    if (allStoredLogs.length === 0) {
        console.log('No stored logs in local storage');
        return EXIT_FAILURE;
    }

    allStoredLogs.forEach((dailyLog) => {
        const dailyLogPreview = createDailyLogPreview();

        dailyLogPreview.populateFields(
            convertDate(dailyLog.date),
            dailyLog.journal,
            false,
            false,
            (dailyLog.journal.length == 0) ? false : true,
        );
    });

    return EXIT_SUCCESS;
}

/**
 * Does all the HTML dirty work in setting up a preview
 * to be displayed on inbox.html (along w/ checkbox)
 * @returns <daily-log-preview>
 */
function createDailyLogPreview() {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    const dailyLogPreview = new DailyLogPreview();
    dailyLogPreview.setAttribute('class', 'daily-log-preview');
    checkbox.setAttribute('type', 'checkbox');
    listItem.appendChild(checkbox);
    listItem.appendChild(dailyLogPreview);
    logList.appendChild(listItem);

    return dailyLogPreview;
}

localStorage.clear();
addLog('Thursday, May 26, 2022', [], 'fuck this');
addLog('Wednesday, May 25, 2022', [], 'muahahahhahahahahha');
populateInbox();

// function onload() {

// }