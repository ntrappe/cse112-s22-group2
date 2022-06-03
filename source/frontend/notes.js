// <notes> custom web component
class Notes extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement("template");
        /*let HTMLString = "<ul id='bullet-entries'></ul>";
        const HTMLListValues = ['Value1', 'Value2'];
        HTMLListValues.forEach((value) => {
            bulletEntries.appendChild()
        })
        HTMLString += "</ul>";
        template.innerHTML = HTMLString;

        const bulletEntries = document.getElementById('bullet-entries');
        bulletEntries.appendChild()*/

        template.innerHTML = `
		<ul class="notes-component" id="notes-component"></ul>
        <note-entry></note-entry>`;

        //var text = document.getElementById("entry-content").value;
        //var li = "<li>" + text + "</li>"; 
        
		// create a shadow root for this web component
		this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    
}
customElements.define("notes-component", Notes);

class NoteEntry extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement("template");
        
        template.innerHTML = `
        <input type = "text" id = entry-content"/>
		<li class="note-entry" id="note-entry”/li>`;
    
        this.attachShadow({ mode: "open" });
		// attach cloned content of template to shadow DOM 
		this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
customElements.define("note-entry", NoteEntry);
