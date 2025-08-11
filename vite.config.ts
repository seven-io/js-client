import {resolve} from 'node:path'
import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'
import {nodePolyfills} from 'vite-plugin-node-polyfills'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            fileName: 'seven-client',
            name: 'SevenClient',
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis',
            },
        },
    },
    plugins: [
        dts({
            insertTypesEntry: true,
            include: ['src/**/*'],
            outDir: 'dist'
        }),
        nodePolyfills({
            globals: {
                Buffer: true,
            },
            protocolImports: true,
        }),
    ]
})