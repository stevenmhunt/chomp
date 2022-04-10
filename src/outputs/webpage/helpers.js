const htmlFormatter = require('../../formatters/html');

function wrapHeaderFooter({ header, footer, tag }, content) {
    let headerHtml = "";
    if (header) {
        headerHtml = `<${tag || 'h1'}>${header}</${tag || 'h1'}>`;
    }
    let footerHtml = "";
    if (footer) {
        footerHtml = `<${tag || 'h1'}>${footer}</${tag || 'h1'}>`;
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
