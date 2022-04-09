const { getBuildContext } = require('../../buildContext');
const { bootstrap } = require('../../modules/webpage');

module.exports = async function webpageLinkOutput({ type, filepath, title }) {
    return `<a href="${filepath}">${title}</a>`;
}