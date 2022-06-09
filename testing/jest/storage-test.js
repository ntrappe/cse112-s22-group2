import * as locStor from '../../source/backend/storage.js';
import * as helpers from '../../source/components/control/control-helpers.js';

test('Convert daily log date to local storage date key', () => {
    const dailyLogDate = 'Monday, April 21, 2022';
    const expectedDate = '2022/04/21';
    expect(helpers.convertStorageDate(dailyLogDate)).toBe(expectedDate);
});

test('Convert daily log date to local storage date key', () => {
    const dailyLogDate = 'Tuesday, September 1, 2022';
    const expectedDate = '2022/09/01';
    expect(helpers.convertStorageDate(dailyLogDate)).toBe(expectedDate);
});

test('Convert daily log date to local storage date key', () => {
    const dailyLogDate = 'Tuesday, December 31, 2022';
    const expectedDate = '2022/12/31';
    expect(helpers.convertStorageDate(dailyLogDate)).toBe(expectedDate);
});

test('Convert daily log preview date to local storage date key', () => {
    const dailyLogDate = '12/31/2022';
    const expectedDate = '2022/12/31';
    expect(helpers.convertStorageDate(dailyLogDate)).toBe(expectedDate);
});

test('Convert storage date key to preview log date', () => {
    const storageDate = '2022/12/31';
    const previewDate = '12/31/2022';
    expect(helpers.convertPreviewDate(storageDate)).toBe(previewDate);
});

test('Convert storage date key to preview log date', () => {
    const storageDate = '1998/01/02';
    const previewDate = '01/02/1998';
    expect(helpers.convertPreviewDate(storageDate)).toBe(previewDate);
});

test('Convert full daily log date to preview log date', () => {
    const logDate = 'Monday, April 21, 2022';
    const previewDate = '04/21/2022';
    expect(helpers.convertPreviewDate(logDate)).toBe(previewDate);
});

beforeEach(() => {
    localStorage.clear();
});

test('Add 1 log and see if in local storage', () => {
    const dailyLogDate = 'Monday, April 21, 2022';
    const journal = 'so this is cool';
    locStor.addLog(dailyLogDate, '🥹', null, journal);
    const key = helpers.convertStorageDate(dailyLogDate);
    const fetchedLog = localStorage.getItem(key);
    const parsedLog = JSON.parse(fetchedLog);
    expect(parsedLog.date).toBe(dailyLogDate);
    expect(parsedLog.journal).toBe(journal);
});

test('Add 3 logs and test order in local storage', () => {
    const dailyLogDate1 = 'Monday, April 21, 2022';
    const journal1 = 'so this is cool';
    const dailyLogDate2 = 'Tuesday, April 22, 2022';
    const journal2 = 'into the mountains, far from the breeze, free to climb, free to fall';
    const dailyLogDate3 = 'Friday, April 25, 2022';
    const journal3 = 'Successfully added to local storage/npsych just kidding';
    locStor.addLog(dailyLogDate1, '😍', null, journal1);
    locStor.addLog(dailyLogDate2, '😍', null, journal2);
    locStor.addLog(dailyLogDate3, '😍', null, journal3);
    const firstLog = localStorage.getItem(localStorage.key(0));
    const secondLog = localStorage.getItem(localStorage.key(1));
    const thirdLog = localStorage.getItem(localStorage.key(2));
    expect(JSON.parse(firstLog).date).toBe(dailyLogDate1);
    expect(JSON.parse(secondLog).date).toBe(dailyLogDate2);
    expect(JSON.parse(thirdLog).date).toBe(dailyLogDate3);
    expect(JSON.parse(thirdLog).tracker).toBe('😍');
});

test('Add 1 log then update it', () => {
    const dailyLogDate = 'Monday, April 21, 2022';
    const journal = 'so this is cool';
    const revisedJournal = 'Successfully added to local storage/npsych just kidding';
    locStor.addLog(dailyLogDate, '🤪', null, journal);
    locStor.updateLog(dailyLogDate, '🤪', null, revisedJournal);
    const parsedLog = JSON.parse(localStorage.getItem(helpers.convertStorageDate(dailyLogDate)));
    expect(parsedLog.journal).toBe(revisedJournal);
});

test('Add 3 logs then fetch second', () => {
    const dailyLogDate1 = 'Monday, April 21, 2022';
    const journal1 = 'so this is cool';
    const dailyLogDate2 = 'Tuesday, April 22, 2022';
    const journal2 = 'into the mountains, far from the breeze, free to climb, free to fall';
    const dailyLogDate3 = 'Friday, April 25, 2022';
    const journal3 = 'Successfully added to local storage/npsych just kidding';
    locStor.addLog(dailyLogDate1, '🤪', null, journal1);
    locStor.addLog(dailyLogDate2, '🤪', null, journal2);
    locStor.addLog(dailyLogDate3, '🤪', null, journal3);
    const parsedLog = JSON.parse(localStorage.getItem(helpers.convertStorageDate(dailyLogDate2)));
    // const secondLog = locStor.fetchLog(helpers.convertStorageDate(dailyLogDate2));
    expect(parsedLog.date).toBe(dailyLogDate2);
    expect(parsedLog.journal).toBe(journal2);
});

test('Add 3 logs then delete first', () => {
    const dailyLogDate1 = 'Monday, April 21, 2022';
    const journal1 = 'so this is cool';
    const dailyLogDate2 = 'Tuesday, April 22, 2022';
    const journal2 = 'into the mountains, far from the breeze, free to climb, free to fall';
    const dailyLogDate3 = 'Friday, April 25, 2022';
    const journal3 = 'Successfully added to local storage/npsych just kidding';
    locStor.addLog(dailyLogDate1, '🤪', null, journal1);
    locStor.addLog(dailyLogDate2, '🤪', null, journal2);
    locStor.addLog(dailyLogDate3, '🤪', null, journal3);
    locStor.deleteLog(helpers.convertPreviewDate(dailyLogDate1));
    const parsedLogs = locStor.fetchAll();
    // const secondLog = locStor.fetchLog(helpers.convertStorageDate(dailyLogDate2));
    expect(parsedLogs[0].date).toBe(dailyLogDate2);
    expect(parsedLogs[1].date).toBe(dailyLogDate3);
});
