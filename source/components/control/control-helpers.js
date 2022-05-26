const COMMA_SPACE = 2;
const SPACE = 1;
const months = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12',
}

export function convertDate(fullDate) {
    let month = '';
    let day = '';
    let year = '';
    let i = 0;
    // skip over day of week [Wednesday, ]
    while((i < fullDate.length) && (fullDate[i] != ',')) {
        i++;
    }
    i += COMMA_SPACE;
    // pull out month
    while((i < fullDate.length) && (fullDate[i] != ' ')) {
        month += fullDate[i++];
    }
    i += SPACE;
    // pull out day
    while((i < fullDate.length) && (fullDate[i] != ',')) {
        day += fullDate[i++];
    }
    i += COMMA_SPACE;
    // pull out year
    while(i < fullDate.length) {
        year += fullDate[i++];
    }

    return `${months[month]}/${day}/${year}`;
}