const path = require('path');
const fs = require('fs-extra');
const { Parser } = require('xml2js');

const parser = new Parser({ explicitChildren: true, preserveChildrenOrder: true });

const cwd = process.cwd();

async function readChompFile(filepath) {    
    let result;
    try {
        result = await readXML(filepath);
    }
    catch (e) {
        result = await readJSON(filepath);
    }
    return result;
}

async function readJSON(filepath) {
    const file = filepath || path.join(cwd, './chomp.json');
    return await fs.readJSON(file);
}

const excludedNodes = ['header', 'footer'];
function processXmlNode(obj) {
    return {
        ...obj.$,
        text: obj._,
        type: obj['#name'],
        header: (obj.header || []).join(''),
        footer: (obj.footer || []).join(''),
        items: [
            ...(obj.$$ || []).filter(o => excludedNodes.indexOf(o['#name']) === -1).map(o => processXmlNode(o)),
            ...(obj._ ? [{ type: 'text', value: obj._ }] : [])
        ]
    };
}

async function readXML(filepath) {
    const file = filepath || path.join(cwd, './chomp.xml');
    const data = await fs.readFile(file, { encoding: 'utf8' });
    const nodes = await parser.parseStringPromise(data);
    if (!nodes.project) {
        throw new Error('XML error: expected root node to be <project>...</project>');
    }
    const result = processXmlNode(nodes.project);
    await fs.writeJSON('./output.json', nodes);
    return result;
}

module.exports = {
    readChompFile
};
