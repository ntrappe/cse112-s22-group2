/**
 * @module add-component
 */

const DELETE_ALL = 'delete-all-modal';

import DailyLogPreview from '../daily-log-preview/daily-log-preview.js';
import DailyLog from '../daily-log/daily-log.js';
import {convertDate} from '../control/control-helpers.js';

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
data.forEach((dailyLog) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    const dailyLogPreview = new DailyLogPreview();
    dailyLogPreview.setAttribute('class', 'daily-log-preview');
    checkbox.setAttribute('type', 'checkbox');
    listItem.appendChild(checkbox);
    listItem.appendChild(dailyLogPreview);
    logList.appendChild(listItem);
    dailyLogPreview.populateFields(
        dailyLog.dateOfEntry,
        dailyLog.textEntry,
        dailyLog.didTrackers,
        dailyLog.didNotes,
        dailyLog.didJournal,
    );
});

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
            console.log('repopulate');
            data.forEach((dailyLog) => {
                const listItem = document.createElement('li');
                const checkbox = document.createElement('input');
                const dailyLogPreview = new DailyLogPreview();
                dailyLogPreview.setAttribute('class', 'daily-log-preview');
                checkbox.setAttribute('type', 'checkbox');
                listItem.appendChild(checkbox);
                listItem.appendChild(dailyLogPreview);
                logList.appendChild(listItem);
                dailyLogPreview.populateFields(
                    dailyLog.dateOfEntry,
                    dailyLog.textEntry,
                    dailyLog.didTrackers,
                    dailyLog.didNotes,
                    dailyLog.didJournal,
                );
            });
        });

        dailyLog.addEventListener('saveLog', () => {
            main.removeChild(dailyLog);
            editBtn.disabled = false;
            createNewLog = false;
            const listItem = document.createElement('li');
            const checkbox = document.createElement('input');
            const dailyLogPreview = new DailyLogPreview();
            dailyLogPreview.setAttribute('class', 'daily-log-preview');
            checkbox.setAttribute('type', 'checkbox');
            listItem.appendChild(checkbox);
            listItem.appendChild(dailyLogPreview);
            logList.appendChild(listItem);
            dailyLogPreview.populateFields(
                convertDate(dailyLog.getDate()),
                dailyLog.getJournal(),
                false,
                false,
                true,
            );
            data.forEach((dailyLog) => {
                const listItem = document.createElement('li');
                const checkbox = document.createElement('input');
                const dailyLogPreview = new DailyLogPreview();
                dailyLogPreview.setAttribute('class', 'daily-log-preview');
                checkbox.setAttribute('type', 'checkbox');
                listItem.appendChild(checkbox);
                listItem.appendChild(dailyLogPreview);
                logList.appendChild(listItem);
                dailyLogPreview.populateFields(
                    dailyLog.dateOfEntry,
                    dailyLog.textEntry,
                    dailyLog.didTrackers,
                    dailyLog.didNotes,
                    dailyLog.didJournal,
                );
            });
        });

    }
});

function removeAllLogs() {
    while (logList.lastElementChild) {
        logList.removeChild(logList.lastElementChild);
    }
}



// function onload() {

// }