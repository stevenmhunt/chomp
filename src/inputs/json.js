const fs = require('fs-extra');

/**
 * Converts an JSON file into a data object.
 * @param {string} src The path to the JSON file.
 * @param {string} content The JSON content to parse (instead of a file).
 * @param {object} options Conversion options.
 * @returns {Promise}
 */
module.exports = async function jsonInputProcessor({ src, content, options }) {
    if (!content && src) {
        content = await fs.readFile(src, { encoding: 'utf8' });
    }
    return JSON.parse(content);
};
