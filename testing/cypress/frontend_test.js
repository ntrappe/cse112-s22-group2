describe("Open Page", () => {
    it("Opens index.html", () => {
        cy.visit('./source/index.html')
    });
});

/**
 * Update: 05-16-22 
 * Commented out because testing old UI
 */
// describe('Check all containers exists', { includeShadowDom: true }, () => {
//     it('main container exists', () => {
//         cy.get('#container').should('exist');
//     });

//     it('left-side-container exists', () => {
//         cy.get('#left-side-container').should('exist');
//     });

//     it('side-nav-container exists', () => {
//         cy.get('#side-nav-container').should('exist');
//     });

//     it('weekly-nav-container exists', () => {
//         cy.get('#weekly-nav-container').should('exist');
//     });

//     it('todo-component-container exists', () => {
//         cy.get('#todo-component-container').should('exist');
//     });

//     it('calendar-component-container exists', () => {
//         cy.get('#calendar-component-container').should('exist');
//     });

// });

// describe('Check if daily log exists', { includeShadowDom: true }, () => {
//     it('daily-log exists', () => {
//         cy.get('#daily-log').should('exist'); 
//     });
// });


