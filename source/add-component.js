/**
 * @module add-component
 */

import DailyLogPreview from './components/daily-log-preview/daily-log-preview.js';

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
        didNotes: false,
        didJournal: true,
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
const logList = document.getElementById('log-list');

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
