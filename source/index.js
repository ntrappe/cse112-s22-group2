let editBtn = document.getElementById('edit-btn');
let checkboxes = document.querySelectorAll('input[type=checkbox]');

editBtn.addEventListener('click', toggleCheckboxDisplay);

function toggleCheckboxDisplay(){
    // show checkboxes when edit is clicked and set text to cancel
    if(editBtn.innerText == 'Edit'){
        editBtn.innerText = 'Cancel'
        checkboxes.forEach(function(checkbox){
            checkbox.style.display = 'inline-block';
        });
    }
    // stop showing checkboxes when cancel is clicked and set text back to edit
    else{
        editBtn.innerText = 'Edit';
        checkboxes.forEach(function(checkbox){
            checkbox.style.display = 'none';
        });
    }
}