const COMMA_SPACE = 2;
const SPACE = 1;
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

export function convertDate(date) {
    const dateSplitted = date.split(', ');
    console.log('control date: ' + dateSplitted);
    const monthDay = dateSplitted[1].split(' ');
    const month = MONTHS.indexOf(monthDay[0]);
    return `${month}/${monthDay[1]}/${dateSplitted[2]}`;
}

console.log('convert: ' + convertDate('Wednesday, May 27, 2022'));
