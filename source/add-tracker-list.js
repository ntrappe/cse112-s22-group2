/**
 * @module add-component
 */

import TrackerPreview from './components/tracker-modal/personal-tracker.js';

 /* Sample code of how to render a custom component */
 const data = [
     {
        trackerName: 'MOOD',
        trackerDescription: 'Tracks your mood based on the emoji',
     },
     {
        trackerName: 'WATER',
        trackerDescription: 'Tracks the amount of water you drank during the day',
     },
 ];
 
 /* grab the point on the HTML page to add component to */
 const trackerList = document.getElementById('tracker-list');
 //const aaa = document.createElement('li');
 //trackerList.appendChild(aaa);
 
 /* Use a loop to dynamically render the components */
 data.forEach((tracker) => {
     const listItem = document.createElement('li');
     const checkbox = document.createElement('input');
     const trackerPreview = new TrackerPreview();
     trackerPreview.setAttribute('class', 'tracker-preview');
     checkbox.setAttribute('type', 'checkbox');
     checkbox.setAttribute('style', 'display: grid;');
     listItem.appendChild(checkbox);
     listItem.appendChild(trackerPreview);
     trackerList.appendChild(listItem);
     trackerPreview.populateFields(
        tracker.trackerName,
        tracker.trackerDescription,
     );
 });
 