const { getBuildContext } = require('../../buildContext');
const { bootstrap, fontAwesome } = require('../../modules/webpage');

const linkIcons = {
    'Facebook': '<i class="fa-brands fa-facebook-square"></i>',
    'Twitter' : '<i class="fa-brands fa-twitter"></i>',
    'Instagram': '<i class="fa-brands fa-instagram"></i>'
}

module.exports = async function webpageNavOutput({ items, header, logoHref, key }) {
    const context = getBuildContext(key);

    // configure prerequisites
    context.addModule(bootstrap);
    context.addModule(fontAwesome);

    if (logoHref) {
        context.addFile(logoHref, `filepath:${logoHref}`, 'file');
    }

    // render data
    const logoImage = logoHref ? `<img src="${logoHref}" alt="${header}" height="32" class="d-inline-block align-text-top">` : '';
    const links = (items || [])
        .map(i => `<li class="nav-item"><a class="nav-link" href="${i.href}">${linkIcons[i.title] || i.title}</a></li>`)
        .join('');
    return `
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
            ${logoImage}
            ${header}
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav">
            ${links}
            </ul>
          </div>
        </div>
    </nav>
    `;
};
