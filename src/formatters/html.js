const _ = require('lodash');

/**
 * Given a data object, converts it to HTML output.
 * @param {object} obj The data object to render.
 * @returns {Promise<string>} The equivalent HTML tag.
 */
async function renderTag(obj) {
    const items = (await Promise.all((obj.items || []).map(i => renderTag(i)))).join('');
    if (obj.type === 'text') { return obj.value; }
    return `<${obj.type}>${items}</${obj.type}>`;
}

/**
 * A formatter for HTML output.
 * @param {*} content The data objects or content to render.
 * @param {*} options Formatter options.
 * @returns {Promise<string>} The resultant HTML.
 */
module.exports = async function htmlFormatter(content, options) {
    if (_.isString(content)) {
        return content;
    }
    return renderTag(content);
};
