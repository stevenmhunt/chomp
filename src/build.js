const _ = require('lodash');
const path = require('path');
const inputs = require('./inputs');
const outputs = require('./outputs');
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

function getObjectType(obj) {
    if (obj.output) { return 'output'; }
    if (obj.input) { return 'input'; }
    return 'unknown';
}

async function executeBuildInternal(key, type, obj) {
    const objectType = getObjectType(obj);
    if (objectType === 'output') {
        const output = _.camelCase(obj.output);
        if (!_.isFunction(outputs[type][output])) {
            throw new Error(`Invalid output type ${obj.output}.`);
        }

        const items = _.flatten(await Promise.all(getItems(obj).map(i => executeBuildInternal(key, type, i))));
        return outputs[type][output]({
            ...obj,
            key,
            items,
        });
    }
    else if (objectType === 'input') {
        const input = _.camelCase(obj.input);
        if (!_.isFunction(inputs[input])) {
            throw new Error(`Invalid input type ${obj.input}.`);
        }
        return await inputs[obj.input](obj);
    }
    else {
        console.log(obj);
        throw new Error('Unknown object type!');
    }
}

async function executeBuild(cwd, chompfile) {
    logging.log('---------------------------------------------------');
    logging.log('Content and Help Output Multiplexer Program (CHOMP)')
    logging.log('---------------------------------------------------');
    const { name, types, items } = chompfile;
    for (let i = 0; i < types.length; i += 1) {
        const type = types[i];
        const key = `${name}:${type}`;
        logging.log(`Building ${name} (${type})...`);
        await Promise.all(items.map(i => executeBuildInternal(key, type, i)));
        await getBuildContext(key).finalize(path.join(cwd, type));
    }
};

module.exports = {
    executeBuild
};
