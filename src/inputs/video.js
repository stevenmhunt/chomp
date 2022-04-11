const path = require('path');
const htmlParser = require('../parsers/html');
const { getBuildContext } = require('../buildContext');

/**
 * Converts a video file into a data object.
 * @param {string} src The path to the image file.
 * @returns {Promise}
 */
module.exports = async function videoInputProcessor({ src, title, key }) {
    const context = getBuildContext(key);
    context.addFile(src, `filepath:${src}`);
    return htmlParser(`<video controls="controls" title="${title}"><source src="${src}" type="video/${path.extname(src).substring(1)}" /></video>`);
};
