const COMMA_SPACE = 2;
const SPACE = 1;
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

export function convertPreviewDate(date) {
    if (date.includes('/')) {
        /* {yyyy/mm/dd} > {mm/dd/yyyy} */
        const dateSplitted = date.split('/'); // already padded
        return `${dateSplitted[1]}/${dateSplitted[2]}/${dateSplitted[0]}`;
    } else {
        /* {weekday, month day, year} > {mm/dd/yyyy} */
        const dateSplitted = date.split(', ');
        const monthDay = dateSplitted[1].split(' ');
        const dayStr = monthDay[1].padStart(2, '0'); // pad so {dd}
        const monthNum = MONTHS.indexOf(monthDay[0]) + 1;
        const monthStr = (`${monthNum}`).padStart(2, '0'); // pad so {mm}
        return `${monthStr}/${dayStr}/${dateSplitted[2]}`;
    }
}

/**
 * Converts date (workday, month day, year) to a date that
 * orders items in local storage from most to least recent
 * @param {String} date
 * @returns date as yyyy/mm/dd
 */
export function convertStorageDate(date) {
    if (date.includes('/')) {
        /* {mm/dd/yyyy} > {yyyy/mm/dd} */
        const dateSplitted = date.split('/'); // already padded
        return `${dateSplitted[2]}/${dateSplitted[0]}/${dateSplitted[1]}`;
    } else {
        /* {weekday, month day, year} > {yyyy/mm/dd} */
        const dateSplitted = date.split(', ');
        const monthDay = dateSplitted[1].split(' ');
        const dayStr = monthDay[1].padStart(2, '0'); // pad so {dd}
        const monthNum = MONTHS.indexOf(monthDay[0]) + 1;
        const monthStr = (`${monthNum}`).padStart(2, '0'); // pad so {mm}
        return `${dateSplitted[2]}/${monthStr}/${dayStr}`;
    }
}

/**
 * @method setDefaultDate
 * Helper function to fetch current date and format
 * to be "{day of week}, {month} {date}, {year}"
 */
export function setDefaultDate() {
    const date = new Date();
    const day = date.toLocaleDateString('en-US', { // english version of weekday
        weekday: 'long',
    });
    const month = date.toLocaleDateString('en-US', {
        month: 'long',
    });
    return `${day}, ${month} ${date.getDate()}, ${date.getFullYear()}`;
}
