#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const { executeBuild } = require('./src/build');
const { readChompFile } = require('./chompfile');

async function main() {
    const chompfile = await readChompFile();
    await executeBuild(process.cwd(), chompfile);
}

main();