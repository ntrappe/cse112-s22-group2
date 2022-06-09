import TrackerModal from '../tracker-modal/tracker-modal.js';

const trackerMain = document.getElementById('tracker-main');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('save-btn');

const moodTracker = new TrackerModal(); // create new daily log
trackerMain.appendChild(moodTracker);

saveBtn.addEventListener('click', () => {
    const emojiContainer = moodTracker.shadowRoot.getElementById('image-container');
    const emoji = (emojiContainer.childNodes[0]).textContent;
    document.dispatchEvent(saveTrackersEvent);
    console.log(emoji);
    setEmoji('😃');
    closeTracker();
});

cancelBtn.addEventListener('click', () => {
    closeTracker();
});

const saveTrackersEvent = new CustomEvent('saveTrackers', {
    bubbles: true, // event listenable outside of container
    composed: true,
    detail: { emoji: () => emoji },
});

function closeTracker() {
    // console.log('close tracker!');
    // const url = window.location.href;
    // const homeUrl = url.replace('trackers.html', 'index.html');
    // window.location.href = homeUrl;
    window.dispatchEvent(reopenLogEvent);
}

const reopenLogEvent = new CustomEvent('reopenLog', {
    bubbles: true, // event listenable outside of container
    composed: true,
});
