import typescript from '@rollup/plugin-typescript'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import pkg from './package.json' with {type: 'json'}

// noinspection JSUnusedGlobalSymbols
export default {
    input: 'src/index.ts',
    output: {
        file: pkg.main,
        format: 'es'
    },
    plugins: [
        typescript(),
        nodeResolve()
    ]
}