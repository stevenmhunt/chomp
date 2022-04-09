#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const { executeBuild } = require('./src/build');

async function main() {
    const cwd = process.cwd();
    const chompfile = await fs.readJSON(path.join(cwd, './chomp.json'));
    await executeBuild(cwd, chompfile);
}

main();