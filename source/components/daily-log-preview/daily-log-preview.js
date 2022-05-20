// Class name constants
const DAILY_LOG_PREVIEW_WRAPPER_CLASS = "daily-log-preview-wrapper";
const TEXT_WRAPPER_CLASS = "text-container";
const ICONS_WRAPPER_CLASS = "icon-container";
const TRACKER_DONE_CLASS = "tracker-done";
const TRACKER_NOT_DONE_CLASS = "tracker-not-done";
const DAILY_LOG_TITLE = "Daily Log ";

// Preview constants
const NO_PREVIEW_TEXT = "No preivew text available.";
const MAX_PREVIEW_LENGTH = 75;

// Icon constants
const TRACKER_ICON = "./icons/tracker";
const NOTES_ICON = "./icons/notes";
const JOURNAL_ICON = "./icons/journal";
const ON = "-icon-on.png";
const OFF = "-icon-off.png";
const NO_TRACKER_FILLED_OUT = "no trackers filled out";
const NO_NOTES_FILLED_OUT = "no notes filled out";
const NO_JOURNAL_FILLED_OUT = "no journal filled out";

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
		const shadow = this.attachShadow({ mode: "open" });

		/* Creates all elements of the skeleton */
		const wrapper = document.createElement("section"); // outer container div
		const leftSideDiv = document.createElement("div"); // contains title and preview text
		const rightSideDiv = document.createElement("div"); // contains the trackers
		const title = document.createElement("h2");
		const preview = document.createElement("p");
		const trackerIcon = document.createElement("img");
		const notesIcon = document.createElement("img");
		const journalIcon = document.createElement("img");

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
		const dailyLogPreviewCSS = document.createElement("link");
		dailyLogPreviewCSS.setAttribute("rel", "stylesheet");
		dailyLogPreviewCSS.setAttribute(
			"href",
			"./styles/daily-log-preview.css"
		);
		shadow.appendChild(dailyLogPreviewCSS);

		/* Adds classes to the created elements */
		wrapper.setAttribute("class", DAILY_LOG_PREVIEW_WRAPPER_CLASS);
		leftSideDiv.setAttribute("class", TEXT_WRAPPER_CLASS);
		rightSideDiv.setAttribute("class", ICONS_WRAPPER_CLASS);

		/* By default set each icon to its png in off mode */
		trackerIcon.setAttribute("src", `${TRACKER_ICON}${OFF}`);
		trackerIcon.setAttribute("alt", NO_TRACKER_FILLED_OUT);
		notesIcon.setAttribute("src", `${NOTES_ICON}${OFF}`);
		notesIcon.setAttribute("alt", NO_NOTES_FILLED_OUT);
		journalIcon.setAttribute("src", `${JOURNAL_ICON}${OFF}`);
		journalIcon.setAttribute("alt", NO_JOURNAL_FILLED_OUT);
		const icons = rightSideDiv.children;
		for (let iconInd = 0; iconInd < icons.length; iconInd++) {
			const icon = icons[iconInd];
			icon.setAttribute("class", "log-icon");
		}

		/* A function to fill in the components with data */
		this.populateFields = function (
			dateOfEntry,
			textEntry,
			didTrackers,
			didNotes,
			didJournal
		) {
			title.textContent = DAILY_LOG_TITLE + dateOfEntry;
			preview.textContent = this.getPreviewText(textEntry);

			/* depending on if item done, show icon as on or off by updating src */
			if (didTrackers) {
				trackerIcon.setAttribute("src", `${TRACKER_ICON}${ON}`);
			} else {
				trackerIcon.setAttribute("src", `${TRACKER_ICON}${OFF}`);
			}
			if (didNotes) {
				notesIcon.setAttribute("src", `${NOTES_ICON}${ON}`);
			} else {
				notesIcon.setAttribute("src", `${NOTES_ICON}${OFF}`);
			}
			if (didJournal) {
				journalIcon.setAttribute("src", `${JOURNAL_ICON}${ON}`);
			} else {
				journalIcon.setAttribute("src", `${JOURNAL_ICON}${OFF}`);
			}
		};

		/* A function to get the preview text */
		this.getPreviewText = function (textEntry) {
			if (!textEntry) {
				return NO_PREVIEW_TEXT;
			}
			return textEntry.length > MAX_PREVIEW_LENGTH
				? textEntry.substring(0, MAX_PREVIEW_LENGTH)
				: textEntry;
		};

		/* A function to set the classes of tracker icons based on completion status */
		this.getIconClass = function (isCompleted) {
			return isCompleted ? TRACKER_DONE_CLASS : TRACKER_NOT_DONE_CLASS;
		};
	}
}

customElements.define("daily-log-preview", DailyLogPreview);

export default DailyLogPreview;
