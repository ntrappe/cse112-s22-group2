// Class name constants
export const DAILY_LOG_PREVIEW_WRAPPER_CLASS = 'daily-log-preview-wrapper';
export const TEXT_WRAPPER_CLASS = 'text-container';
export const ICONS_WRAPPER_CLASS = 'icon-container';
export const LOG_ICON_CLASS = 'log-icon';
export const PREVIEW_TITLE_CLASS = 'preview-title';
export const PREVIEW_PARAGRAPH_CLASS = 'preview-paragraph';
export const DAILY_LOG_TITLE = 'Daily Log ';

// Preview constants
export const NO_PREVIEW_TEXT = 'No preivew text available.';
const MAX_PREVIEW_LENGTH = 75;

// Icon constants
const TRACKER_ICON = './icons/tracker';
const NOTES_ICON = './icons/notes';
const JOURNAL_ICON = './icons/journal';
const ON = '-icon-on.png';
const OFF = '-icon-off.png';
const NO_TRACKER_FILLED_OUT = 'no trackers filled out';
const NO_NOTES_FILLED_OUT = 'no notes filled out';
const NO_JOURNAL_FILLED_OUT = 'no journal filled out';

/**
 * @module DailyLogPreview
 * Class that renders a brief preview of a daily log
 * @extends HTMLElement
 *
 * @example
 * <daily-log-preview></daily-log-preview>
 */
class DailyLogPreview extends HTMLElement {
    /* Creates an HTML skeleton and defines the hierachy */
    constructor() {
        super();

        /* Creates shadow DOM */
        const shadow = this.attachShadow({ mode: 'open' });

        /* Creates all elements of the skeleton */
        const wrapper = document.createElement('section'); // outer container div
        const leftSideDiv = document.createElement('div'); // contains title and preview text
        const rightSideDiv = document.createElement('div'); // contains the trackers
        const title = document.createElement('h2');
        const preview = document.createElement('p');
        const trackerIcon = document.createElement('img');
        const notesIcon = document.createElement('img');
        const journalIcon = document.createElement('img');

        /* Defines the heirachy */
        leftSideDiv.appendChild(title);
        leftSideDiv.appendChild(preview);
        rightSideDiv.appendChild(trackerIcon);
        rightSideDiv.appendChild(notesIcon);
        rightSideDiv.appendChild(journalIcon);
        wrapper.appendChild(leftSideDiv);
        wrapper.appendChild(rightSideDiv);
        shadow.appendChild(wrapper);

        /* Apply external styles to the shadow dom */
        const dailyLogPreviewCSS = document.createElement('link');
        dailyLogPreviewCSS.setAttribute('rel', 'stylesheet');
        dailyLogPreviewCSS.setAttribute(
            'href',
            './styles/daily-log-preview.css',
        );
        shadow.appendChild(dailyLogPreviewCSS);

        /* Adds classes to the created elements */
        title.setAttribute('class', PREVIEW_TITLE_CLASS);
        preview.setAttribute('class', PREVIEW_PARAGRAPH_CLASS);
        wrapper.setAttribute('class', DAILY_LOG_PREVIEW_WRAPPER_CLASS);
        leftSideDiv.setAttribute('class', TEXT_WRAPPER_CLASS);
        rightSideDiv.setAttribute('class', ICONS_WRAPPER_CLASS);

        /* By default set each icon to its png in off mode */
        trackerIcon.setAttribute('src', `${TRACKER_ICON}${OFF}`);
        trackerIcon.setAttribute('alt', NO_TRACKER_FILLED_OUT);
        notesIcon.setAttribute('src', `${NOTES_ICON}${OFF}`);
        notesIcon.setAttribute('alt', NO_NOTES_FILLED_OUT);
        journalIcon.setAttribute('src', `${JOURNAL_ICON}${OFF}`);
        journalIcon.setAttribute('alt', NO_JOURNAL_FILLED_OUT);
        const icons = rightSideDiv.children;
        for (let iconInd = 0; iconInd < icons.length; iconInd++) {
            const icon = icons[iconInd];
            icon.setAttribute('class', LOG_ICON_CLASS);
        }

        /**
         * @method populateFields
         * Fills in a preview component with given data.
         * Helper function for control.
         * @param {String} dateOfEntry in form "mm/dd/yyyy"
         * @param {String} textEntry
         * @param {Boolean} didTrackers
         * @param {Boolean} didNotes
         * @param {Boolean} didJournal
         */
        this.populateFields = (
            dateOfEntry,
            textEntry,
            didTrackers,
            didNotes,
            didJournal,
        ) => {
            title.textContent = DAILY_LOG_TITLE + dateOfEntry;
            preview.textContent = this.getPreviewText(textEntry);

            /* depending on if item done, show icon as on or off by updating src */
            if (didTrackers) {
                trackerIcon.setAttribute('src', `${TRACKER_ICON}${ON}`);
            } else {
                trackerIcon.setAttribute('src', `${TRACKER_ICON}${OFF}`);
            }
            if (didNotes) {
                notesIcon.setAttribute('src', `${NOTES_ICON}${ON}`);
            } else {
                notesIcon.setAttribute('src', `${NOTES_ICON}${OFF}`);
            }
            if (didJournal) {
                journalIcon.setAttribute('src', `${JOURNAL_ICON}${ON}`);
            } else {
                journalIcon.setAttribute('src', `${JOURNAL_ICON}${OFF}`);
            }
        };

        /**
         * @method getPreviewText
         * Returns string of text displayed on preview.
         * Will cut off beyond certain number of chars.
         * @param {string} textEntry
         * @returns string
         */
        this.getPreviewText = (textEntry) => {
            if (!textEntry) {
                return NO_PREVIEW_TEXT;
            }
            return textEntry.length > MAX_PREVIEW_LENGTH
                ? textEntry.substring(0, MAX_PREVIEW_LENGTH)
                : textEntry;
        };

        /**
         * Returns the date of preview {mm/dd/yyyy}
         * @returns string {mm/dd/yyyy}
         */
        this.getDate = () => {
            const titleText = (title.textContent).split(' ');
            return titleText[2];
        };

        const openLogEvent = new CustomEvent('openLog', {
            bubbles: true, // event listenable outside of container
            composed: true,
            detail: { date: () => this.getDate() },
        });

        this.onclick = () => {
            shadow.dispatchEvent(openLogEvent);
        };
    }
}

customElements.define('daily-log-preview', DailyLogPreview);

export default DailyLogPreview;
