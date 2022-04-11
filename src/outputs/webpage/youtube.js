const { renderHtmlItems } = require('./helpers');

module.exports = async function webpageYoutubeOutput({ src }) {
    return `<iframe width="540" height="304" src="${src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}