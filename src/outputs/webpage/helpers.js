const htmlFormatter = require('../../formatters/html');

function wrapHeaderFooter({ header, footer, headerTag, footerTag }, content) {
    let headerHtml = "";
    if (header) {
        headerHtml = `<${headerTag || 'h1'}>${header}</${headerTag || 'h1'}>`;
    }
    let footerHtml = "";
    if (footer) {
        footerHtml = `<${footerTag || 'h1'}>${footer}</${footerTag || 'h1'}>`;
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
