import * as locStor from '../../source/backend/storage.js';
import * as helpers from '../../source/components/control/control-helpers.js';

const EXIT_SUCCESS = 1;
const EXIT_FAILURE = 0;

describe('Open Page', () => {
    it('Opens index.html', () => {
        cy.visit('./source/index.html')
    });
});

describe('Mock a fake environment', { includeShadowDom: true }, () => {
    const date1 = 'Monday, May 1, 2000';
    const date2 = 'Tuesday, May 9, 2000';
    const date3 = 'Saturday, November 25, 2000';
    const journal1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const journal2 = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    const journal3 = 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
    it('Clear local storage + previews', () => {
        locStor.deleteAll();
        cy.get('#log-list').should('exist');
        cy.get('#log-list').then(($el) => {
            while(($el).lastElementChild) {
                ($el).removeChild(($el).lastElementChild)
            }
        });
    });

    it('Check that inbox is empty', () => {
        cy.get('#log-count-display').then(($el) => {
            expect($el).to.contain('0 logs');
        });
    });

    it('Create three logs in storage', () => {
        let success = EXIT_FAILURE;
        success = locStor.addLog(date1, [], journal1);
        success = locStor.addLog(date2, [], journal2);
        success = locStor.addLog(date3, [], journal3);
        expect(success).to.equal(EXIT_SUCCESS);
    });

});

describe('User creates 1 log', { includeShadowDom: true }, () => {
    const journal = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    let date = '';

    it('Clear local storage + previews', () => {
        locStor.deleteAll();
        cy.get('#log-list').should('exist');
        cy.get('#log-list').then(($el) => {
            while(($el).lastElementChild) {
                ($el).removeChild(($el).lastElementChild)
            }
        });
    });

    it('Create new log', () => {
        cy.get('#new-note-btn').click();
    });

    it('Get log date', () => {
        cy.get('#date-button').then(($el) => {
            date = $el.text();
            expect(date).to.contain('2022');
        });
    });

    it('Title should be \"New Daily Log\"', () => {
        cy.get('daily-log').get('h2').then(($el) => {
            expect($el).to.contain('New Daily Log');
        });
    });

    it('Type some text into journal ', () => {
        cy.get('daily-log').get('#journal-text').then(($el) => {
            expect($el).to.have.attr('placeholder', 'Click to start typing...');
        });
        cy.get('daily-log').get('#journal-text').type(journal);
        cy.get('daily-log').get('#journal-text').then(($el) => {
            const journalContents = $el.val();
            expect(journalContents).to.include(journal);
        });
    });

    it('Save log + check if on page', () => {
        cy.get('daily-log').get('.control-btn').last().then(($el) => {
            expect($el).to.contain('Save');
        });

        cy.get('daily-log').get('.control-btn').last().click();
    });

    it('Look for a preview that matches', () => {
        const previewDate = helpers.convertPreviewDate(date);
        cy.get('daily-log-preview').first().get('h2').then(($el) => {
            expect($el).to.contain(previewDate);
        });
    });

    // it('Open log', () => {
    //     cy.get('daily-log-preview').first().click();
    // });

    // it('Title should be \"Daily Log\"', () => {
    //     cy.get('daily-log').get('h2').then(($el) => {
    //         expect($el).to.contain('Daily Log');
    //     });
    // });

    // it('Check that date is the same', () => {
    //     cy.get('#date-button').should('have.css', 'border-radius', '5px');
    //     // cy.contains('#date-button', '2022');
    // });

    // it('Click on preview and open log', () => {
    //     cy.get('daily-log').get('#journal-text').then(($el) => {
    //         const journalContents = $el.val();
    //         expect(journalContents).to.include(journal);
    //     });
    // });
});
