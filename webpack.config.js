const path = require('path');
var htmlPlugin = require('html-webpack-plugin');
var cssPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './app/app.main.js',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 1000
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [{
            test: /\.html$/,
            include: [
                path.resolve(__dirname, 'app/views')
            ],
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'views/[name].[ext]',
                    context: ''
                }
            }]
        }, {
            test: /\.scss$/,
            use: [
                cssPlugin.loader,
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    plugins: [
        new htmlPlugin({
            filename: 'index.html',
            template: 'app/index.html'
        }),
        new cssPlugin({
            file: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};
