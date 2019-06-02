const path = require('path');
const webpack = require('webpack');
const HtmlWepackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const rootPath = path.resolve(process.cwd());
const srcPath = path.resolve(rootPath, 'src');
const distPath = path.resolve(rootPath, 'dist');
const assetPath = path.join(srcPath, 'assets');

module.exports = {
    entry: {
        app: path.join(assetPath, 'js/app.js'),
        main: path.join(assetPath, 'js/main.js')
    },
    output: {
        filename: 'js/[name].[hash].bundle.js',
        path: distPath
    },
    plugins: [
        new HtmlWepackPlugin({
            template: path.join(srcPath, 'template.html'),
            filename: 'index.html',
            favicon: path.join(assetPath, 'icon.ico'),
            minify: {
                collapseWhitespace: true,
                preserveLineBreaks: true,
                removeComments: true,
                minifyJS: true,
                minifyCSS: true
            }
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[hash].css'
        }),
        new CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // node_modules中出来的都打到这个文件中
                return module.context && module.context.includes("node_modules");
            }
        }),
        new CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new webpack.HashedModuleIdsPlugin(),
    ],
    module: {
        rules: [{
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            }, {
                loader: 'expose-loader',
                options: '$'
            }]
        }, {
            test: /\.css$/,
            loaders: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            }),
            exclude: [path.join(rootPath, 'node-modules')]
        }, {
            test: /\.scss/,
            loaders: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        alias: {
            '@': srcPath,
            '@scss': path.join(assetPath, 'scss')
        }
    },
    devServer: {
        open: true
    }
}
