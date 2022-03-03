const _ = require('lodash');
const inputs = require('./inputs');
const outputs = require('./outputs');
const htmlParser = require('./parsers/html');

function getObjectType(obj) {
    if (obj.output) { return 'output'; }
    if (obj.input) { return 'input'; }
    return 'unknown';
}

async function executeBuildInternal(type, obj) {
    if (getObjectType(obj) === 'output') {
        const items = await Promise.all(obj.items.map(i => executeBuildInternal(type, i)));
        return outputs[type][obj.output]({
            ...obj,
            items,
        });
    } else {
        return htmlParser(await inputs[obj.input](obj));
    }
}

async function executeBuild(chompfile) {
    const { name } = chompfile;
    return (await Promise.all(_.keys(chompfile)
        .filter(i => i !== 'name')
        .map(i => executeBuildInternal(i, chompfile[i])))).join('');
};

module.exports = {
    executeBuild
};
