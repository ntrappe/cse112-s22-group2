const DAILY_LOG_PREVIEW_WRAPPER_CLASS = "daily-log-preview-wrapper";
const ICONS_WRAPPER_CLASS = "icons-wrapper-class";
const TRACKER_DONE_CLASS = "tracker-done";
const TRACKER_NOT_DONE_CLASS = "tracker-not-done";
const DAILY_LOG_TITLE = "Daily Log ";
const NO_PREVIEW_TEXT = "No preivew text available.";
const MAX_PREVIEW_LENGTH = 75;

/**
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
		const trackerIcon = document.createElement("link");
		const notesIcon = document.createElement("link");
		const journalIcon = document.createElement("link");

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
		dailyLogPreviewCSS.setAttribute("href", "styles/daily-log-preview.css");
		shadow.appendChild(dailyLogPreviewCSS);

		/* Adds classes to the created elements */
		wrapper.setAttribute("class", DAILY_LOG_PREVIEW_WRAPPER_CLASS);
		rightSideDiv.setAttribute("class", ICONS_WRAPPER_CLASS);

		/* Adds SVGs */
		trackerIcon.setAttribute("href", "images/tracker_icon.svg");
		notesIcon.setAttribute("href", "images/notes_icon.svg");
		journalIcon.setAttribute("href", "images/journal_icon.svg");
		const icons = rightSideDiv.children;
		for (let iconInd = 0; iconInd < icons.length; iconInd++) {
			const icon = icons[iconInd];
			icon.setAttribute("type", "image/svg+xml");
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
			trackerIcon.setAttribute("class", this.getIconClass(didTrackers));
			notesIcon.setAttribute("class", this.getIconClass(didNotes));
			journalIcon.setAttribute("class", this.getIconClass(didJournal));
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
} /* DailyLogPreview */

/* Sample code of how to render a custom component */
const data = [
	{
		dateOfEntry: "04/17/2022",
		textEntry:
			"We are no strangers to love. You know the rules, and so do I. A full commitment's what I'm thinking of, you wouldn't get this from any other guy",
		didTrackers: false,
		didNotes: true,
		didJournal: false,
	},
	{
		dateOfEntry: "04/30/2022",
		textEntry: "",
		didTrackers: true,
		didNotes: false,
		didJournal: true,
	},
];

customElements.define("daily-log-preview", DailyLogPreview);

const dailyLogContainer = document.getElementById("custom-element-test");
data.forEach(function (element) {
	const dailyLogPreview = document.createElement("daily-log-preview");
	dailyLogContainer.appendChild(dailyLogPreview);
	dailyLogPreview.populateFields(
		element.dateOfEntry,
		element.textEntry,
		element.didTrackers,
		element.didNotes,
		element.didJournal
	);
});
