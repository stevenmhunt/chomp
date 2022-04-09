const htmlFormatter = require('../../formatters/html');

function wrapHeaderFooter({ header, footer }, content) {
    let headerHtml = "";
    if (header) {
        headerHtml = `<h1>${header}</h1>`;
    }
    let footerHtml = "";
    if (footer) {
        footerHtml = `<h1>${footer}</h1>`;
    }

    return `${headerHtml}${content}${footerHtml}`;
}

async function renderHtmlItems(items, wrappedElement = 'div') {
    const tags = (await Promise.all(items.map(i => htmlFormatter(i)))).join(`</${wrappedElement}><${wrappedElement}>`);
    return `<${wrappedElement}>${tags}</${wrappedElement.split(' ')[0]}>`;
}

module.exports = {
    wrapHeaderFooter,
    renderHtmlItems
};
