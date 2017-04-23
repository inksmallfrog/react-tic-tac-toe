/*
* @Author: inksmallfrog
* @Date:   2017-04-24 07:03:45
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-24 07:38:14
*/

'use strict';

let path = require('path');
let webpack = require('webpack')

module.exports = {
    entry: {
        app: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js'
    },
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: [".js"]
    },
    module:{
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react', 'es2015']
                        }
                    }
                ]
            },
            {
                test: /\.s[a|c]ss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-smart-import')({ /* ...options */ }),
                                require('precss')({ /* ...options */ }),
                                require('autoprefixer')({
                                    browsers: ["last 2 version", "Firefox 15"]
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded'
                        }
                    }
                ]
            }
        ]
    }
}
