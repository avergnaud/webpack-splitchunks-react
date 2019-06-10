const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const config = require('config');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');

/*-------------------------------------------------*/

module.exports = {
    // webpack optimization mode
    mode: ( process.env.ENV ? process.env.ENV : 'development' ),

    // entry file(s)
    entry: './src/index.js',

    // output file(s) and chunks
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/'
    },

    // module/loaders configuration
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                      loader: 'babel-loader',
                      options: {
                        presets : [ "env", "react" ],
                        plugins : [ 
                            "transform-decorators-legacy",
                            "transform-class-properties",
                            "transform-object-rest-spread",
                            "syntax-dynamic-import"
                        ]
                      }
                    }
                  ],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        }),
        new AsyncChunkNames()
    ],

    /* development server configuration
    https://webpack.js.org/configuration/dev-server/ */
    devServer: {
        
        // must be `true` for SPAs
        historyApiFallback: true,

        // open browser on server start
        open: config.get('open')
    },

    // generate source map
    devtool: ( 'production' === process.env.ENV ? 'source-map' : 'cheap-module-eval-source-map' ),

    optimization: {
        splitChunks : {
            cacheGroups: {
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
            },
            /*
            "adding optimization.splitChunks.chunks = 'all' is a way of saying “put everything in
             node_modules into a file called vendors~main.js"."
            */
            chunks: 'all'
        }
    }
};

