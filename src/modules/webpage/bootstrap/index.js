const fs = require('fs-extra');
const path = require('path');
const logging = require('../../../logging');

/**
 * Configures the Bootstrap module.
 * @param {object} context The build context.
 * @returns {Promise}
 */
module.exports = async function executeBootstrapModule(context) {
    logging.log(`Adding webpage module Bootstrap 5`);
    context.addFile('./css/bootstrap.min.css', `filepath:${path.join(__dirname, 'bootstrap.min.css')}`, 'stylesheet');
    context.addFile('./js/bootstrap.min.js', `filepath:${path.join(__dirname, 'bootstrap.min.js')}`, 'script');
};

