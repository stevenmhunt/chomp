
module.exports = async function htmlInputProcessor({ filepath, content, options }) {
    if (!content && filepath) {
        content = await fs.readFile(filepath, { encoding: 'utf8' });
    }
    // TODO: strip <html><head></head><body>....</body></html>
    return content;
};
