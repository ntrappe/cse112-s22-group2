/**
 * @module add-component
 */

import DailyLogPreview from '../daily-log-preview/daily-log-preview.js';
import DailyLog from '../daily-log/daily-log.js';
import { convertPreviewDate, setDefaultDate } from './control-helpers.js';
import { addLog, deleteLog, deleteAll,
    fetchAll, fetchLog, updateLog } from '../../backend/storage.js';

const DELETE_ALL = 'delete-all-modal';
const EXIT_SUCCESS = 1;
const EXIT_FAILURE = 0;

/* grab the point on the HTML page to add component to */
const main = document.getElementById('main');
const logList = document.getElementById('log-list');
const newLogBtn = document.getElementById('new-note-btn');
const editBtn = document.getElementById('edit-btn');
const logCount = document.getElementById('log-count-display');

/* global states */
let createNewLog = false;
let activeEditing = false;

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
        deleteAll();
    } else {
        // if delete selected, query select each checked, remove it from
        // page and ask backend to remove that log
        const dailyLogs = logList.querySelectorAll('#log-list>li');
        dailyLogs.forEach((log) => {
            const checkbox = log.children[0];
            const preview = log.children[1];

            if (checkbox.checked) {
                logList.removeChild(log);
                console.log(preview);
                console.log(`preview get date: [${preview.getDate()}]`);
                deleteLog(preview.getDate());
            }
        });
    }
    updateLogCount();
});

/**
 * If user clicks new log button, then we will remove all previews
 * from page and just show the full daily log. We first check to
 * see if a log for today was created (if so, open that log) otherwise,
 * creates a new default log.
 */
newLogBtn.addEventListener('click', () => {
    const today = convertPreviewDate(setDefaultDate());
    const todayLog = fetchLog(today);

    if (todayLog !== EXIT_FAILURE) { // we found a log
        openFullLog(today);
    } else { // no log for today
        // editBtn.disabled = true; // do not let users mess outside of log
        removeAllLogs(); // clear out main
        const dailyLog = new DailyLog(); // create new daily log
        main.appendChild(dailyLog);

        dailyLog.addEventListener('cancelLog', () => {
            console.log('CANCEL');
            main.removeChild(dailyLog); // remove full log
            // editBtn.disabled = false; // allow edit
            populateInbox(); // add previews back
        });

        dailyLog.addEventListener('saveLog', () => {
            console.log('SAVE');
            main.removeChild(dailyLog); // remove full log
            // editBtn.disabled = false; // allow edit
            addLog(dailyLog.getDate(), dailyLog.getNotes(), dailyLog.getJournal());
            populateInbox(); // add previews back
        });
    }
});

editBtn.addEventListener('activeEdit', () => {
    // if user clicks edit button, now in edit mode
    activeEditing = true;
    console.log('USER CLICKED EDIT');
});

editBtn.addEventListener('deactiveEdit', () => {
    // if user clicks cancel button, now NOT in edit mode
    activeEditing = false;
    console.log('USER CLICKED CANCEL');
});

document.addEventListener('openLog', (event) => {
    // if user is editing, do NOT open the full daily log
    if (!activeEditing) {
        createNewLog = false; // log should say 'daily log'
        openFullLog(event.detail.date());
    }
});

/**
 * Give user status of system. When page fully loads (not just
 * html) but also styles (aka using load vs DOMContentLoaded)
 * then change status to 'updated'.
 */
window.addEventListener('load', () => {
    const inboxStatus = document.getElementById('inbox-status');
    inboxStatus.textContent = 'Updated Just Now';
});

/* Control functions on frontend */
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
    const allStoredLogs = fetchAll(); // get all items in loc storage

    if (allStoredLogs.length === 0) {
        console.log('No stored logs in local storage');
        return EXIT_FAILURE;
    }

    // for each item, create preview + populate it
    allStoredLogs.forEach((dailyLog) => {
        const dailyLogPreview = createDailyLogPreview();

        dailyLogPreview.populateFields(
            convertPreviewDate(dailyLog.date), // convert to form {mm/dd/yyyy}
            dailyLog.journal,
            false,
            dailyLog.notes,
            dailyLog.journal.length > 0,
        );
    });

    // update # of logs
    updateLogCount();

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
    checkbox.setAttribute('class', 'checkbox');
    listItem.appendChild(checkbox);
    listItem.appendChild(dailyLogPreview);
    logList.appendChild(listItem);

    return dailyLogPreview;
}

/**
 * Helper function: creates HTML of daily log
 * Called when user clicks new log button/existing log
 * @param {String} date
 * @returns <daily-log> created
 */
function createDailyLog(date) {
    const dailyLog = new DailyLog(); // create new daily log
    main.appendChild(dailyLog);
    const logContent = fetchLog(date);
    dailyLog.populateFields(
        'Daily Log',
        logContent.date,
        logContent.notes,
        logContent.journal,
    );

    return dailyLog;
}

/**
 * Helper function: removes whatever is on screen
 * to just display a full daily log
 * Called when user clicks on specific daily preview
 * @param {String} date from preview
 */
function openFullLog(date) {
    editBtn.disabled = true; // do not let users mess outside of log
    removeAllLogs(); // clear out main
    const dailyLog = createDailyLog(date);

    // on cancel, reset inbox (populate with whatever we have)
    dailyLog.addEventListener('cancelLog', () => {
        main.removeChild(dailyLog); // remove full daily log from screen
        editBtn.disabled = false; // users can edit inbox again
        populateInbox(); // add previews
    });

    dailyLog.addEventListener('saveLog', () => {
        main.removeChild(dailyLog); // remove full daily log from screen
        editBtn.disabled = false; // users can edit inbox again
        updateLog(dailyLog.getDate(), dailyLog.getNotes(), dailyLog.getJournal()); // save changes
        populateInbox(); // add previews (with changes)
    });
}

/**
 * Helper function: updates display of number of logs
 * in footer to reflect state of system
 * Called whenever we add/delete logs
 */
function updateLogCount() {
    const numLogs = logList.querySelectorAll('#log-list>li').length;
    logCount.innerText = `${numLogs} logs`;
}

// on load, add all previews to inbox
populateInbox();
