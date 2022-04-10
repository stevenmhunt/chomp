const { renderHtmlItems, wrapHeaderFooter } = require('./helpers');

module.exports = async function webpageSectionOutput({ items, header, footer, align }) {
    // render data
    const htmlItems = await renderHtmlItems(items);
    return wrapHeaderFooter({ header, footer }, `<section class="text-${align || 'left'}">${htmlItems}</section>`);

}