const mammoth = require("mammoth");
const htmlParser = require('../parsers/html');
const logging = require('../logging');

/**
 * Converts a docx file (Microsoft Word 2007 format) into a data object.
 * @param {string} src The path to the docx file.
 * @param {object} options Conversion options.
 * @returns {Promise}
 */
module.exports = async function docxInputProcessor({ src, options }) {
    const { value, messages } = await mammoth.convertToHtml({ path: src }, { ...options, styleMap: [
        "p[style-name='Body Text'] => p.bodytext:fresh",
        "p[style-name='Text Body'] => p.bodytext:fresh"
    ]});
    (messages || []).forEach(({ type, message }) => {
        logging.warn(`[DOCX--->HTML] [${type}]  ${message}`);
    });
    return htmlParser(value);
};
