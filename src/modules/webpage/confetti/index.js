const fs = require('fs-extra');
const path = require('path');
const logging = require('../../../logging');

/**
 * Configures the Confetti module.
 * @param {object} context The build context.
 * @returns {Promise}
 */
module.exports = async function executeConfettiModule(context) {
    logging.log(`Adding webpage module Confetti`);
    context.addFile('./js/confetti.min.js', `filepath:${path.join(__dirname, 'confetti.min.js')}`, 'script');
};

