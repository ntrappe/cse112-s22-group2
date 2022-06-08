/**
 * @module Storage
 */

import { convertStorageDate } from '../components/control/control-helpers.js';

const EXIT_SUCCESS = 1;
const EXIT_FAILURE = 0;
const NOT_FOUND = -1;
const DECIMAL = 10;
const MIN_DATE = 1;
const MAX_DATE = 31;
const MIN_MONTH = 1;
const MAX_MONTH = 12;
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

// let myObject = [];

/**
 * Function to determine if date is legitimate
 * @param {String} date; if received from addLog/updateLog then date
 * is from full daily log {weekday, month day, year}; otherwise,
 * date is from fetchLog/deleteLog from daily log preview {mm/dd/yyyy}
 * @param {Boolean} true if validating on a fetch or false
 * if validating on an add/update
 * @returns true or false depending on if true date
 */
function validateDate(date, fetch) {
    /**
     * Called from addLog/updateLog (daily log date)
     * Validating date of type {weekday, month day, year}
     */
    if (!fetch) {
        console.log(`validating [${date}]`);
        const dateSplitted = date.split(',');

        /* Input validation for day of the week */
        if (WEEKDAYS.indexOf((dateSplitted[0])) === NOT_FOUND) {
            console.error(`Invalid Day of the Week passed: ${dateSplitted[0]}`);
            return EXIT_FAILURE;
        }

        // Input validation for month/day
        // Note that February 31 or April 30 is considered valid in this checker
        let monthAndDay = dateSplitted[1].substring(1);
        monthAndDay = monthAndDay.split(' ');

        if (MONTHS.indexOf(monthAndDay[0]) === NOT_FOUND) {
            console.error(`Invalid month passed: ${monthAndDay[0]}`);
            return EXIT_FAILURE;
        }

        if (parseInt(monthAndDay[1], DECIMAL) < MIN_DATE
        || MAX_DATE < parseInt(monthAndDay[1], DECIMAL)) {
            console.error(`Invalid day passed: ${monthAndDay[1]}`);
            return EXIT_FAILURE;
        }
    /**
     * Called from fetchLog/deleteLog (daily log preview date)
     * Validating date of type {mm/dd/yyyy}
     */
    } else {
        console.log(`validating [${date}]`);
        const dateSplitted = date.split('/');
        const month = dateSplitted[0];
        const day = dateSplitted[1];
        const year = dateSplitted[2];

        // check that month within reasonable range
        if (parseInt(month, DECIMAL) < MIN_MONTH
        || parseInt(month, DECIMAL) > MAX_MONTH) {
            console.error(`Invalid month passed: ${month}`);
            return EXIT_FAILURE;
        }

        // check that date within reasonable range
        if (parseInt(day, DECIMAL) < MIN_DATE
        || parseInt(day, DECIMAL) > MAX_DATE) {
            console.error(`Invalid day passed: ${day}`);
            return EXIT_FAILURE;
        }

        // Input validation for year
        // Note that it just checks whether the input is number
        if (Number.isNaN(parseInt(year, DECIMAL))) {
            console.error(`Invalid year passed: ${year}`);
            return EXIT_FAILURE;
        }
    }

    return EXIT_SUCCESS;
}

/**
 * @method addLog
 * Method will ONLY be called from data in full daily log so date in
 * the form "{weekday}, {month} {day}, {year}", notes as a list of
 * strings where each string is text of <li> and journal is a string
 * from content of that textarea
 * @param {String} date date text of log (DIFF THAN STORAGE KEY)
 * @param {Object} notes list of strings
 * @param {String} journal text of journal
 * @returns whether operation was successful
 */
export function addLog(date, notes, journal) {
    if (validateDate(date, false) === EXIT_FAILURE) {
        return EXIT_FAILURE;
    }

    // Input validation for notes: check if contains only strings
    if (notes != null) {
        for (let i = 0; i < notes.length; i++) {
            if (typeof (notes[i]) !== 'string') {
                console.error('Notes must contain only strings.');
                return EXIT_FAILURE;
            }
        }
    }

    // Input validation for journal: check if a string
    if (typeof (journal) !== 'string') {
        console.error('Journal must be string.');
        return EXIT_FAILURE;
    }

    if (localStorage.getItem(date) !== null) {
        console.error('There already exists a log having the same date');
        return EXIT_FAILURE;
    }

    const logObj = {
        date: date,
        notes: notes,
        journal: journal,
    };

    localStorage.setItem(convertStorageDate(date), JSON.stringify(logObj));
    console.log('Successfully added to the local storage');
    return EXIT_SUCCESS;
}

/**
 * @method updateLog
 * Assumes that, given a date that a log exists at, the
 * user modified the ntoes or journal sections
 * NOTE: does NOT support if user updated the date of the
 * daily log (bc that functionality isn't done in daily log)
 * @param {String} date date text of log (DIFF THAN STORAGE KEY)
 * @param {Object} notes list of strings
 * @param {String} journal text of journal
 * @returns whether operation was successful
 */
export function updateLog(date, notes, journal) {
    if (validateDate(date, false) === EXIT_FAILURE) {
        return EXIT_FAILURE;
    }

    // Input validation for notes: check if contains strings
    if (notes != null) {
        for (let i = 0; i < notes.length; i++) {
            if (typeof (notes[i]) !== 'string') {
                console.log('Notes must contain only strings.');
                return EXIT_FAILURE;
            }
        }
    }

    // Input validation for journal: check if string
    if (typeof (journal) !== 'string') {
        console.log('Journal must be string.');
        return EXIT_FAILURE;
    }

    const storageDate = convertStorageDate(date);
    if (localStorage.getItem(storageDate) === null) {
        console.log(`There is no log having the date: ${date}`);
        return EXIT_FAILURE;
    }

    const previousLog = JSON.parse(localStorage.getItem(storageDate));
    const previousDate = previousLog.date;

    const logObj = {
        date: previousDate,
        notes: notes,
        journal: journal,
    };

    localStorage.setItem(storageDate, JSON.stringify(logObj));
    return EXIT_SUCCESS;
}

/**
 * Retrieves value stored at key that corresponds to date param
 * then parses and returns it
 * @param {String} date of preview
 * @returns JS object with date, notes, journal
 */
export function fetchLog(date) {
    if (validateDate(date, true) === EXIT_FAILURE) {
        return EXIT_FAILURE;
    }

    const searchResult = localStorage.getItem(convertStorageDate(date));
    if (searchResult === null) {
        console.error(`No log found with the date: ${date}`);
        return EXIT_FAILURE;
    }

    console.log('Log successfully found.');
    return JSON.parse(searchResult);
}

/**
 * Iterates through all values in local storage, parses,
 * adds to list, and returns
 * @returns list of JS objects with date, notes, journal
 */
export function fetchAll() {
    const searchResult = [];
    for (let i = 0; i < localStorage.length; i++) {
        // console.log(`Log at ${localStorage.key(i)}: ${localStorage.getItem(localStorage.key(i))}`);
        const storedLog = localStorage.getItem(localStorage.key(i));
        searchResult.push(JSON.parse(storedLog));
    }
    return searchResult;
}

/**
 * Removes item stored at key that corresponds to date param
 * @param {String} date of preview
 * @returns if operation was successful
 */
export function deleteLog(date) {
    if (validateDate(date, true) === EXIT_FAILURE) {
        return EXIT_FAILURE;
    }

    const storageDate = convertStorageDate(date);
    const searchResult = localStorage.getItem(storageDate);
    if (searchResult === null) {
        console.error(`No log found with the date: ${date}`);
        return EXIT_FAILURE;
    }
    localStorage.removeItem(storageDate);

    return EXIT_SUCCESS;
}

export function deleteAll() {
    localStorage.clear();
}
