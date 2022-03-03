#!/usr/bin/env node
const fs = require('fs-extra');
const { executeBuild } = require('./src/build');

async function main() {
    const chompfile = await fs.readJSON('./chomp.json');
    console.log(await executeBuild(chompfile));
}

main();