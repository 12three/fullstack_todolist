import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import filesize from 'rollup-plugin-filesize'

const env = process.env.PRODUCTION ? 'production' : 'development';

module.exports = {
    input: 'js/index.js',
    output: {
        file: 'public/js/app.js',
        format: 'iife',
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        resolve(),
        commonjs({
            include: ['node_modules/**'],
        }),
        filesize(),
        replace({
            'process.env.NODE_ENV': JSON.stringify(env),
        }),
    ],
};
