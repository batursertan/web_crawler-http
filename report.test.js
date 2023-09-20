
const { sortPages } = require('./report.js')
const {test, expect} = require('@jest/globals')


test('sortPages 2 pages',() => {
    const input = {
        'https://wagsLane.dev/path' : 1 ,
        'https://wagsLane.dev' : 3
}
    const actual = sortPages(input)
    const expected = [
        ['https://wagsLane.dev', 3] ,
        ['https://wagsLane.dev/path', 1]
]                
    expect(actual).toEqual(expected);
});

test('sortPages 5 pages',() => {
    const input = {
        'https://wagsLane.dev/path' : 1 ,
        'https://wagsLane.dev' : 3 ,
        'https://wagsLane.dev/path/1' : 77 ,
        'https://wagsLane.dev/path/2' : 22 ,
        'https://wagsLane.dev/path/1/12' : 2
}
    const actual = sortPages(input)
    const expected = [
        ['https://wagsLane.dev/path/1', 77,],
        ['https://wagsLane.dev/path/2' , 22] ,
        ['https://wagsLane.dev', 3] ,
        ['https://wagsLane.dev/path/1/12', 2],
        ['https://wagsLane.dev/path', 1],
        
]                
    expect(actual).toEqual(expected);
});