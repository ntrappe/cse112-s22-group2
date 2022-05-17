const CANCEL = "Cancel";
const SAVE = "Save";
const DATE = "Date: ";
const NOTES = "Notes";
const JOURNAL = "Journal";
const LOG_TITLE = "New Daily Log";

class DailyLog extends HTMLElement {
  constructor () {
    super ();
    /* shadow DOM base */
    const shadow = this.attachShadow ({ mode: 'open' });
    
    /* wrap all the content in one */
    const wrapper = document.createElement ('span');
    wrapper.setAttribute ('class', 'wrapper');

    const dailyLogStyle = document.createElement('link');
    dailyLogStyle.setAttribute ('src', '../styles/daily-log.css');

    /* top of log has controls (buttons) to cancel or save log */
    const controlsContainer = document.createElement ('div');
    const cancelBtn = document.createElement ('button');
    const saveBtn = document.createElement ('button');

    let searchResult;


    controlsContainer.setAttribute ('class', 'control-container');
    cancelBtn.setAttribute ('class', 'control-btn');
    cancelBtn.setAttribute ('priority', 'high');

    cancelBtn.onclick = function(){
      if(confirm("Would you like to delete the journal of " + dateFormated) == true){
        deleteLog(dateFormated);
      } 
    };

    saveBtn.onclick = function(){
      getLog(dateFormated);
      if( searchResult == null){
        addLog ();
        alert ("log added");
      }else{
        addLog ();
        alert ("log updated");
      }
      searchResult = null;
    }

    saveBtn.setAttribute ('class', 'control-btn');
    cancelBtn.textContent = CANCEL;
    saveBtn.textContent = SAVE;
    controlsContainer.appendChild (cancelBtn);
    controlsContainer.appendChild (saveBtn);

    /* create the 4 main sections of the daily log */
    const heading = document.createElement ('section');
    const trackers = document.createElement ('section');
    const notes = document.createElement ('section');
    const journal = document.createElement ('section');

    /* heading consists of log name and date */
    const title = document.createElement ('h2');
    const dateContainer = document.createElement ('div');
    const dateTitle = document.createElement ('h3');
    const dateBtn = document.createElement ('button');
    title.textContent = LOG_TITLE;
    dateTitle.textContent = DATE;
    heading.appendChild (title);
    heading.appendChild (dateContainer);
    dateContainer.appendChild (dateTitle);
    dateContainer.appendChild (dateBtn);

    /* notes consist of title and input bullet text */
    const notesTitle = document.createElement ('h3');
    const notesInput = document.createElement ('input');
    notesTitle.textContent = NOTES;
    notesInput.textContent = "Type in a note ...";
    notesInput.setAttribute ('id', 'note-text');
    notes.appendChild (notesTitle);
    notes.appendChild (notesInput);

    const journalTitle = document.createElement ('h3');
    const journalInput = document.createElement ('input');
    journalInput.setAttribute ('id', 'journal-text');
    journal.appendChild (journalTitle);
    journal.appendChild (journalInput);
    
    shadow.append (dailyLogStyle);
    shadow.appendChild (wrapper);
    wrapper.appendChild (controlsContainer);
    wrapper.appendChild (heading);
    wrapper.appendChild (trackers);
    wrapper.appendChild (notes);

    const date = new Date();
    const day = date.toLocaleDateString ('en-US', { // english version of weekday
        weekday: 'long'
    });
    const month = date.toLocaleDateString ('en-US', {
        month: 'long'
    });
    let dateFormated = day + ', ' + month + ' ' + date.getDate() + ', ' + date.getFullYear()
  

    /* add a log */
    function addLog(){
      let notes = notesInput.value;
      localStorage.setItem(dateFormated,notes);
    }

    /* delete a log given date */
    function deleteLog (givenDate) {
      localStorage.removeItem(givenDate);
    }

    /* get log page given a specific date*/
    function getLog (givenDate) {
      searchResult = localStorage.key(givenDate);
    }

    /* set the date to default to today */
    function setDefaultDate () {
        dateBtn.textContent = dateFormated;
    }

    
    setDefaultDate ();
  }
}

customElements.define('daily-log', DailyLog);

export default DailyLog;