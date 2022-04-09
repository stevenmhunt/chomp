const { getBuildContext } = require('../../buildContext');
const { renderHtmlItems } = require('./helpers');
const htmlPretty = require('pretty');

module.exports = async function webpagePageOutput({ items, filepath, pretty, key }) {
    const context = getBuildContext(key);
    const htmlItems = await renderHtmlItems(items);
    let result = `
    <!doctype html>
    <html>
    <head>
    <title>something</title>
    ${context.getFiles('stylesheet').map(i => `<link rel="stylesheet" href="${i.filepath}" />`).join('\n')}
    </head>
    <body>
    ${htmlItems}
    ${context.getFiles('script').map(i => `<script src="${i.filepath}"></script>`).join('\n')}
    </body>
    </html>
    `;
    if (pretty !== 'no') {
        result = htmlPretty(result.split('\n').map(i => i.trimStart()).join(''));
    }
    context.addFile(`${filepath}.html`, result);
}