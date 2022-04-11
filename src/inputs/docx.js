const mammoth = require("mammoth");
const htmlParser = require('../parsers/html');
const logging = require('../logging');
const { getBuildContext } = require('../buildContext');

let imageCounter = 1;

/**
 * Converts a docx file (Microsoft Word 2007 format) into a data object.
 * @param {string} src The path to the docx file.
 * @param {object} options Conversion options.
 * @returns {Promise}
 */
module.exports = async function docxInputProcessor({ src, options, key }) {
    const context = getBuildContext(key);
    const { value, messages } = await mammoth.convertToHtml({ path: src }, { ...options, styleMap: [
            "p[style-name='Body Text'] => p.bodytext:fresh",
            "p[style-name='Text Body'] => p.bodytext:fresh"
        ],
        convertImage: mammoth.images.imgElement(async (image) => {
            const data = await image.read();
            const filepath = `./images/img_${imageCounter++}.${image.contentType.split('/')[1]}`;
            context.addFile(filepath, data);
            return {
                src: filepath
            };
        })
    });
    (messages || []).forEach(({ type, message }) => {
        logging.warn(`[DOCX--->HTML] [${type}]  ${message}`);
    });
    return htmlParser(value);
};
