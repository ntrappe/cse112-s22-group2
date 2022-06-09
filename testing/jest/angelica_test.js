import DailyLog from '../../source/components/daily-log/daily-log.js';
const dailyLog = new DailyLog();

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
