const { renderHtmlItems } = require('./helpers');

module.exports = async function webpageHeadingOutput({ items, align, level }) {
    // render data
    const htmlItems = await renderHtmlItems(items);
    return `<h${level || 1} class="text-${align || 'left'}">${htmlItems}</h${level || 1}>`;

}