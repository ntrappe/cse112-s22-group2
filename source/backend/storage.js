/**
 * @module Storage
 */

const EXIT_SUCCESS = 1;
const EXIT_FAILURE = 0;
const NOT_FOUND = -1;
const DECIMAL = 10;
const MIN_DATE = 1;
const MAX_DATE = 31;
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

// let myObject = [];

/**
 * Function to determine if date is legitimate
 * @param {String} date
 * @returns true or false depending on if true date
 */
function validateDate(date) {
    const dateSplitted = date.split(',');
    console.log('dateSplitted: ' + dateSplitted);

    /* Input validation for day of the week */
    if (WEEKDAYS.indexOf((dateSplitted[0])) === NOT_FOUND) {
        console.log(`Invalid Day of the Week passed: ${dateSplitted[0]}`);
        return EXIT_FAILURE;
    }

    // Input validation for month/day
    // Note that February 31 or April 30 is considered valid in this checker
    let monthAndDay = dateSplitted[1].substring(1);
    monthAndDay = monthAndDay.split(' ');
    if (MONTHS.indexOf(monthAndDay[0]) === NOT_FOUND) {
        console.log(`Invalid month passed: ${monthAndDay[0]}`);
        return EXIT_FAILURE;
    }
    if (parseInt(monthAndDay[1], DECIMAL) < MIN_DATE
    || MAX_DATE < parseInt(monthAndDay[1], DECIMAL)) {
        console.log(`Invalid day passed: ${monthAndDay[1]}`);
        return EXIT_FAILURE;
    }

    // Input validation for year
    // Note that it just checks whether the input is number
    const year = dateSplitted[2].substring(1);
    if (Number.isNaN(parseInt(year, DECIMAL))) {
        console.log(`Invalid year passed: ${year}`);
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}

/**
 * Converts date (workday, month day, year) to a date that
 * orders items in local storage from most to least recent 
 * @param {String} date 
 * @returns date as yyyy/mm/dd
 */
function convertDate(date) {
    const dateSplitted = date.split(', ');
    console.log('control date: ' + dateSplitted);
    const monthDay = dateSplitted[1].split(' ');
    const month = MONTHS.indexOf(monthDay[0]);
    return `${dateSplitted[2]}/${month}/${monthDay[1]}`;
}

export function addLog(date, notes, journal) {
    if (validateDate(date) === EXIT_FAILURE) {
        return EXIT_FAILURE;
    }

    // Input validation for notes
    // Check whether it contains only strings
    for (let i = 0; i < notes.length; i++) {
        if (typeof (notes[i]) !== 'string') {
            console.log('Notes must contain only strings.');
            return EXIT_FAILURE;
        }
    }

    // Input validation for journal
    // Check whether it is a string
    if (typeof (journal) !== 'string') {
        console.log('Journal must be string.');
        return EXIT_FAILURE;
    }

    if (localStorage.getItem(date) !== null) {
        console.log('There already exists a log having the same date');
        return EXIT_FAILURE;
    }

    // myObject = { date, notes, journal };
    const logObj = {
        date: date,
        notes: notes,
        journal: journal
    };

    localStorage.setItem(convertDate(date), JSON.stringify(logObj));
    console.log('Successfully added to the local storage');
    return EXIT_SUCCESS;
}

export function updateLog(date, notes, journal) {
    if (validateDate(date) === EXIT_FAILURE) {
        return EXIT_FAILURE;
    }

    // let notes = document.getElementById('notes').value;
    // let journal = document.getElementById('journal').value;

    // Input validation for notes
    // Check whether it contains only strings
    for (let i = 0; i < notes.length; i++) {
        if (typeof (notes[i]) !== 'string') {
            console.log('Notes must contain only strings.');
            return EXIT_FAILURE;
        }
    }

    // Input validation for journal
    // Check whether it is a string
    if (typeof (journal) !== 'string') {
        console.log('Journal must be string.');
        return EXIT_FAILURE;
    }

    if (localStorage.getItem(date) === null) {
        console.log(`There is no log having the date: ${date}`);
        return EXIT_FAILURE;
    }

    myObject = { date, notes, journal };
    localStorage.setItem(convertDate(date), JSON.stringify(myObject));
    console.log('Successfully updated to the local storage');

    return EXIT_SUCCESS;
}

export function fetchLog(date) {
    if (validateDate(date) === EXIT_FAILURE) {
        return EXIT_FAILURE;
    }

    const searchResult = localStorage.getItem(date);
    if (searchResult === null) {
        console.log(`No log found with the date: ${date}`);
        return EXIT_FAILURE;
    }

    console.log('Log successfully found.');
    return JSON.parse(searchResult);
}

export function fetchAll() {
    const searchResult = [];
    // for (let i = 0; i < localStorage.length; i++) {
    //     console.log(`Log at ${localStorage.key(i)}: ${localStorage.getItem(localStorage.key(i))}`);
    //     const storedLog = localStorage.getItem(localStorage.key(i));
    //     searchResult.push(JSON.parse(storedLog));
    // }
    for (let i = 0; i < localStorage.length; i++) {
        console.log(`Log at ${localStorage.key(i)}: ${localStorage.getItem(localStorage.key(i))}`);
        const storedLog = localStorage.getItem(localStorage.key(i));
        searchResult.push(JSON.parse(storedLog));
    }
    return searchResult;
}

export function deleteAll() {
    localStorage.clear();
}
