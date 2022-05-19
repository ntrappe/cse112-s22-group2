class popupModal extends HTMLElement {
  constructor() {
    super();

    // write element functionality in here
    const shadow = this.attachShadow({ mode: 'open' });

    // set the style for the shadow DOM elements
    let modalStyle = document.createElement('link');
    modalStyle.setAttribute('rel', 'stylesheet');
    modalStyle.setAttribute('href', './styles/popup-modal.css');

    //create the elements which compose the custom element
    let modalBackdrop = document.createElement('div');
    let modalContianer = document.createElement('div');
    let buttonsContianer = document.createElement('div');
    let confirmationText = document.createElement('p');
    let warningText = document.createElement('p');
    let deleteAllBtn = document.createElement('button');
    let cancelBtn = document.createElement('button');


    // set the attributes of the created elements
    modalBackdrop.setAttribute('id', 'modal-backdrop');
    modalContianer.setAttribute('id', 'modal-container');
    buttonsContianer.setAttribute('id', 'buttons-container');
    deleteAllBtn.setAttribute('id', 'delete-all-btn');
    cancelBtn.setAttribute('id', 'cancel-btn');


    // set the inner text of the created elements
    confirmationText.innerText = 'Do you want to delete all daily logs?';
    warningText.innerText = 'You cannot undo this action';
    deleteAllBtn.innerText = 'Delete';
    cancelBtn.innerText = 'Cancel';

    // append elements to container
    buttonsContianer.appendChild(deleteAllBtn);
    buttonsContianer.appendChild(cancelBtn);
    modalContianer.appendChild(confirmationText);
    modalContianer.appendChild(warningText);
    modalContianer.appendChild(buttonsContianer);
    modalBackdrop.appendChild(modalContianer);

    shadow.appendChild(modalStyle);
    shadow.appendChild(modalBackdrop);

    deleteAllBtn.addEventListener('click', closePopupModal);
    cancelBtn.addEventListener('click', closePopupModal);
    modalBackdrop.addEventListener('click', closePopupModal);

    let elemID = this.id;
    function closePopupModal(){
        document.getElementById(`${elemID}`).style.display = 'none';
    }
  }
}
customElements.define('popup-modal', popupModal);
//export default popupModal;