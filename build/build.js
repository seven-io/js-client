const browserify = require('browserify');
const tsify = require('tsify');
const {sms77io} = require('../package.json');

const entry = __dirname + '/main.js';
const opts = {
    standalone: sms77io.bundleName,
};

browserify(entry, opts)
    .plugin(tsify)
    .bundle()
    .on('error', e => {
        throw new Error(e.toString());
    })
    .pipe(process.stdout);