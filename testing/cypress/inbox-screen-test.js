import DailyLogPreview, { 
    NO_PREVIEW_TEXT,
    DAILY_LOG_TITLE,
    DAILY_LOG_PREVIEW_WRAPPER_CLASS,
    PREVIEW_TITLE_CLASS,
    PREVIEW_PARAGRAPH_CLASS,
    TEXT_WRAPPER_CLASS, 
    ICONS_WRAPPER_CLASS,
    LOG_ICON_CLASS
} from '../../source/components/daily-log-preview/daily-log-preview';

const dailyLogPreviewNormal = new DailyLogPreview();
const dailyLogPreviewNoJournal = new DailyLogPreview();

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
        cy.contains('JOT');
    });
});

describe('Creates a daily log preview', { includeShadowDom: true }, () => {
    it('should find main container by id', () => {
        cy.get('#main').should('exist');
    });
    it('adds daily log preview to main', () => {
        cy.get('#main').then(($el) => {
            ($el).append(dailyLogPreviewNormal);
            cy.get('daily-log-preview').should('exist');
        });
    });
});

describe('Checks for the scaffold of each preview wrapper', { includeShadowDom: true }, () => {
    it('should find at least one wrapper by classname', () => {
        cy.get(`.${DAILY_LOG_PREVIEW_WRAPPER_CLASS}`).should('exist');
    });
    it('should find a child of class text-container under wrapper', () => {
        cy.get(`.${DAILY_LOG_PREVIEW_WRAPPER_CLASS}`).first().children(`.${TEXT_WRAPPER_CLASS}`);
    });
    it('should find a child of class icon-container under wrapper', () => {
        cy.get(`.${DAILY_LOG_PREVIEW_WRAPPER_CLASS}`).first().children(`.${ICONS_WRAPPER_CLASS}`);
    });
    it('should find 2 children, one h2 and one p under text container', () => {
        cy.get(`.${TEXT_WRAPPER_CLASS}`).first().children().should('have.length', 2);
        cy.get(`.${TEXT_WRAPPER_CLASS}`).first().children(`h2.${PREVIEW_TITLE_CLASS}`);
        cy.get(`.${TEXT_WRAPPER_CLASS}`).first().children(`p.${PREVIEW_PARAGRAPH_CLASS}`);
    });
    it('should find 3 children with class log-icon under icons wrapper', () => {
        cy.get(`.${ICONS_WRAPPER_CLASS}`).first().children().should('have.length', 3);
        cy.get(`.${ICONS_WRAPPER_CLASS}`).first().children(`.${LOG_ICON_CLASS}`);
    });
})

describe('Checks for content after populating the fields', { includeShadowDom: true }, () => {
    it('header should contain the text \'Daily Log \'', () => {
        cy.get(`.${PREVIEW_TITLE_CLASS}`).then(($el) => {
            expect($el).to.contain(DAILY_LOG_TITLE);
        });
    });

    const dateOfEntry = '04/21/2022';
    const journalEntry = 'Test journal entry';
    dailyLogPreviewNormal.populateFields(dateOfEntry, journalEntry, false, false, true);
    it('header should contain correct date', () => {
        cy.get(`.${PREVIEW_TITLE_CLASS}`).then(($el) => {
            expect($el.last()).to.contain(dateOfEntry);
        });
    });
    it('preview should contain correct text', () => {
        cy.get(`.${PREVIEW_PARAGRAPH_CLASS}`).then(($el) => {
            expect($el.last()).to.contain(journalEntry);
        });
    });
});

describe('Creates another daily log preview', { includeShadowDom: true }, () => {
    it('should find main container by id', () => {
        cy.get('#main').should('exist');
    });
    it('adds daily log preview to main', () => {
        cy.get('#main').then(($el) => {
            ($el).append(dailyLogPreviewNoJournal);
            cy.get('daily-log-preview').should('exist');
        })
    });
});

describe('Creates another daily log preview', { includeShadowDom: true }, () => {
    const dateOfEntry = '05/25/2022';
    dailyLogPreviewNoJournal.populateFields(dateOfEntry, '', false, false, true);
    it('should fill in the default value for empty journals', () => {
        cy.get(`.${PREVIEW_PARAGRAPH_CLASS}`).then(($el) => {
            expect($el.last()).to.contain(NO_PREVIEW_TEXT);
            cy.log($el.last());
        });
    });
});
