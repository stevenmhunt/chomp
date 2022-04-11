const htmlParser = require('../parsers/html');
const { getBuildContext } = require('../buildContext');

/**
 * Converts an HTML file into a data object.
 * @param {string} src The path to the image file.
 * @returns {Promise}
 */
module.exports = async function imgInputProcessor({ src, title, key }) {
    const context = getBuildContext(key);
    context.addFile(src, `filepath:${src}`);
    return htmlParser(`<img src="${src}" title="${title}" />`);
};
