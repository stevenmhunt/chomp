const path = require('path');
const _ = require('lodash');

const csv = require('./csv');
const docx = require('./docx');
const html = require('./html');
const img = require('./img');
const json = require('./json');
const markdown = require('./markdown');
const text = require('./text');
const video = require('./video');

const extensions = {
    '.csv': csv,
    '.docx': docx,
    '.htm': html,
    '.html': html,
    '.jpg': img,
    '.png': img,
    '.gif': img,
    '.bmp': img,
    '.json': json,
    '.md': markdown,
    '.txt': text,
    '.mp4': video,
    '.mpeg': video,
    '.mov': video,
    '.wmv': video,
};

/**
 * Supports importing input data by file type.
 * @param {string} src The path to the file.
 * @returns {Promise}
 */
 module.exports = async function fileInputProcessor({ src, title, key }) {
     if (!src || !_.isString(src)) {
         throw new Error('A valid src value must be provided!');
     }
     const ext = path.extname(src.toLowerCase());
     if (extensions[ext]) {
         return extensions[ext]({ src, title, key });
     }

    throw new Error(`Unknown file extension ${ext}`);
};
