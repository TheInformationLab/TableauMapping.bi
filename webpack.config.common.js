var webpack = require('webpack');

module.exports = {
    entry: {
        'app': './assets/app/main.ts'
    },

    resolve: {
        extensions: ['.js', '.ts', '.less']
    },

    module: {
        rules: [
            {
              test: /\.html$/,
              use: [{ loader: 'html-loader' }]
            },
            {
              test: /\.scss$/,
              use: [
                { loader:  'to-string-loader'},
                { loader: 'style-loader'},
                { loader: 'css-loader'},
                { loader: 'sass-loader'}
              ]
            },
            {
              test: /\.css$/,
              use: [{ loader: 'raw-loader' }]
            }
        ],
        exprContextCritical: false
    },

    // plugins: [
    //     new webpack.ContextReplacementPlugin(
    //         // The (\\|\/) piece accounts for path separators in *nix and Windows
    //         /angular(\\|\/)core(\\|\/)@angular/,
    //         './src' // location of your src
    //     )
    // ]
};
