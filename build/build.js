const browserify = require('browserify');
const tsify = require('tsify');
const {createWriteStream} = require('fs');
const {resolve} = require('path');
const pkg = require('../package.json');

const files = resolve(__dirname, 'main.js');
const opts = {
    standalone: pkg.sms77io.bundleName,
};
const output = resolve(__dirname, '..', pkg.main);

browserify(files, opts)
    .plugin(tsify)
    .bundle()
    .on('error', e => {
        throw new Error(e.toString());
    })
    .pipe(createWriteStream(output));