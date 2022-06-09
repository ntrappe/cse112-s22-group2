// Class name constants
const EDIT_TRACKERS_WRAPPER_CLASS = 'edit-trackers-wrapper';
const TEXT_WRAPPER_CLASS = 'text-container';
const LEFT_ICON_WRAPPER_CLASS = 'left-icon-container';
const RIGHT_ICON_WRAPPER_CLASS = 'right-icon-container';
const EDIT_TRACKERS_TITLE = 'Edit Trackers';

// Icon constants
const TRACKER_ICON = './icons/tracker';

class editTrackers extends HTMLElement {
    constructor() {
        super();

        // determines if the user is on mobile by checking its user Agent
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
            .test(navigator.userAgent);

        // write element functionality in here
        const shadow = this.attachShadow({ mode: 'open' });

        /* Creates all elements of the skeleton */
        const wrapper = document.createElement('section'); // outer container div
        const leftSideDiv = document.createElement('div'); // contains the tracker icon
        const middleSideDiv = document.createElement('div'); // contains the title of the edit button
        const rightSideDiv = document.createElement('div'); // contains the arrow icon
        const title = document.createElement('h2');
        const trackerIcon = document.createElement('img');
        const arrowIcon = document.createElement('img');

        /* Defines the heirachy */
        leftSideDiv.appendChild(trackerIcon);
        middleSideDiv.appendChild(title);
        rightSideDiv.appendChild(arrowIcon);
        wrapper.appendChild(leftSideDiv);
        wrapper.appendChild(middleSideDiv);
        wrapper.appendChild(rightSideDiv);
        shadow.appendChild(wrapper);

        const editTrackersCSS = document.createElement('link');
        editTrackersCSS.setAttribute('rel', 'stylesheet');
        editTrackersCSS.setAttribute(
            'href',
            './styles/edit-trackers.css',
        );
        shadow.appendChild(editTrackersCSS);

        /* Adds classes to the created elements */
        wrapper.setAttribute('class', EDIT_TRACKERS_WRAPPER_CLASS);
        leftSideDiv.setAttribute('class', LEFT_ICON_WRAPPER_CLASS);
        middleSideDiv.setAttribute('class', TEXT_WRAPPER_CLASS);
        rightSideDiv.setAttribute('class', RIGHT_ICON_WRAPPER_CLASS);

        trackerIcon.setAttribute('alt', 'tracker.img');
        trackerIcon.setAttribute('src', './icons/tracker-icon-off.png');
        trackerIcon.setAttribute('class', 'left-edit-icon');

        arrowIcon.setAttribute('alt', 'arrow.img');
        arrowIcon.setAttribute('src', './icons/arrow-icon.png');
        arrowIcon.setAttribute('class', 'right-edit-icon');

        title.textContent = EDIT_TRACKERS_TITLE;
        console.log(EDIT_TRACKERS_TITLE);

        wrapper.addEventListener('click', function () {
            location.href = "edit-trackers.html";
        });

    }
}
customElements.define('edit-trackers-modal', editTrackers);
