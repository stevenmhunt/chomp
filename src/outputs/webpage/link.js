const { getBuildContext } = require('../../buildContext');
const { bootstrap } = require('../../modules/webpage');

module.exports = async function webpageLinkOutput({ type, href, title }) {
    return `<a href="${href}">${title}</a>`;
}