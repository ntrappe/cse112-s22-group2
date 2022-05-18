let editBtn = document.getElementById('edit-btn');
let checkboxes = document.querySelectorAll('input[type=checkbox]');
let deleteAllBtn = document.getElementById('delete_all_btn');
let deleteBtn = document.getElementById('delete_btn');
let updateInfo = document.getElementById('update_info');
let editIcon = document.getElementById('edit_icon');

editBtn.addEventListener('click', toggleCheckboxDisplay);

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

        updateInfo.style.display = 'none';
        editIcon.style.display = 'none';
        deleteAllBtn.style.display = 'block';
        deleteBtn.style.display = 'block';
        
    }
    // stop showing checkboxes when cancel is clicked and set text back to edit
    else{
        editBtn.innerText = 'Edit';
        checkboxes.forEach(function(checkbox){
            checkbox.style.display = 'none';
        });

        updateInfo.style.display = 'block';
        editIcon.style.display = 'block';
        delete_all_btn.style.display = 'none';
        delete_btn.style.display = 'none';
    }

}