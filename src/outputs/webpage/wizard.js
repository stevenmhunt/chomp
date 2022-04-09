const path = require('path');
const { getBuildContext } = require('../../buildContext');
const { bootstrap } = require('../../modules/webpage');
const { renderHtmlItems, wrapHeaderFooter } = require('./helpers');

module.exports = async function webpageWizardOutput({ items, header, footer, key }) {
    const context = getBuildContext(key);

    // configure prerequisites:
    context.addModule(bootstrap);
    context.addFile('./js/chomp-wizard.js', `filepath:${path.join(__dirname, './public/chomp-wizard.js')}`, 'script');
    context.addFile('./js/chomp-wizard.css', `filepath:${path.join(__dirname, './public/chomp-wizard.css')}`, 'stylesheet');

    // render output:
    const wizardTag = 'div class="chomp-wizard-item" style="display: none;"';
    const htmlItems = await renderHtmlItems(items, wizardTag);
    const innerHtml = wrapHeaderFooter({ header, footer }, `
    <div class="chomp-wizard col">
        ${htmlItems}
        <div class="chomp-wizard-footer">
            <button class="btn btn-primary chomp-wizard-back">Back</button>
            <button class="btn btn-primary chomp-wizard-next">Next</button>
        </div>
    </div>`);
    return `<div class="col-lg-8 col-md-8 col-sm-8 container justify-content-center">${innerHtml}</div>`;
}