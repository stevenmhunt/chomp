const _ = require('lodash');
const { parse } = require('parse5');
const nodeNameMapping = require('../mappings/nodeNames.json');

function getNodeType(node) {
    return nodeNameMapping[node.nodeName] || node.nodeName;
}

function extractAttributes(node) {
    const result = {};
    ((node || {}).attrs || []).forEach(({ name, value }) => {
        result[name] = value;
    });
    return result;
}

function toJSON(node) {
    if (!node) { return undefined; }
    if (_.isArray(node)) {
        return node.map(toJSON);
    }
    return {
        nodeType: getNodeType(node),
        value: node.value,
        ...extractAttributes(node),
        items: toJSON(node.childNodes)
    };
}

module.exports = async function htmlParser(content, options) {
    const parsed = parse(content);
    const result = parsed.childNodes[0].childNodes[1].childNodes;
    const data =  toJSON(result);
    if (_.isArray(data)) {
        if (data.length === 1) { return data[0]; }
        return {
            nodeType: 'div',
            items: data
        };
    }
    return data;
}