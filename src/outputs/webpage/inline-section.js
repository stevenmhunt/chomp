const htmlFormatter = require('../../formatters/html');
const { getBuildContext } = require('../../buildContext');
const { bootstrap } = require('../../modules/webpage');
const { renderHtmlItems, wrapHeaderFooter } = require('./helpers');

module.exports = async function webpageInlineSectionOutput({ items, header, footer, key }) {
    const context = getBuildContext(key);

    // configure prerequisites
    context.addModule(bootstrap);

    // render data
    const htmlItems = await renderHtmlItems(items);
    return wrapHeaderFooter({ header, footer }, `<div class="d-flex justify-content-around">${htmlItems}</div>`);
};
