describe('Open Page', () => {
	it('Opens inbox.html', () => {
		cy.visit('./source/inbox.html');
	});
});

// describe('Find Elements', { includeShadowDom: true }, () => {
//     it('Get element X', () => {
//         cy.get('header');
//         cy.get('footer');
//     });
// });

// describe('Find Elements by id', { includeShadowDom: true }, () => {
// 	it('Finds daily log inbox edit button', () => {
// 		cy.get('#edit-btn');
// 	});
// 	it('Finds daily log inbox new note icon', () => {
// 		cy.get('#new-note-btn');
// 	});
//     it('Find Pop up Modal', () => {
//         cy.get('popup-modal').should('have.css', 'display', 'none');
//     });
// });

// describe('Check Edit Button Controls', { includeShadowDom: true }, () => {
//     it('Check Edit Button Init State', () => {
//         cy.get('#edit-btn');
//     });
//     it('Check Delete Buttons Init State', () => {
//         cy.get('#delete-all-btn').should('have.css', 'display', 'none');
//         cy.get('#delete-selected-btn').should('have.css', 'display', 'none');
//     });
//     it('Check Delete Button Show Up', () => {
//         cy.get('#edit-btn')
//         .click()
//         .then (() => {
//             cy.get('#delete-all-btn').should('have.css', 'display', 'block');
//             cy.get('#delete-selected-btn').should('have.css', 'display', 'block');
//         });
//     });
// });

// describe('Check Delete All Modal', { includeShadowDom: true }, () => {
//     beforeEach(() => {
//         cy.visit('./source/inbox.html');
//     });
//     it('Check Delete All Modal Exist', () => {
//         cy.get('#delete-all-modal');
//     });
    
//     it('Check Delete All Modal Show Up', () => {
//         cy.get('#edit-btn').click();
//         cy.get('#delete-all-btn')
//         .click()
//         .then(() => {
//             cy.get('#modal-backdrop');
//             cy.get('#modal-container');
//             cy.get('#buttons-container');
//             cy.get('#modal-delete-all-btn');
//             cy.get('#modal-cancel-btn');
//         });
//     });
// });

