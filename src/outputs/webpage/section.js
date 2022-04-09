const { renderHtmlItems, wrapHeaderFooter } = require('./helpers');

module.exports = async function webpageSectionOutput({ items, header, footer }) {
    // render data
    const htmlItems = await renderHtmlItems(items);
    return wrapHeaderFooter({ header, footer }, `<section>${htmlItems}</section>`);

}