import DailyLog from '../../source/components/daily-log/daily-log.js';
const dailyLog = new DailyLog();

describe("Open Page", () => {
    it("Opens index.html", () => {
        cy.visit('./source/inbox.html')
    });
});

describe('Create a daily log', { includeShadowDom: true }, () => {
    it('main container exists', () => {
        cy.get('main').should('exist');
    });

    it('add daily log to main', () => {
        cy.get('main').then(($el) => {
            ($el).append(dailyLog);
            cy.get('daily-log').should('exist');
        });
    });
});

describe('Check default contents of daily log', { includeShadowDom: true }, () => {
    it('title should be New Daily Log', () => {
        cy.get('h2').then(($el) => {
            expect($el).to.contain('New Daily Log');
        });
    });

    it('date should be today\'s date', () => {
        cy.get('#date-button').then(($el) => {
            const date = new Date();
            expect($el).to.contain(date.getDate());
            expect($el).to.contain(date.getFullYear());
        });
    });

    it('journal should have placeholder text', () => {
        // not text content but placeholder attribute
        cy.get('#journal-text').then(($el) => {
            expect($el).to.have.attr('placeholder', 'Click to start typing...');
        });
    });

    it('note should have placeholder text', () => {
        cy.get('#notes-placeholder').then(($el) => {
            expect($el).to.contain('Click to add a note...');
        });

    });

    it('cancel button and save button exist', () => {
        cy.get('.control-btn');
    });

    it('tracker button exist', () => {
        cy.get('#tracker-container');
    });

    it('note component exist', () => {
        cy.get('#notes-container');
        cy.get('#notes-container').find('h3');
        cy.get('#notes-placeholder');
    });

    it('journal component exist', () => {
        cy.get('#journal-container');
        cy.get('#journal-text');
    });
});

describe('Note container function', { includeShadowDom: true }, () =>{

    it('test click on placeholder', () => {
        cy.get('#notes-placeholder').click();
    });

    it('test content block create', () =>{
        cy.get('#notes-placeholder')
        .click()
        .then(() => {
            cy.get('#notes-container').find('#notes-placeholder').should('have.css', 'display', 'none');
        });
        cy.get('note-container').find('span');
        cy.get('note-container > span').eq(0).type('testing');
        cy.get('note-container > span').eq(0).type('Cypress.io{enter}')
        .then(() => {
            cy.get('note-container > span').eq(1);
        });
    });
    it('test content block delete', () => {
        cy.get('note-container > span').eq(1).type('Cypress.io{backspace}')
        .then(() => {
            cy.get('note-container > span').eq(1).should('not.exist');
        });
    });
});

describe('Journal function', {includeShadowDom: true}, () =>{
    const test_content = 'testing content';

    it('call function to set contents', () => {
        dailyLog.populateFields('', '', [], test_content);
    });

    it('testing content', () =>{
        cy.get('#journal-text').contains(test_content);
    })
});

describe('Set and check daily log contents', { includeShadowDom: true }, () => {
    const newTitle = 'Daily Log';
    const newDate = 'Sunday, May 21, 2022';
    const newJournalEntry = 'So this is a journal entry and it could be very long';

    it('call function to set contents', () => {
        dailyLog.populateFields(newTitle, newDate, [], newJournalEntry);
    });

    it('title shouldn\'t have NEW anymore', () => {
        cy.get('h2').then(($el) => {
            expect($el).to.not.contain('New');
        });
    });

    it('date should\'ve been overwritten', () => {
        // not text content but placeholder attribute
        cy.get('#date-button').then(($el) => {
            expect($el).to.contain(newDate);
        });
    });

    it('journal placeholder text should\'ve been overwritten', () => {
        // not text content but placeholder attribute
        cy.get('#journal-text').then(($el) => {
            expect($el).to.contain(newJournalEntry);
        });
    });
});