const fs = require('fs-extra');
const path = require('path');
const logging = require('../../../logging');

/**
 * Configures the Font Awesome module.
 * @param {object} context The build context.
 * @returns {Promise}
 */
module.exports = async function executeFontAwesomeModule(context) {
    logging.log(`Adding webpage module Font Awesome 6`);
    context.addFile('./css/font-awesome.all.min.css', `filepath:${path.join(__dirname, 'font-awesome.all.min.css')}`, 'stylesheet');
    context.addFile('./js/font-awesome.all.min.js', `filepath:${path.join(__dirname, 'font-awesome.all.min.js')}`, 'script');
};

