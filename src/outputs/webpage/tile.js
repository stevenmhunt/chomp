const path = require('path');
const { getBuildContext } = require('../../buildContext');

module.exports = async function webpageTileOutput({ href, imageSrc, title, key }) {
    const context = getBuildContext(key);

    // configure prerequisites:
    context.addFile('./js/chomp-tile.css', `filepath:${path.join(__dirname, './public/chomp-tile.css')}`, 'stylesheet');
    let style = '';
    if (imageSrc) {
        context.addFile(imageSrc, `filepath:${imageSrc}`, 'stylesheet');
        style = `background-image: url('${imageSrc}');`;
    }

    return `<a href="${href}" class="chomp-tile" style="${style}">
    ${title}
    </a>`;
}