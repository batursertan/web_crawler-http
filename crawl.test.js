const { normalizeURL } = require('./crawl.js')
const { getURLsFromHTML } = require('./crawl.js')
const {test, expect} = require('@jest/globals')


test('normalize url with / at the end',() => {
    const input = 'https://wagsLane.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'wagslane.dev/path'
    expect(actual).toEqual(expected);
});

test('normalize url with CAPITALS',() => {
    const input = 'https://WAGSLaNe.dev/path'
    const actual = normalizeURL(input)
    const expected = 'wagslane.dev/path'
    expect(actual).toEqual(expected);
});

test('normalize url with http',() => {
    const input = 'http://wagsLane.dev/path'
    const actual = normalizeURL(input)
    const expected = 'wagslane.dev/path'
    expect(actual).toEqual(expected);
});

 test('normalize url already normalized (**FAILED**)',() => {
    const input = 'wagsLane.dev/path'
    const actual = normalizeURL(input)
    const expected = 'wagslane.dev/path'
    expect(actual).toEqual(expected);
 }); 




test('getURLsFromHTML', ()=> {
    const inputHTML = ' <html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>'
    const inputURL = ''
    const actual = getURLsFromHTML(inputHTML, inputURL)
    const expected = ''
    expect(actual).toBe(expected)
})






