const htmlParser = require('../parsers/html');

/**
 * Converts an HTML file into a data object.
 * @param {string} filepath The path to the html file.
 * @param {string} content The HTML content to parse (instead of a file).
 * @param {object} options Conversion options.
 * @returns {Promise}
 */
module.exports = async function htmlInputProcessor({ filepath, content, options }) {
    if (!content && filepath) {
        content = await fs.readFile(filepath, { encoding: 'utf8' });
    }
    // TODO: strip <html><head></head><body>....</body></html>
    return htmlParser(content);
};
