// Class name constants
const TRACKER_PREVIEW_WRAPPER_CLASS = 'tracker-preview-wrapper';
const TEXT_WRAPPER_CLASS = 'text-container';
const TRACKER_TITLE = 'Tracker name';

/**
 * @module TrackerPreview
 * Class that renders a brief preview of a daily log
 * @extends HTMLElement
 *
 * @example
 * <tracker-preview></tracker-preview>
 */
class TrackerPreview extends HTMLElement {
    /* Creates an HTML skeleton and defines the hierachy */
    constructor() {
        super();

        /* Creates shadow DOM */
        const shadow = this.attachShadow({ mode: 'open' });

        /* Creates all elements of the skeleton */
        const wrapper = document.createElement('section'); // outer container div
        const leftSideDiv = document.createElement('div'); // contains title and preview text
        const title = document.createElement('h2');
        const description = document.createElement('p');

        /* Defines the heirachy */
        leftSideDiv.appendChild(title);
        leftSideDiv.appendChild(description);
        wrapper.appendChild(leftSideDiv);
        shadow.appendChild(wrapper);

        /* Apply external styles to the shadow dom */
        const trackerPreviewCSS = document.createElement('link');
        trackerPreviewCSS.setAttribute('rel', 'stylesheet');
        trackerPreviewCSS.setAttribute(
            'href',
            './styles/trackers-preview.css',
        );
        shadow.appendChild(trackerPreviewCSS);

        /* Adds classes to the created elements */
        wrapper.setAttribute('class', TRACKER_PREVIEW_WRAPPER_CLASS);
        leftSideDiv.setAttribute('class', TEXT_WRAPPER_CLASS);

        /**
         * @method populateFields
         * Fills in a preview component with given data.
         * Helper function for control.
         * @param {String} trackerName //name of the tracker
         * @param {String} textEntry //description of the tracker
         */
        this.populateFields = (
            trackerName,
            trackerDescription,
        ) => {
            title.textContent = trackerName
            description.textContent = trackerDescription;

        };

    }
}

customElements.define('tracker-preview', TrackerPreview);

export default TrackerPreview;
