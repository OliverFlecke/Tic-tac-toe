'use strict';

module.exports = (env) => {
    if (!env) {
        env = {};
    }

    const path = require('path');
    const CssoWebpackPlugin = require('csso-webpack-plugin').default;
    const webpack = require('webpack');
    const process = require('process');

    const isProduction = process.env.NODE_ENV.trim() === 'production';
    const isDevelopment = !isProduction;
    const isHotMode = process.argv.find((a) => { return a.indexOf('webpack-dev-server') >= 0; }) && process.argv.find((a) => { return a.indexOf('--hot') >= 0; });

    const distFolderName = 'dist';
    const distFolder = path.resolve(__dirname, distFolderName);
    const devFolderName = 'dev';
    const devFolder = path.resolve(__dirname, devFolderName);
    const hotPort = 8080;

    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    let config = {
        entry: {
            main: './src/index.tsx',
        },
        output: {
            path: distFolder,
            filename: 'js/[name].js',
            publicPath: '/',
            libraryTarget: 'var',
            library: '[name]'
        },
        resolve: {
            extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.tsx', '.css'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }]
                },
                {
                    test: /\.css$/,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'typings-for-css-modules-loader',
                            options: {
                                camelCase: true,
                                modules: true,
                                namedExport: true,
                                localIdentName: `[local]--[hash:base64]`,
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader'
                        },
                    ]
                },
                {
                    test: /\.(woff)$/,
                    loader: 'url-loader?limit=64000&mimetype=application/font-woff&name=[name].[ext]'
                },
                {
                    test: /\.png$/,
                    loader: 'url-loader?mimetype=image/png'
                },
                {
                    test: /\.svg$/,
                    loader: 'url-loader?mimetype=image/svg+xml'
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "css/[name].css",
            })
        ],
        // watchOptions: {
        //     aggregateTimeout: 10000,
        //     poll: 5000
        // },
        devtool: "inline-source-map",
    }

    if (isHotMode) {
        // Update all entry points to use HMR
        for (let entry of Object.keys(config.entry)) {
            config.entry[entry] = ['webpack-dev-server/client?http://localhost:' + hotPort, 'webpack/hot/only-dev-server'].concat(config.entry[entry]);
        }

        // Enable NamedModulesPlugin to display friendly console output from HMR
        config.plugins.push(new webpack.NamedModulesPlugin());

        // Find the tsx config rule
        config.module.rules.find(
            (rule) => {
                return rule.test.toString() === /\.tsx?$/.toString()
            }
        )
        // Add babel-loader as the first loader with the react-hot-loader plugin enabled
        .use.unshift(
            {
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    plugins: ['react-hot-loader/babel'],
                },
            }
        );
    }

    if (isDevelopment) {
        // Use debug output filename
        config.output.filename = 'js/[name].debug.js';

        // Use debug output directory
        config.output.path = devFolder;

        // Configure webpack-dev-server
        config.devServer = {
            // Set the dev server port
            port: hotPort,

            // Corresponds to config.output.path
            contentBase: devFolder,

            // Corresponds to config.output.publicPath
            publicPath: '/',
        };
    }

    if (isProduction) {
        // Minify production CSS with CSSO
        config.plugins.push(new CssoWebpackPlugin());
    }

    return config;
}