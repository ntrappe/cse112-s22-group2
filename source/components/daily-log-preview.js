/**
 * Class that renders a brief preview of a daily log
 * @extends HTMLElement
 *
 * @example
 * <daily-log-preview
 *   dateOfEntry="04/22/2022"
 *   textEntry="Hello World"
 *   didTrackers=False
 *   didNotes=False
 *   didJournal=False
 * />
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
		const trackerIcon = document.createElement("svg");
		const notesIcon = document.createElement("svg");
		const journalIcon = document.createElement("svg");

		/* Defines the heirachy */
		leftSideDiv.appendChild(title);
		leftSideDiv.appendChild(preview);
		rightSideDiv.appendChild(trackerIcon);
		rightSideDiv.appendChild(notesIcon);
		rightSideDiv.appendChild(journalIcon);
		wrapper.appendChild(leftSideDiv);
		wrapper.appendChild(rightSideDiv);
		shadow.appendChild(wrapper);

		this.populateFields = function () {
			title.textContent = "Hiiii";
		};
	}
} /* DailyLogPreview */

customElements.define("daily-log-preview", DailyLogPreview);
const dailyLogContainer = document.getElementById("custom-element-test");
const dailyLogPreview = document.createElement("daily-log-preview");
dailyLogContainer.appendChild(dailyLogPreview);
dailyLogPreview.populateFields();
