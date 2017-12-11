const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const eslint = require('eslint');
const eslintLoader = require('eslint-loader');



const config = {
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
};

module.exports = config;