const webpack = require("webpack")
const path = require("path")
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === "test" || ENV === "test-watch";
const isProd = ENV === "build";

module.exports = {
    entry: {
        app: path.join(__dirname, "/src/app.main.js")
    },
    output: {
        path: path.join(__dirname, "/dist"),
        publicPath: "/",
        filename: isProd ? "[name].[hash].js" : "[name].bundle.js",
        chunkFilename: isProd ? "[name].[hash].js" : "[name].bundle.js"
    },
    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ]
    },
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.html$/, use: ['html-loader']},
            {test: /src.*\.js$/, use: ['ng-annotate-loader']},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=8192&mimetype=application/font-woff']},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=8192&mimetype=application/font-woff']},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=8192&mimetype=application/octet-stream']},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader']},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=8192&mimetype=image/svg+xml']}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            moment: 'moment',
            'window.moment': 'moment',
            Util: 'exports-loader?Util!bootstrap/js/dist/util'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/public', 'index.html'),
            filename: path.resolve(__dirname, 'index.html'),
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "/src/public"),
        stats: "minimal",
        host: "0.0.0.0",
        disableHostCheck: true,
        port: 9090,
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                secure: false,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
};