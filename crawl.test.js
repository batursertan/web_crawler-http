const { normalizeURL } = require('./crawl.js')


test('yes',() => {
    expect(normalizeURL('https://wagslane.dev/path/')).toBe('wagslane.dev/path.');
});

test('yes',() => {
    expect(normalizeURL('https://wagsLane.Dev/path')).toBe('wagslane.dev/path.');
});

test('yes',() => {
    expect(normalizeURL('https://wagslane.dev/path')).toBe('wagslane.dev/path.');
});

test('yes',() => {
    expect(normalizeURL('http://wagslane.dev/path')).toBe('wagslane.dev/path.');
});

test('yes',() => {
    expect(normalizeURL('wagslane.dev/path')).toBe('wagslane.dev/path.');
});
