const { getBuildContext } = require('../../buildContext');
const { renderHtmlItems, wrapHeaderFooter } = require('./helpers');
const { bootstrap } = require('../../modules/webpage');

let tabCount = 1;

module.exports = async function webpageTabSectionOutput({ items, header, footer, key }) {
    const context = getBuildContext(key);

    // configure prerequisites
    context.addModule(bootstrap);

    // render data
    const tabIds = [];
    const links = (items || [])
        .map((v, i) => {
            const tabNum = tabCount++;
            tabIds.push(tabNum);
            return `<li class="nav-item" role="presentation"><button class="nav-link${i === 0 ? ' active' : ''}" id="chomp-tab${tabNum}-tab" data-bs-toggle="tab" data-bs-target="#chomp-tab${tabNum}" type="button" role="tab" aria-controls="chomp-tab${tabNum}" aria-selected="${i === 0 ? 'true' : 'false'}">${v.header || v.title}</button></li>`;
        }).join('');
    const contents = (await Promise.all((items || [])
        .map((v, i) => {
            const tag = `div class="tab-pane fade${i === 0 ? ' show active' : ''}" id="chomp-tab${tabIds[i]}" role="tabpanel" aria-labelledby="chomp-tab${tabIds[i]}-tab"`;
            return renderHtmlItems([v], tag);
        }))).join('');
    return wrapHeaderFooter({ header, footer }, `
    <ul class="nav nav-tabs justify-content-center" role="tablist">
        ${links}
    </ul>
    <div class="tab-content">
        ${contents}
    </div>
    `);
};
