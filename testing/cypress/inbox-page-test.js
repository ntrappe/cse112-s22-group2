// Inital No Actvity Tests
describe('Fresh Entry, No Activity Tests', () => {
    beforeEach(() => {
        cy.visit('./source/index.html');
    });

    it('Find Header/Footer and visible', () => {
        cy.get('header').should('be.visible');
        cy.get('footer').should('be.visible');
    });

    it('Check if on edit mode', () => {
        cy.get('#edit-btn').should('have.text', 'Edit');
    });

    it('Ensure that correct log counter is displayed', () => {
        cy.get('#log-count-display').then(($el) => {
            expect($el).to.contain('logs');
        });
    });

    it('Ensure that new note button is showing', () => {
        cy.get('#new-note-btn').should('be.visible');
    });

    it('Ensure that delete buttons are hidden', () => {
        cy.get('#delete-all-btn').should('have.css', 'display', 'none');
        cy.get('#delete-selected-btn').should('have.css', 'display', 'none');
    });

    // it('Ensure that all input buttons are hidden and unchecked', () => {
    //     cy.get('#log-list > li > input').should('not.be.visible');
    //     cy.get('#log-list > li > input').should('not.be.checked');
    // });

    it('Ensure Both Popup Modals are Hidden', () => {
        cy.get('popup-modal').should('have.css', 'display', 'none');
    });
});

// Edit Mode Tests
describe('Edit Mode Tests', () => {
    beforeEach(() => {
        cy.visit('./source/index.html');
        // enter edit mode
        cy.get('#edit-btn').click();
    });

    it('Edit Mode Entered: Edit now says Cancel', () => {
        cy.get('#edit-btn').should('have.text', 'Cancel');
    });

    it('Edit Mode Entered: Check Delete Buttons Show Up', () => {
        cy.get('#delete-all-btn').should('have.css', 'display', 'block');
        cy.get('#delete-selected-btn').should('have.css', 'display', 'block');
    });

    // it('Edit Mode Entered:: All input buttons are displayed and unchecked', () => {
    //     cy.get('#log-list > li > input').should('be.visible');
    //     cy.get('#log-list > li > input').should('not.be.checked');
    // });

    it('Edit Mode Entered: Find Header/Footer and visible', () => {
        cy.get('header').should('be.visible');
        cy.get('footer').should('be.visible');
    });

    it('Edit Mode Entered: Ensure that log counter is hidden', () => {
        cy.get('#inbox-info').should('not.be.visible');
    });

    it('Edit Mode Entered: Ensure that new note button is showing', () => {
        cy.get('#new-note-btn').should('not.be.visible');
    });

    it('Edit Mode Entered: Ensure Both Popup Modals are Hidden', () => {
        cy.get('popup-modal').should('have.css', 'display', 'none');
    });
});

// Click Checkbox Tests
// describe('Click Checkbox Tests', () => {
//     beforeEach(() => {
//         cy.visit('./source/inbox.html');
//         // enter edit mode
//         cy.get('#edit-btn').click();
//     });

//     it('Clicking <li> checks/unchecks checkbox ', () => {
//         cy.get('#log-list > li:first-of-type').click();
//         cy.get('#log-list > li:first-of-type > input:first-of-type').should('be.checked');
//         cy.get('#log-list > li:first-of-type').click();
//         cy.get('#log-list > li:first-of-type > input:first-of-type').should('not.be.checked');
//     });

//     it('Clicking <input> checks checkbox', () => {
//         cy.get('#log-list > li:first-of-type > input:first-of-type').click();
//         cy.get('#log-list > li:first-of-type > input:first-of-type').should('be.checked');
//         cy.get('#log-list > li:first-of-type > input:first-of-type').click();
//         cy.get('#log-list > li:first-of-type > input:first-of-type').should('not.be.checked');
//     });

//     it('Clicking <daily-log-preview> checks checkbox', () => {
//         cy.get('#log-list > li:first-of-type > daily-log-preview').click();
//         cy.get('#log-list > li:first-of-type > input:first-of-type').should('be.checked');
//         cy.get('#log-list > li:first-of-type > daily-log-preview').click();
//         cy.get('#log-list > li:first-of-type > input:first-of-type').should('not.be.checked');
//     });

//     it('Clicking interchangable between <input> and <li> checks checkbox', () => {
//         cy.get('#log-list > li:first-of-type').click();
//         cy.get('#log-list > li:first-of-type > input:first-of-type').should('be.checked');
//         cy.get('#log-list > li:first-of-type > input:first-of-type').click();
//         cy.get('#log-list > li:first-of-type > input:first-of-type').should('not.be.checked');

//         cy.get('#log-list > li:first-of-type > input:first-of-type').click();
//         cy.get('#log-list > li:first-of-type > input:first-of-type').should('be.checked');
//         cy.get('#log-list > li:first-of-type').click();
//         cy.get('#log-list > li:first-of-type > input:first-of-type').should('not.be.checked');
//     });

//     it('Input Clicked: Edit now says Cancel', () => {
//         cy.get('#edit-btn').should('have.text', 'Cancel');
//     });

//     it('Input Clicked: Check Delete Buttons Show Up', () => {
//         cy.get('#delete-all-btn').should('have.css', 'display', 'block');
//         cy.get('#delete-selected-btn').should('have.css', 'display', 'block');
//     });

//     it('Input Clicked: All input buttons are displayed and unchecked', () => {
//         cy.get('#log-list > li > input').should('be.visible');
//         cy.get('#log-list > li > input').should('not.be.checked');
//     });

//     it('Input Clicked: Find Header/Footer and visible', () => {
//         cy.get('header').should('be.visible');
//         cy.get('footer').should('be.visible');
//     });

//     it('Input Clicked: Ensure that log counter is hidden', () => {
//         cy.get('#inbox-info').should('not.be.visible');
//     });

//     it('Input Clicked: Ensure that new note button is showing', () => {
//         cy.get('#new-note-btn').should('not.be.visible');
//     });

//     it('Input Clicked: Ensure Both Popup Modals are Hidden', () => {
//         cy.get('popup-modal').should('have.css', 'display', 'none');
//     });

//     it('Input Clicked: Deleted Selected Modal only clickable when >= 1 input checked', () => {
//         // not clickable when 0 inputs checked
//         cy.get('#delete-selected-btn').click();
//         cy.get('#delete-selected-modal').should('have.css', 'display', 'none');

//         // clickable when at least 1 input is checked
//         cy.get('#log-list > li:first-of-type').click();
//         cy.get('#delete-selected-btn').click();
//         cy.get('#delete-selected-modal').should('have.css', 'display', 'block');
//     });

//     it('Input Clicked: Click inputs then cancel then click edit --> checkboxes unchecked', () => {
//         // click some inputs
//         cy.get('#log-list > li:first-of-type').click();
//         cy.get('#log-list > li:first-of-type > input:first-of-type').should('be.checked');

//         // cancel
//         cy.get('#edit-btn').click();

//         // edit and check input states
//         cy.get('#edit-btn').click();
//         cy.get('#log-list input').should('not.be.checked');
//     });
// });

describe('Check PopupModals Content', { includeShadowDom: true }, () => {
    beforeEach(() => {
        cy.visit('./source/index.html');
        // enter edit mode
        cy.get('#edit-btn').click();
    });

    it('Check Delete All Modal Show Up', () => {
        cy.get('#delete-all-btn').click().then(() => {
            cy.get('#delete-all-modal').shadow().find('#modal-backdrop').should('be.visible');
            cy.get('#delete-all-modal').shadow().find('#modal-container').should('be.visible');
            cy.get('#delete-all-modal').shadow().find('#buttons-container').should('be.visible');
            cy.get('#delete-all-modal').shadow().find('#modal-delete-all-btn').should('be.visible');
            cy.get('#delete-all-modal').shadow().find('#modal-cancel-btn').should('be.visible');
        });
    });

    // it('Check Delete Selected Modal Show Up', () => {
    //     cy.get('#log-list > li:first-of-type > input:first-of-type').click();
    //     cy.get('#delete-selected-btn').click().then(() => {
    //         cy.get('#delete-selected-modal').shadow()
    //             .find('#modal-backdrop').should('be.visible');
    //         cy.get('#delete-selected-modal').shadow()
    //             .find('#modal-container').should('be.visible');
    //         cy.get('#delete-selected-modal').shadow()
    //             .find('#buttons-container').should('be.visible');
    //         cy.get('#delete-selected-modal').shadow()
    //             .find('#modal-delete-all-btn').should('be.visible');
    //         cy.get('#delete-selected-modal').shadow()
    //             .find('#modal-cancel-btn').should('be.visible');
    //     });
    // });

    // it('Ensure delete selected modal displays correct text', () => {
    //     cy.get('#log-list > li:first-of-type > input:first-of-type').click();
    //     cy.get('#delete-selected-btn').click();
    //     cy.get('#delete-selected-modal').shadow().find('#confirmation-text')
    //         .should('have.text', 'Do you want to delete 1 daily logs?');
    // });

    // it('Ensure delete selected modal displays correct text twice', () => {
    //     cy.get('#log-list > li:first-of-type > input:first-of-type').click();
    //     cy.get('#delete-selected-btn').click();
    //     cy.get('#delete-selected-modal').shadow().find('#confirmation-text')
    //         .should('have.text', 'Do you want to delete 1 daily logs?');

    //     // cypress clicks center of element and the center of the backdrop is the modal container
    //     // which is unclickable, so click somwhere in the backdrop (not center)
    //     cy.get('#delete-selected-modal').shadow().find('#modal-backdrop').click(1, 1);
    //     cy.get('#log-list > li:nth-last-of-type(1) > input:first-of-type').click();

    //     cy.get('#delete-selected-btn').click();
    //     cy.get('#delete-selected-modal').shadow().find('#confirmation-text')
    //         .should('have.text', 'Do you want to delete 2 daily logs?');
    // });

    it('Ensure delete all modal displays correct text', () => {
        cy.get('#delete-all-btn').click();
        cy.get('#delete-all-modal').shadow().find('#confirmation-text')
            .should('have.text', 'Do you want to delete all daily logs?');
    });
});

describe('Close PopupModals', { includeShadowDom: true }, () => {
    beforeEach(() => {
        cy.visit('./source/index.html');
        // enter edit mode
        cy.get('#edit-btn').click();
    });

    it('Close Delete All Modal: Delete clicked', () => {
        cy.get('#delete-all-btn').click().then(() => {
            cy.get('#delete-all-modal').shadow().find('#modal-delete-all-btn').click();
            cy.get('#delete-all-modal').shadow().find('#modal-backdrop').should('not.be.visible');
            cy.get('#delete-all-modal').shadow().find('#modal-container').should('not.be.visible');
            cy.get('#delete-all-modal').shadow().find('#buttons-container')
                .should('not.be.visible');
            cy.get('#delete-all-modal').shadow().find('#modal-delete-all-btn')
                .should('not.be.visible');
            cy.get('#delete-all-modal').shadow().find('#modal-cancel-btn').should('not.be.visible');
        });
    });

    it('Close Delete All Modal: Cancel clicked', () => {
        cy.get('#delete-all-btn').click().then(() => {
            cy.get('#delete-all-modal').shadow().find('#modal-cancel-btn').click();
            cy.get('#delete-all-modal').shadow().find('#modal-backdrop').should('not.be.visible');
            cy.get('#delete-all-modal').shadow().find('#modal-container').should('not.be.visible');
            cy.get('#delete-all-modal').shadow().find('#buttons-container')
                .should('not.be.visible');
            cy.get('#delete-all-modal').shadow().find('#modal-delete-all-btn')
                .should('not.be.visible');
            cy.get('#delete-all-modal').shadow().find('#modal-cancel-btn').should('not.be.visible');
        });
    });

    it('Close Delete All Modal: Background clicked', () => {
        cy.get('#delete-all-btn').click().then(() => {
            // click somwhere in the backdrop (not center)
            cy.get('#delete-all-modal').shadow().find('#modal-backdrop').click(1, 1);
            cy.get('#delete-all-modal').shadow().find('#modal-backdrop').should('not.be.visible');
            cy.get('#delete-all-modal').shadow().find('#modal-container').should('not.be.visible');
            cy.get('#delete-all-modal').shadow().find('#buttons-container')
                .should('not.be.visible');
            cy.get('#delete-all-modal').shadow().find('#modal-delete-all-btn')
                .should('not.be.visible');
            cy.get('#delete-all-modal').shadow().find('#modal-cancel-btn').should('not.be.visible');
        });
    });

    it('Close Delete All Modal: Modal Container clicked (modal stays open)', () => {
        cy.get('#delete-all-btn').click().then(() => {
            cy.get('#delete-all-modal').shadow().find('#modal-container').click();
            cy.get('#delete-all-modal').shadow().find('#modal-backdrop').should('be.visible');
            cy.get('#delete-all-modal').shadow().find('#modal-container').should('be.visible');
            cy.get('#delete-all-modal').shadow().find('#buttons-container')
                .should('be.visible');
            cy.get('#delete-all-modal').shadow().find('#modal-delete-all-btn')
                .should('be.visible');
            cy.get('#delete-all-modal').shadow().find('#modal-cancel-btn').should('be.visible');
        });
    });

    // it('Close Delete Selected Modal: Delete clicked', () => {
    //     cy.get('#log-list > li:nth-last-of-type(1) > input:first-of-type').click();
    //     cy.get('#delete-selected-btn').click().then(() => {
    //         cy.get('#delete-selected-modal').shadow().find('#modal-delete-all-btn').click();
    //         cy.get('#delete-selected-modal').shadow().find('#modal-backdrop')
    //             .should('not.be.visible');
    //         cy.get('#delete-selected-modal').shadow().find('#modal-container')
    //             .should('not.be.visible');
    //         cy.get('#delete-selected-modal').shadow().find('#buttons-container')
    //             .should('not.be.visible');
    //         cy.get('#delete-all-modal').shadow().find('#modal-delete-all-btn')
    //             .should('not.be.visible');
    //         cy.get('#delete-selected-modal').shadow().find('#modal-cancel-btn')
    //             .should('not.be.visible');
    //     });
    // });

    // it('Close Delete Selected Modal: Cancel clicked', () => {
    //     cy.get('#log-list > li:nth-last-of-type(1) > input:first-of-type').click();
    //     cy.get('#delete-selected-btn').click().then(() => {
    //         cy.get('#delete-selected-modal').shadow().find('#modal-cancel-btn').click();
    //         cy.get('#delete-selected-modal').shadow().find('#modal-backdrop')
    //             .should('not.be.visible');
    //         cy.get('#delete-selected-modal').shadow().find('#modal-container')
    //             .should('not.be.visible');
    //         cy.get('#delete-selected-modal').shadow().find('#buttons-container')
    //             .should('not.be.visible');
    //         cy.get('#delete-selected-modal').shadow().find('#modal-delete-all-btn')
    //             .should('not.be.visible');
    //         cy.get('#delete-selected-modal').shadow().find('#modal-cancel-btn')
    //             .should('not.be.visible');
    //     });
    // });

    // it('Close Delete Selected Modal: Background clicked', () => {
    //     cy.get('#log-list > li:nth-last-of-type(1) > input:first-of-type').click();
    //     cy.get('#delete-selected-btn').click().then(() => {
    //         // click somwhere in the backdrop (not center)
    //         cy.get('#delete-selected-modal').shadow().find('#modal-backdrop').click(1, 1);
    //         cy.get('#delete-selected-modal').shadow().find('#modal-backdrop')
    //             .should('not.be.visible');
    //         cy.get('#delete-selected-modal').shadow().find('#modal-container')
    //             .should('not.be.visible');
    //         cy.get('#delete-selected-modal').shadow().find('#buttons-container')
    //             .should('not.be.visible');
    //         cy.get('#delete-selected-modal').shadow().find('#modal-delete-all-btn')
    //             .should('not.be.visible');
    //         cy.get('#delete-selected-modal').shadow().find('#modal-cancel-btn')
    //             .should('not.be.visible');
    //     });
    // });

    // it('Close Delete Selected Modal: Modal Container clicked (modal stays open)', () => {
    //     cy.get('#log-list > li:nth-last-of-type(1) > input:first-of-type').click();
    //     cy.get('#delete-selected-btn').click().then(() => {
    //         cy.get('#delete-selected-modal').shadow().find('#modal-container').click();
    //         cy.get('#delete-selected-modal').shadow().find('#modal-backdrop').should('be.visible');
    //         cy.get('#delete-selected-modal').shadow().find('#modal-container').should('be.visible');
    //         cy.get('#delete-selected-modal').shadow().find('#buttons-container')
    //             .should('be.visible');
    //         cy.get('#delete-selected-modal').shadow().find('#modal-delete-all-btn')
    //             .should('be.visible');
    //         cy.get('#delete-selected-modal').shadow().find('#modal-cancel-btn')
    //             .should('be.visible');
    //     });
    // });
});
