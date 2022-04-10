const fs = require('fs-extra');
const { marked } = require('marked');
const htmlParser = require('../parsers/html');

module.exports = async function markdownInputProcessor({ src, content }) {
    if (!content && src) {
        content = await fs.readFile(src, { encoding: 'utf8' });
    }
    const result = marked.parse(content, {
        gfm: true,
        smartLists: true,
        smartypants: true,
    });
    return htmlParser(result);
};
