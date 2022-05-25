const editBtn = document.getElementById('edit-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
const deleteSelectedBtn = document.getElementById('delete-selected-btn');
const newNoteBtn = document.getElementById('new-note-btn');

const checkboxes = document.querySelectorAll('input[type=checkbox]');
const inboxInfo = document.getElementById('inbox-info');

const deleteAllModal = document.getElementById('delete-all-modal');
const deleteSelectedModal = document.getElementById('delete-selected-modal');

const logList = document.getElementById('log-list');
const logs = logList.querySelectorAll('#log-list>li');
const logNumber = logList.querySelectorAll('#log-list>li').length;
const logCountDisplay = document.getElementById('log-count-display');

// display the number of logs
logCountDisplay.innerText = `${logNumber} logs`;

// set event listeners for buttons
editBtn.addEventListener('click', toggleCheckboxDisplay);
deleteAllBtn.addEventListener('click', deleteAllLogs);
deleteSelectedBtn.addEventListener('click', deleteSelectedLogs);

// When a log is clicked, check/uncheck its corresponding checkbox
logs.forEach((log) => {
    // prevent clicking the input directly from triggering triggering the log click event
    // otherwise clicking input directly will actually tick checkbox twice and not work
    const checkbox = log.children[0];
    checkbox.onclick = (e) => { e.stopPropagation(); };

    log.addEventListener('click', (event) => {
        tickCheckbox(checkbox);
    });
});

/**
 * @name toggleCheckboxDisplay
 * @function
 * @description toggles the display of the delete checkboxes and updates the edit/cancel
 * button accordingly
 */
function toggleCheckboxDisplay() {
    // show checkboxes when edit is clicked and set text to cancel
    if (editBtn.innerText === 'Edit') {
        editBtn.innerText = 'Cancel';
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
            checkbox.style.display = 'grid';
        });
        logs.forEach((log) => {
            log.style.cursor = 'pointer';
        });

        inboxInfo.style.display = 'none';
        newNoteBtn.style.display = 'none';
        deleteAllBtn.style.display = 'block';
        deleteSelectedBtn.style.display = 'block';
    } else { // stop showing checkboxes when cancel is clicked and set text back to edit
        editBtn.innerText = 'Edit';
        checkboxes.forEach((checkbox) => {
            checkbox.style.display = 'none';
        });
        logs.forEach((log) => {
            log.style.cursor = 'default';
        });

        inboxInfo.style.display = 'block';
        newNoteBtn.style.display = 'block';
        deleteAllBtn.style.display = 'none';
        deleteSelectedBtn.style.display = 'none';
    }
}

function deleteAllLogs() {
    // show modal
    deleteAllModal.style.display = 'block';
}

function deleteSelectedLogs() {
    const numLogSelected = logList.querySelectorAll('input:checked').length;
    if (numLogSelected > 0) {
        // set the text according to the number of logs wanting to delete + display modal
        const deleteSelectedKids = deleteSelectedModal.shadowRoot.childNodes[1];
        const confirmationMessage = deleteSelectedKids.firstChild.firstChild;
        confirmationMessage.innerText = `Do you want to delete ${numLogSelected} Daily Logs?`;
        deleteSelectedModal.style.display = 'block';
    }
}

function tickCheckbox(checkbox) {
    // if the checkbox is checked
    if (checkbox.checked) {
        checkbox.checked = false;
    } else {
        checkbox.checked = true;
    }
}
