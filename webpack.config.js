var webpack = require('webpack');
var path = require('path');

// variables
var isProduction = process.argv.indexOf('-p') >= 0;
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './dist');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');

if (isProduction) {
	var copydir = require('copy-dir');
	copydir.sync(sourcePath + '/assets', outPath + '/assets');
}

module.exports = {
    context: sourcePath,
    entry: {
        main: ['core-js/fn/promise', 'locale-compare-polyfill', 'core-js/fn/symbol', './index.tsx'],
        vendor: [
            'axios',
			'classnames',
            'core-js',
            'flux-standard-action',
			'immutable',
			'muicss',
			'react',
            'react-append-to-body',
			'react-dom',
            'react-menu-list',
			'react-redux',
            'react-redux-typescript',
            'react-router',
            'react-tooltip',
            'react-select',
			'redux',
            'redux-actions'
        ]
    },
    output: {
        path: outPath,
        publicPath: '/',
        filename: 'bundle.js',
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        // Fix webpack's default behavior to not load packages with jsnext:main module
        // https://github.com/Microsoft/TypeScript/issues/11677
        mainFields: ['main'],
        modules: ['node_modules', sourcePath]
    },
    module: {
        loaders: [
            // .ts, .tsx
            {
                test: /\.tsx?$/,
                use: isProduction
                    ? 'awesome-typescript-loader?module=es6'
                    : [
                        'react-hot-loader',
                        'awesome-typescript-loader'
                    ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                importLoaders: 1,
                                localIdentName: '[local]__[hash:base64:5]'
                            }
                        }
                    ]
                })
            },
            // pcss
            {
                test: /\.pcss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                sourceMap: !isProduction,
                                importLoaders: 1,
                                localIdentName: '[local]__[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                })
            },
            // static assets
            {test: /\.html$/, use: 'html-loader'},
            {test: /\.png$/, use: 'url-loader?limit=10000'},
            {test: /\.jpg$/, use: 'file-loader'},
        ],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: sourcePath,
                postcss: [
                    require('postcss-import')({addDependencyTo: webpack}),
                    require('postcss-url')(),
                    require('postcss-cssnext')({
                        features: {
                            calc: false
                        }
                    }),
                    require('postcss-reporter')(),
                    require('postcss-browser-reporter')({disabled: isProduction}),
                ]
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
            minChunks: Infinity
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: !isProduction
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new Visualizer({
            filename: './statistics.html'
        })
    ],
    devServer: {
        contentBase: sourcePath,
        hot: true,
        stats: {
            warnings: false
        },
    },
    node: {
        // workaround for webpack-dev-server issue
        // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
        fs: 'empty',
        net: 'empty'
    }
};
