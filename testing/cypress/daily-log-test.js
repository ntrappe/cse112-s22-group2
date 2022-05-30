import DailyLog from '../../source/components/daily-log/daily-log.js';
const dailyLog = new DailyLog();

describe("Open Page", () => {
    it("Opens index.html", () => {
        cy.visit('./source/inbox.html')
    });
});

// describe('Create a daily log', { includeShadowDom: true }, () => {
//     it('main container exists', () => {
//         cy.get('main').should('exist');
//     });

//     it('add daily log to main', () => {
//         cy.get('main').then(($el) => {
//             ($el).append(dailyLog);
//             cy.get('daily-log').should('exist');
//         });
//     });
// });

// describe('Check default contents of daily log', { includeShadowDom: true }, () => {
//     it('title should be New Daily Log', () => {
//         cy.get('h2').then(($el) => {
//             expect($el).to.contain('New Daily Log');
//         });
//     });

//     it('date should be today\'s date', () => {
//         cy.get('#date-button').then(($el) => {
//             const date = new Date();
//             expect($el).to.contain(date.getDate());
//             expect($el).to.contain(date.getFullYear());
//         });
//     });

//     it('journal should have placeholder text', () => {
//         // not text content but placeholder attribute
//         cy.get('#journal-text').then(($el) => {
//             expect($el).to.have.attr('placeholder', 'Click to start typing...');
//         });
//     });
// });

// describe('Set and check daily log contents', { includeShadowDom: true }, () => {
//     const newTitle = 'Daily Log';
//     const newDate = 'Sunday, May 21, 2022';
//     const newJournalEntry = 'So this is a journal entry and it could be very long';

//     it('call function to set contents', () => {
//         dailyLog.populateFields(newTitle, newDate, [], newJournalEntry);
//     });

//     it('title shouldn\'t have NEW anymore', () => {
//         cy.get('h2').then(($el) => {
//             expect($el).to.not.contain('New');
//         });
//     });

//     it('date should\'ve been overwritten', () => {
//         // not text content but placeholder attribute
//         cy.get('#date-button').then(($el) => {
//             expect($el).to.contain(newDate);
//         });
//     });

//     it('journal placeholder text should\'ve been overwritten', () => {
//         // not text content but placeholder attribute
//         cy.get('#journal-text').then(($el) => {
//             expect($el).to.contain(newJournalEntry);
//         });
//     });
// });