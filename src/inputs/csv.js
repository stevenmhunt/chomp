const csv = require('csvtojson');

/**
 * Converts an CSV file into a data object.
 * @param {string} filepath The path to the CSV file.
 * @param {string} content The CSV content to parse (instead of a file).
 * @param {object} options Conversion options.
 * @returns {Promise}
 */
 module.exports = async function csvInputProcessor({ filepath, content, options }) {
    if (!content && filepath) {
        content = await csv().fromFile(filepath, options);
    }
    else {
        content = await csv().fromString(content);
    }
    return content;
};
