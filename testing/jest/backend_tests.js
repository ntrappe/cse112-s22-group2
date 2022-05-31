test('Returns sum of 1 and 2', () => {
    expect(1 + 2).toBe(3);
});

// const backend_fucntions = require('../../source/backend/storage.js');

// test('Ckeck if addLog() fucntion works (1)', () => {
//     backend_fucntions.addLog('Monday, April 21, 2022', ['banana'], 'My journal')
//     let json_body = '{\"notes\":[\"banana\"],\"journal\":\"My journal\"}'
//     expect(localStorage.getItem('Monday, April 21, 2022')).toBe(json_body)
// });

// test('Ckeck if addLog() fucntion works (2)', () => {
//     backend_fucntions.addLog('Monday, May 21, 2023', ['orange', 'lemon'], 'Not my journal')
//     let json_body = '{\"notes\":[\"orange\",\"lemon\"],\"journal\":\"Not my journal\"}'
//     expect(localStorage.getItem('Monday, May 21, 2023')).toBe(json_body)
// });

// test('Ckeck if udpateLog() fucntion works', () => {
//     backend_fucntions.updateLog('Monday, April 21, 2022', ['apple'], 'Changed journal')
//     let json_body = '{\"notes\":[\"apple\"],\"journal\":\"Changed journal\"}'
//     expect(localStorage.getItem('Monday, April 21, 2022')).toBe(json_body)
// });

// test('Ckeck if fetchLog() fucntion works', () => {
//     let json_body = backend_fucntions.fetchLog('Monday, April 21, 2022')
//     expect(localStorage.getItem('Monday, April 21, 2022')).toBe(json_body)
// });

// test('Ckeck if fetchLog() fucntion works', () => {
//     let json_body = backend_fucntions.fetchLog('Monday, April 21, 2022')
//     expect(localStorage.getItem('Monday, April 21, 2022')).toBe(json_body)
// });

// test('Ckeck if fetchAll() fucntion works', () => {
//     let fetch_all_storage = backend_fucntions.fetchAll()
//     let actaul_storage = []
//     let keys = Object.keys(localStorage)
//     for (var i = 0; i < keys.length; i++) {
//         actaul_storage.push(localStorage.getItem(keys[i]));
//     }
//     expect(fetch_all_storage).toStrictEqual(actaul_storage)
// });