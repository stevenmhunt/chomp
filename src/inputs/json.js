const fs = require('fs-extra');

/**
 * Converts an JSON file into a data object.
 * @param {string} filepath The path to the JSON file.
 * @param {string} content The JSON content to parse (instead of a file).
 * @param {object} options Conversion options.
 * @returns {Promise}
 */
module.exports = async function jsonInputProcessor({ filepath, content, options }) {
    if (!content && filepath) {
        content = await fs.readFile(filepath, { encoding: 'utf8' });
    }
    return JSON.parse(content);
};
