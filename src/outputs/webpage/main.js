const htmlFormatter = require('../../formatters/html');

module.exports = async function webpageMainOutput({ items }) {    
    const tags = await (await Promise.all(items.map(i => htmlFormatter(i)))).join('</div><div>');    
    return `
    <!doctype html>
    <html>
    <head>
    <title>something</title>
    </head>
    <body>
    <div>
    ${tags}
    </div>
    </body>
    </html>
    `;
}