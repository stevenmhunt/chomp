const _ = require('lodash');

async function renderTag(obj) {
    const items = (await Promise.all((obj.items || []).map(i => renderTag(i)))).join('');
    if (obj.type === 'text') { return obj.value; }
    return `<${obj.type}>${items}</${obj.type}>`;
}

module.exports = async function htmlFormatter(content, options) {
    if (_.isString(content)) {
        return content;
    }
    return renderTag(content);
};
