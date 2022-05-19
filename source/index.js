let editBtn = document.getElementById('edit-btn');
let deleteAllBtn = document.getElementById('delete-all-btn');
let deleteSelectedBtn = document.getElementById('delete-selected-btn');
let newNoteBtn = document.getElementById('new-note-btn');

let checkboxes = document.querySelectorAll('input[type=checkbox]');
let inboxInfo = document.getElementById('inbox-info');

let deleteAllModal = document.getElementById('delete-all-modal');
let deleteSelectedModal = document.getElementById('delete-selected-modal');

let logList = document.getElementById('log-list');
let logNumber = logList.querySelectorAll('#log-list>section').length;
let logCountDisplay = document.getElementById('log-count-display');


// display the number of logs
logCountDisplay.innerText = `${logNumber} logs`;

// set event listeners for buttons
editBtn.addEventListener('click', toggleCheckboxDisplay);
deleteAllBtn.addEventListener('click', deleteAllLogs);
deleteSelectedBtn.addEventListener('click', deleteSelectedLogs);

/**
 * @name toggleCheckboxDisplay
 * @function
 * @description toggles the display of the delete checkboxes and updates the edit/cancel button accordingly
 */
function toggleCheckboxDisplay(){
    // show checkboxes when edit is clicked and set text to cancel
    if(editBtn.innerText == 'Edit'){
        editBtn.innerText = 'Cancel'
        checkboxes.forEach(function(checkbox){
            checkbox.checked = false;
            checkbox.style.display = 'inline-block';
        });

        inboxInfo.style.display = 'none';
        newNoteBtn.style.display = 'none';
        deleteAllBtn.style.display = 'block';
        deleteSelectedBtn.style.display = 'block';
        
    }
    // stop showing checkboxes when cancel is clicked and set text back to edit
    else{
        editBtn.innerText = 'Edit';
        checkboxes.forEach(function(checkbox){
            checkbox.style.display = 'none';
        });

        inboxInfo.style.display = 'block';
        newNoteBtn.style.display = 'block';
        deleteAllBtn.style.display = 'none';
        deleteSelectedBtn.style.display = 'none';
    }
}

function deleteAllLogs(){
    // show modal
    deleteAllModal.style.display = 'block';
}

function deleteSelectedLogs(){
    let numLogSelected = logList.querySelectorAll('input:checked').length;
    if(numLogSelected > 0){
        // set the text according to the number of logs wanting to delete + display modal
        deleteSelectedModal.shadowRoot.childNodes[1].firstChild.firstChild.innerText = `Do you want to delete ${numLogSelected} Daily Logs?`
        deleteSelectedModal.style.display = 'block';
    }
}