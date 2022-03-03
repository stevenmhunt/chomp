const htmlFormatter = require('../../formatters/html');

module.exports = async function webpageWizardOutput({ items }) {
    const tags = await (await Promise.all(items.map(i => htmlFormatter(i)))).join('</div><div>');    
    return `<div>${tags}</div>`;
}