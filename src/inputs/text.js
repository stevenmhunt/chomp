const fs = require('fs-extra');

/**
 * Converts inline text into a data object.
 * @param {string} value The value of the text.
 * @returns {Promise}
 */
module.exports = async function textInputProcessor({ value }) {
    return { type: 'text', value };
};
