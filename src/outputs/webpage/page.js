const { getBuildContext } = require('../../buildContext');
const { renderHtmlItems, wrapHeaderFooter } = require('./helpers');
const htmlPretty = require('pretty');

module.exports = async function webpagePageOutput({ items, href, title, footer, pretty, key }) {
    const context = getBuildContext(key);
    const innerHtml = await renderHtmlItems(items);
    const outerHtml = `<div id="content">${innerHtml}</div>`;
    const htmlItems = wrapHeaderFooter({ footer, tag: 'footer' }, outerHtml);
    let result = `
    <!doctype html>
    <html>
    <head>
    <title>${title || href} - ${context.project.title || 'CHOMP'}</title>
    ${context.getFiles('stylesheet').map(i => `<link rel="stylesheet" href="${i.filepath}" />`).join('\n')}
    </head>
    <body>
    ${htmlItems}
    ${context.getFiles('script').map(i => `<script src="${i.filepath}"></script>`).join('\n')}
    </body>
    </html>
    `;
    if (pretty !== 'false' && pretty !== false) {
        result = htmlPretty(result.split('\n').map(i => i.trimStart()).join(''));
    }
    context.addFile(`${href}.html`, result);
}