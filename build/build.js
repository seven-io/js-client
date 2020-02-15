const browserify = require('browserify');
const tsify = require('tsify');

browserify(__dirname + '/main.js', {standalone: 'Sms77Client'})
    .plugin(tsify)
    .bundle()
    .on('error', e => {
        throw new Error(e.toString());
    })
    .pipe(process.stdout);