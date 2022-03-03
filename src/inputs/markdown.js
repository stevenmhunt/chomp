const fs = require('fs-extra');
const { marked } = require('marked');

module.exports = async function markdownInputProcessor({ filepath, content }) {
    if (!content && filepath) {
        content = await fs.readFile(filepath, { encoding: 'utf8' });
    }
    const result = marked.parse(content, {
        gfm: true,
        smartLists: true,
        smartypants: true,
    });
    return result;
};
