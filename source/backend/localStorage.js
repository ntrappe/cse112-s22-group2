const EXIT_SUCESS = true;
const EXIT_FAILURE = false;
let myObject = [];

export function addLog(date, notes, journal){
    let dateSplitted = date.split(',');
    // Input validation for day of the week
    if (!(dateSplitted[0] == "Monday" || dateSplitted[0] == "Tuesday" || dateSplitted[0] == "Wednesday" || dateSplitted[0] == "Thursday" || dateSplitted[0] == "Friday" || dateSplitted[0] == "Saturday" || dateSplitted[0] == "Sunday")){
        console.log("Invalid Day of the Week passed: " + dateSplitted[0]);
        return EXIT_FAILURE;
    } 

    // Input validation for month/day
    // Note that February 31 or April 30 is considered valid in this checker
    let monthAndDay = dateSplitted[1].substring(1);
    monthAndDay = monthAndDay.split(' ');
    if(!(monthAndDay[0] == "January" || monthAndDay[0] == "February" || monthAndDay[0] == "March" || monthAndDay[0] == "April" || monthAndDay[0] == "May" || monthAndDay[0] == "June" || monthAndDay[0] == "July" || monthAndDay[0] == "August" || monthAndDay[0] == "September" || monthAndDay[0] == "October" || monthAndDay[0] == "November" || monthAndDay[0] == "December")){
        console.log("Invalid month passed: " + monthAndDay[0]);
        return EXIT_FAILURE;
    } else if (parseInt(monthAndDay[1]) < 1 || 31 < parseInt(monthAndDay[1])){
        console.log("Invalid day passed: " + monthAndDay[1]);
        return EXIT_FAILURE;
    }

    // Input validation for year
    // Note that it just checks whether the input is number
    let year = dateSplitted[2].substring(1);
    if (isNaN(parseInt(year))){
        console.log("Invalid year passed: " + year);
        return EXIT_FAILURE;
    }

    // Input validation for notes
    // Check whether it contains only strings
    for (let i = 0; i < notes.length; i++){
        if (typeof(notes[i]) != 'string'){
            console.log("notes must contain only strings.")
            return EXIT_FAILURE;
        }
    }

    // Input validation for journal
    // Check whether it is a string
    if (typeof(journal) != 'string'){
        console.log("journal must be string.")
        return EXIT_FAILURE;
    }

    if (localStorage.getItem(date) == null) {
        myObject = [];
    } else {                
        myObject = localStorage.getItem(date);
        console.log("There already exists a log having the same date");
        return EXIT_FAILURE;
    }

    myObject = {
        notes: notes,
        journal: journal
    }

    localStorage.setItem(date, JSON.stringify(myObject));
    console.log("Successfully added to the local storage");
    return EXIT_SUCESS;
}

export function updateLog(date, notes, journal){
    let dateSplitted = date.split(',');
    console.log(dateSplitted);

    // Input validation for day of the week
    if (!(dateSplitted[0] == "Monday" || dateSplitted[0] == "Tuesday" || dateSplitted[0] == "Wednesday" || dateSplitted[0] == "Thursday" || dateSplitted[0] == "Friday" || dateSplitted[0] == "Saturday" || dateSplitted[0] == "Sunday")){
        console.log("Invalid Day of the Week passed: " + dateSplitted[0]);
        return EXIT_FAILURE;
    } 

    // Input validation for month/day
    // Note that February 31 or April 30 is considered valid in this checker
    let monthAndDay = dateSplitted[1].substring(1);
    monthAndDay = monthAndDay.split(' ');
    console.log(monthAndDay);
    if(!(monthAndDay[0] == "January" || monthAndDay[0] == "February" || monthAndDay[0] == "March" || monthAndDay[0] == "April" || monthAndDay[0] == "May" || monthAndDay[0] == "June" || monthAndDay[0] == "July" || monthAndDay[0] == "August" || monthAndDay[0] == "September" || monthAndDay[0] == "October" || monthAndDay[0] == "November" || monthAndDay[0] == "December")){
        console.log("Invalid month passed: " + monthAndDay[0]);
        return EXIT_FAILURE;
    } else if (parseInt(monthAndDay[1]) < 1 || 31 < parseInt(monthAndDay[1])){
        console.log("Invalid day passed: " + monthAndDay[1]);
        return EXIT_FAILURE;
    }

    // Input validation for year
    // Note that it just checks whether the input is number
    let year = dateSplitted[2].substring(1);
    if (isNaN(parseInt(year))){
        console.log("Invalid year passed: " + year);
        return EXIT_FAILURE;
    }

    //let notes = document.getElementById('notes').value;
    //let journal = document.getElementById('journal').value;

    // Input validation for notes
    // Check whether it contains only strings
    for (let i = 0; i < notes.length; i++){
        if (typeof(notes[i]) != 'string'){
            console.log("notes must contain only strings.")
            return EXIT_FAILURE;
        }
    }

    // Input validation for journal
    // Check whether it is a string
    if (typeof(journal) != 'string'){
        console.log("journal must be string.")
        return EXIT_FAILURE;
    }

    if (localStorage.getItem(date) == null){
        console.log("There is no log having the date: " + date);
        return EXIT_FAILURE;
    }

    myObject = {
        notes: notes,
        journal: journal
    }
    localStorage.setItem(date, JSON.stringify(myObject));
    console.log("Successfully updated to the local storage");
    return EXIT_SUCESS;
}

export function fetchLog(date){
    let dateSplitted = date.split(',');
    console.log(dateSplitted);

    // Input validation for day of the week
    if (!(dateSplitted[0] == "Monday" || dateSplitted[0] == "Tuesday" || dateSplitted[0] == "Wednesday" || dateSplitted[0] == "Thursday" || dateSplitted[0] == "Friday" || dateSplitted[0] == "Saturday" || dateSplitted[0] == "Sunday")){
        console.log("Invalid Day of the Week passed: " + dateSplitted[0]);
        return EXIT_FAILURE;
    } 

    // Input validation for month/day
    // Note that February 31 or April 30 is considered valid in this checker
    let monthAndDay = dateSplitted[1].substring(1);
    monthAndDay = monthAndDay.split(' ');
    console.log(monthAndDay);
    if(!(monthAndDay[0] == "January" || monthAndDay[0] == "February" || monthAndDay[0] == "March" || monthAndDay[0] == "April" || monthAndDay[0] == "May" || monthAndDay[0] == "June" || monthAndDay[0] == "July" || monthAndDay[0] == "August" || monthAndDay[0] == "September" || monthAndDay[0] == "October" || monthAndDay[0] == "November" || monthAndDay[0] == "December")){
        console.log("Invalid month passed: " + monthAndDay[0]);
        return EXIT_FAILURE;
    } else if (parseInt(monthAndDay[1]) < 1 || 31 < parseInt(monthAndDay[1])){
        console.log("Invalid day passed: " + monthAndDay[1]);
        return EXIT_FAILURE;
    }

    // Input validation for year
    // Note that it just checks whether the input is number
    let year = dateSplitted[2].substring(1);
    if (isNaN(parseInt(year))){
        console.log("Invalid year passed: " + year);
        return EXIT_FAILURE;
    }

    let searchResult = localStorage.getItem(date);
    if (searchResult == null){
        console.log("No log found with the date: " + date);
        return EXIT_FAILURE;
    } else {
        console.log("Log successfully found.")
        return searchResult;
    }
}

export function fetchAll(){
    let searchResult = [];
    for(let i = 0; i < localStorage.length; i++){
        console.log("Log at " + localStorage.key(i) + ": " + localStorage.getItem(localStorage.key(i)));
        searchResult.push(localStorage.getItem(localStorage.key(i)));
    }
    return searchResult;
}

export function deleteAll(){
    localStorage.clear();
}