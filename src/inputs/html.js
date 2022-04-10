const htmlParser = require('../parsers/html');

/**
 * Converts an HTML file into a data object.
 * @param {string} src The path to the html file.
 * @param {string} content The HTML content to parse (instead of a file).
 * @param {object} options Conversion options.
 * @returns {Promise}
 */
module.exports = async function htmlInputProcessor({ src, content, options }) {
    if (!content && src) {
        content = await fs.readFile(src, { encoding: 'utf8' });
    }
    // TODO: strip <html><head></head><body>....</body></html>
    return htmlParser(content);
};
