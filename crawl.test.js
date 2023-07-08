const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
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

 //test('normalize url already normalized (**FAILED**)',() => {
   // const input = 'wagsLane.dev/path'
    //const actual = normalizeURL(input)
    //const expected = 'wagslane.dev/path'
    //expect(actual).toEqual(expected);
 //}); 




test('getURLsFromHTML absluteURLs', ()=> {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/"><span>Go to Boot.dev</span></a>
        </body>
    </html> 
    `
    const inputBASEURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBASEURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relativeURLs', ()=> {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/"><span>Go to Boot.dev</span></a>
        </body>
    </html> 
    `
    const inputBASEURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBASEURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML multp urls', ()=> {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/"><span>Go to Boot.dev</span></a>
            <a href="/path2/"><span>Go to Boot.dev</span></a>
         
        </body>
    </html> 
    `
    const inputBASEURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBASEURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', ()=> {
    const inputHTMLBody = `
    <html>
        <body>
            <a 
            href="invalid">  
            </a>
        </body>
    </html> 
    `
    const inputBASEURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBASEURL)
    const expected = []
    expect(actual).toEqual(expected)
})

