/**
 * @module add-component
 */

import DailyLogPreview from './components/daily-log-preview/daily-log-preview.js';

/* Sample code of how to render a custom component */
const data = [
    {
        dateOfEntry: '04/17/2022',
        textEntry: 'We are no strangers to love. You know the rules, and so do I. A full commitment\'s what I\'m thinking of, you wouldn\'t get this from any other guy',
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
];

/* grab the point on the HTML page to add component to */
const main = document.getElementById('main');
/* create an instance of the custom component DailyLog */
const dailyLogPreview1 = new DailyLogPreview();
const dailyLogPreview2 = new DailyLogPreview();
/* append 2 daily previews to the page */
main.appendChild(dailyLogPreview1);
main.appendChild(dailyLogPreview2);
dailyLogPreview1.populateFields(
    data[0].dateOfEntry,
    data[0].textEntry,
    data[0].didTrackers,
    data[0].didNotes,
    data[0].didJournal,
);
dailyLogPreview2.populateFields(
    data[1].dateOfEntry,
    data[1].textEntry,
    data[1].didTrackers,
    data[1].didNotes,
    data[1].didJournal,
);
