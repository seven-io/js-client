const browserify = require('browserify')
const tsify = require('tsify')
const {createWriteStream} = require('fs')
const {resolve} = require('path')
const pkg = require('../package.json')
const babelify = require('babelify')

const files = resolve(__dirname, '../src/index.ts')
const opts = {
    standalone: 'SevenApi',
}
const output = resolve(__dirname, '..', pkg.main)

browserify(files, opts)
    .plugin(tsify)
    .transform(babelify, {extensions: ['.ts'], presets: ['@babel/preset-env']})
    .bundle()
    .on('error', e => {
        throw new Error(e.toString())
    })
    .pipe(createWriteStream(output))
