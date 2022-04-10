const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const logging = require('./logging');

/**
 * @private
 * The build context class which manages the state of the files and modules in a build.
 */
class BuildContext {
    constructor() {
        this.files = {};
        this.modules = {};
    }

    /**
     * Adds a file to the current build.
     * @param {string} filepath the path of the new file.
     * @param {string | Buffer} contents The contents of the file.
     * @param {string} type The type of file (file, js, css, etc.)
     * @param {string} encoding (optional) the encoding of the data.
     */
    addFile(filepath, contents, type = 'file', encoding = 'utf8') {
        this.files[filepath] = { type, contents, encoding };
        logging.log(`Adding file ${filepath} (${type})`);
    }

    /**
     * Adds the specified module to the current build.
     * @param {*} mod The module object to add.
     */
    addModule(mod) {
        if (!mod || !_.isFunction(mod)) {
            throw new Error('Expected a module function.');
        }
        if (mod.name) {
            if (this.modules[mod.name]) {
                return;
            }
            this.modules[mod.name] = true;
        }
        return mod(this);
    }

    /**
     * Sets the specified theme to the current build.
     * @param {*} theme The theme object to set.
     */
     setTheme(theme) {
        if (!theme || !_.isFunction(theme)) {
            throw new Error('Expected a theme function.');
        }
        return theme(this);
    }

    /**
     * Get files from the build context.
     * @param {string} type The type of files to get, or all files.
     * @returns {Array}
     */
    getFiles(type = null) {
        return _.keys(this.files).map(filepath => ({
            filepath, ...this.files[filepath]
        })).filter(i => !type || i.type === type);
    }

    /**
     * Finalizes a build to the specified destination path.
     * @param {string} filepath The path to write build artifacts to.
     * @returns {Promise}
     */
    async finalize(filepath) {
        return Promise.all(_.keys(this.files).map(async (file) => {
            const { type, contents, encoding } = this.files[file];
            // make sure the destination file and directory paths exist.
            await fs.ensureFile(path.join(filepath, file));
            // if file is referencial, perform a copy to the destination.
            if (_.isString(contents) && contents.startsWith('filepath:')) {
                await fs.copy(
                    contents.substring('filepath:'.length),
                    path.join(filepath, file));
            }
            // otherwise, write the data to the destination.
            else {
                await fs.writeFile(path.join(filepath, file), contents, { encoding });
            }
        }));
    }
}

const contexts = {};

/**
 * Given the context name, acquires the associated build context.
 * @param {*} name The context name.
 * @returns The build context.
 */
function getBuildContext(name = 'default') {
    if (!contexts[name]) {
        contexts[name] = new BuildContext();
    }
    return contexts[name];
}

module.exports = {
    getBuildContext
};
