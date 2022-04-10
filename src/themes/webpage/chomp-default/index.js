const fs = require('fs-extra');
const path = require('path');

/**
 * Configures the CHOMP default theme.
 * @param {object} context The build context.
 * @returns {Promise}
 */
module.exports = async function loadChompDefaultTheme(context) {
    context.addFile('./css/chomp.css', `filepath:${path.join(__dirname, 'chomp.css')}`, 'stylesheet');
};
