describe('Open Page', () => {
    it('Opens index.html', () => {
        cy.visit('./source/index.html')
    });
});

describe('Check contents of header', { includeShadowDom: true }, () => {
    it('header should exist', () => {
        cy.get('header').should('exist');
    });

    it('header should say JOT', () => {
        cy.contains('Jot');
    });
});

describe('Test UI of header', { includeShadowDom: true }, () => {
    it('header text should be white', () => {
        cy.get('h1').should('have.css', 'color', 'rgb(255, 255, 255)');
    });
});

describe('Check all three sections', { includeShadowDom: true }, () => {
    it('section 1: daily log, exists', () => {
        cy.get('#nav-daily-log').should('exist');
    });

    it('section 1 has title daily logs', () => {
        cy.get('#nav-daily-log').then(($el) => {
            expect($el).to.contain('Daily Logs');
        });
    });

    it('section 2: monthly log, exists', () => {
        cy.get('#nav-monthly-log').should('exist');
    });

    it('section 2 has title monthly logs', () => {
        cy.get('#nav-monthly-log').then(($el) => {
            expect($el).to.contain('Monthly Logs');
        });
    });

    it('section 3: progress, exists', () => {
        cy.get('#nav-progress').should('exist');
    });

    it('section 3 has title progress', () => {
        cy.get('#nav-progress').then(($el) => {
            expect($el).to.contain('Progress');
        });
    });

    it('Check that arrow button(s) exist', () => {
        cy.get('.arrow-button').should('exist');
    });

    it('Check that arrow button(s) have one i child with proper classes', () => {
        cy.get('.arrow-button').first().children().should('have.length', 1);
        cy.get('.arrow-button').first().children('i');
        cy.get('.arrow-button').first().children('.fa-solid');
        cy.get('.arrow-button').first().children('.fa-angle-right');
    });
});