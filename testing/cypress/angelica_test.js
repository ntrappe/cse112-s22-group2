import DailyLog from '../../source/components/daily-log/daily-log.js';
const dailyLog = new DailyLog();

describe("Open Page", () => {
    it("Opens index.html", () => {
        cy.visit('./source/inbox.html')
    });
});

describe('Check if daily log component exists', { includeShadowDom: true }, () => {
    it('daily-log exists', () => {
        cy.get('daily-log').should('exist'); 
    });
});

describe("Check all containers exist", { includeShadowDom: true }, () => {
	it('main wrapper exists', () => {
        cy.get('#wrapper').should('exist');
    });
	it('controls container exists', () => {
		cy.get(".control-container").should('exist');
	});
    it('heading container exists', () => {
		cy.get("#heading-container").should('exist');
	});
    it('date container exists', () => {
		cy.get("#date-container").should('exist');
	});
    it('trackers container exists', () => {
		cy.get("#tracker-container").should('exist');
	});
    it('notes container exists', () => {
		cy.get("#notes-container").should('exist');
	});
    it('journal container exists', () => {
		cy.get("#journal-container").should('exist');
	});
    it('svg exists', () => {
		cy.get("svg").should('have.css', 'width', '10px');   
        //.should('have.attr', 'width', '10')
        //should('have.attr', 'height', '20')
    });
});