const fs = require('fs-extra');

/**
 * Converts inline text into a data object.
 * @param {string} value The value of the text.
 * @returns {Promise}
 */
module.exports = async function textInputProcessor({ src, value }) {
    if (src) {
        return { nodeType: 'text', value: await fs.readFile(src, { encoding: 'utf8' }) }
    }
    return { nodeType: 'text', value };
};
