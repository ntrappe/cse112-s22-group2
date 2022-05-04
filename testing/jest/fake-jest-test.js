describe('test functions', () => {
    let num = 5;

    /* Test 10:01 and 01:10 to see if the function can handle padding 0 */
    test('num + 1 = 6', () => {
        num = num + 1;
        expect(num).toBe(6);
    });
  
    test('num + 1 = 7', () => {
        num = num + 1;
        expect(num).toBe(7);
    });
  });