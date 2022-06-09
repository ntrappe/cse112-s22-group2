import DailyLog from '../../source/components/daily-log/daily-log.js';
const dailyLog = new DailyLog();
const TEST_CONTENT_DELETE = 'o{backspace}';
const TEST_CONTENT = 'test content';
const JOURNAL_PLACEHOLDER = 'Click to start typing...';
const PREVIEW_EMPTY = 'No preview text available.';

describe('Open Page', () => {
    it('Opens index.html', () => {
        cy.visit('./source/index.html')
    });
});

describe('Mock a daily log', { includeShadowDom: true }, () => {

    it('daily-log exists', () => {
        cy.get('#new-note-icon').click();
        cy.get('daily-log').should('exist'); 
    });
});

describe('Check all containers exist', { includeShadowDom: true }, () => {
	it('main wrapper exists', () => {
        cy.get('#wrapper').should('exist');
    });
	it('controls container exists', () => {
		cy.get('.control-container').should('exist');
	});
    it('date container exists', () => {
		cy.get('#date-container').should('exist');
	});
    it('trackers container exists', () => {
		cy.get('#tracker-container').should('exist');
	});
    it('notes container exists', () => {
		cy.get('#notes-container').should('exist');
	});
    it('find notes placeholder + check text', () => {
        cy.get('#notes-placeholder').then(($el) => {
            expect($el).to.contain('Click to add a note');
        });
    });
    it('try to add a note', () => {
        cy.get('#notes-placeholder').click();
        cy.get('#list-element').then(($el) => {
            expect($el).to.have.attr('bullet-type', 'default-bullet');
            cy.get('#note-entry').should('exist');
        });
    });
    it('journal container exists', () => {
		cy.get('#journal-container').should('exist');
	});
});

describe('Note container function', { includeShadowDom: true }, () =>{
    beforeEach(() => {
        cy.visit('./source/index.html');
    });
    const NOTES_PLACEHOLDER = 'Click to add a note...';
    it('test click on placeholder', () => {
        cy.get('#new-note-icon').click();
        cy.get('#notes-placeholder').click().then(() => {
            cy.get('#notes-placeholder').should('have.css','display','none');
        });
    });
    it('test create new line for note', () => {
        cy.get('#new-note-icon').click();
        cy.get('#notes-placeholder').click().then(() => {
            cy.get('#note-entry').type('test content {enter}', {force: true}).then(() =>{
                cy.get('#list-element').eq(1).should('exist');
            });
            
        });
    });
    it('test note press enter with empty content', () => {
        cy.get('#new-note-icon').click();
        cy.get('#notes-placeholder').click().then(() => {
            cy.get('#note-entry').type('{enter}', {force: true}).then(() =>{
                cy.get('#list-element').eq(1).should('not.exist');
            });
        });
    });
    it('test delete note function', () => {
        cy.get('#new-note-icon').click();
        cy.get('#notes-placeholder').click().then(() => {
            cy.get('#note-entry').type('{backspace}', {force: true}).then(() => {
                cy.get('#note-entry').should('not.exist');
            });
        });
        cy.get('#notes-placeholder').click().then(() => {
            cy.get('#note-entry').type('test content {enter}', {force: true});
            cy.get('#list-element').eq(1).then(() => {
                cy.get('#note-entry').eq(1).type('{backspace}', {force: true}).then(() => {
                    cy.get('#list-element').eq(1).should('not.exist');
                });
            });
        });
    });
    it('test note placeholder', () => {
        cy.get('#new-note-icon').click();
        cy.get('#notes-placeholder').click().then(() => {
            cy.get('#note-entry').type('{backspace}', {force: true}).then(() => {
                cy.get('#notes-placeholder').should('have.css', 'display', 'block');
                cy.get('#notes-placeholder').contains(NOTES_PLACEHOLDER);
            });
        });
    });
});

describe('Journal function', {includeShadowDom: true}, () =>{
    beforeEach(() => {
        cy.visit('./source/index.html');
    });
    it('test journal content', () =>{
        cy.get('#new-note-icon').click();
        cy.get('#journal-text').type(TEST_CONTENT);
        cy.get('.control-btn').eq(1).click();
        cy.get('daily-log-preview').eq(0).click();
        cy.get('#journal-text').contains(TEST_CONTENT);
        
    });
    it('test journal content', () =>{
        cy.get('#new-note-icon').click();
        cy.get('#journal-text').type(TEST_CONTENT_DELETE);
        cy.get('#journal-text').should('have.attr', 'placeholder', JOURNAL_PLACEHOLDER);
    });
});

describe('control buttons', {includeShadowDom: true}, () =>{
    beforeEach(() => {
        cy.visit('./source/index.html');
    });
    it('test cancel button control', () =>{
        cy.get('#new-note-icon').click();
        cy.get('.control-btn').eq(0).click();
        cy.get('daily-log').should('not.exist');
    });
    it('test save button control', () =>{
        cy.get('#new-note-icon').click();
        cy.get('.control-btn').eq(1).click();
        cy.get('daily-log-preview').eq(0).within(() => {
            cy.get('.preview-paragraph').contains(PREVIEW_EMPTY);
            cy.get('img').eq(1).should('have.attr', 'src', './icons/notes-icon-off.png');
            cy.get('img').eq(2).should('have.attr', 'src', './icons/journal-icon-off.png');
        });
    });
    it('test save button note control', () =>{
        cy.get('#new-note-icon').click();
        cy.get('#notes-placeholder').click();
        cy.get('#note-entry').type(TEST_CONTENT, {force: true});
        cy.get('.control-btn').eq(1).click();
        cy.get('daily-log-preview').eq(0).within(() => {
            cy.get('.preview-paragraph').contains(PREVIEW_EMPTY);
            cy.get('img').eq(1).should('have.attr', 'src', './icons/notes-icon-on.png');
            cy.get('img').eq(2).should('have.attr', 'src', './icons/journal-icon-off.png');
        });
    });
    it('test save button journal control', () =>{
        cy.get('#new-note-icon').click();
        cy.get('#journal-text').type(TEST_CONTENT, {force: true});
        cy.get('.control-btn').eq(1).click();
        cy.get('daily-log-preview').eq(0).within(() => {
            cy.get('img').eq(1).should('have.attr', 'src', './icons/notes-icon-off.png');
            cy.get('img').eq(2).should('have.attr', 'src', './icons/journal-icon-on.png');
        });
    });
    it('test save button note and journal control', () =>{
        cy.get('#new-note-icon').click();
        cy.get('#notes-placeholder').click();
        cy.get('#journal-text').type(TEST_CONTENT, {force: true});
        cy.get('.control-btn').eq(1).click();
        cy.get('daily-log-preview').eq(0).within(() => {
            cy.get('.preview-paragraph').contains(TEST_CONTENT);
            cy.get('img').eq(1).should('have.attr', 'src', './icons/notes-icon-on.png');
            cy.get('img').eq(2).should('have.attr', 'src', './icons/journal-icon-on.png');
        });
    });
});
