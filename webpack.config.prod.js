var path = require('path');

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');
var ngw = require('@ngtools/webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = webpackMerge.smart(commonConfig, {
    entry: {
        'app': './assets/app/main.aot.ts'
    },

    output: {
        path: path.resolve(__dirname + '/public/js/app'),
        filename: 'bundle.js',
        publicPath: '/js/app/',
        chunkFilename: '[id].[hash].chunk.js'
    },

    devtool : "cheap-module-source-map",

    module: {
        rules: [
            {
              test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
              loader: '@ngtools/webpack'
            },
            {
              test: /\.ts$/,
              loaders: [
                  'awesome-typescript-loader'
              ]
            },
            {
              test: /\.(ts|js)$/,
              loaders: [
                'angular-router-loader'
              ]
            }
        ]
    },

    plugins: [
        new ngw.AngularCompilerPlugin({
          tsConfigPath: './tsconfig.aot.json',
          entryModule: './assets/app/app.module#AppModule'
        }),
        new UglifyJsPlugin(),
        //new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
             'process.env.NODE_ENV': '"production"'
        }),
        new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0
        })
      ]
});
