const _ = require('lodash');
const path = require('path');
const inputs = require('./inputs');
const outputs = require('./outputs');
const themes = require('./themes');
const { getBuildContext } = require('./buildContext');
const logging = require('./logging');

function getItems(obj) {
    if (!obj || !obj.items) {
        return [];
    }
    if (!_.isArray(obj.items)) {
        return [obj.items];
    }
    return obj.items;
}

function getObjectType(type, obj) {
    const name = _.camelCase(obj.nodeType || '');
    if (_.isFunction(outputs[type][name])) { return 'output'; }
    if (_.isFunction(inputs[name])) { return 'input'; }
    throw new Error(`Invalid input/output type ${obj.nodeType}.`);
}

async function executeBuildInternal(key, type, obj) {
    const objectType = getObjectType(type, obj);
    const name = _.camelCase(obj.nodeType);
    if (objectType === 'output') {
        const items = _.flatten(await Promise.all(getItems(obj).map(i => executeBuildInternal(key, type, i))));
        return outputs[type][name]({
            ...obj,
            key,
            items,
        });
    }
    else if (objectType === 'input') {
        return await inputs[name]({
            ...obj,
            key
        });
    }
    else {
        throw new Error('Unknown object type!');
    }
}

async function executeBuild(cwd, chompfile) {
    logging.log('---------------------------------------------------');
    logging.log('Content and Help Output Multiplexer Program (CHOMP)')
    logging.log('---------------------------------------------------');
    const { name, types, theme, items } = chompfile;
    const themeName = _.camelCase(theme || 'chomp-default');
    const typesList = types.split(',');
    for (let i = 0; i < typesList.length; i += 1) {
        const type = typesList[i];
        const key = `${name}:${type}`;
        const context = getBuildContext(key);
        context.project = chompfile;
        logging.log(`Building ${name} (${type})...`);
        if (!_.isFunction(themes[type][themeName])) {
            throw new Error(`Cannot locate ${type} theme ${theme || 'chomp-default'}.`);
        }
        logging.log(`Setting theme to ${theme || 'chomp-default'}`);
        context.setTheme(themes[type][themeName]);
        await Promise.all(items.map(i => executeBuildInternal(key, type, i)));
        await context.finalize(path.join(cwd, type));
    }
};

module.exports = {
    executeBuild
};
