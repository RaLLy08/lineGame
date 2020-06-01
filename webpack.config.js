const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssWebpackPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'),
    //watch: true,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../wave-simulator-back/public')
    },
    devServer: {
        port: 7776,
        contentBase: path.resolve(__dirname, './build'),
        hot: true,
        open: true,
        watchContentBase: true,
        watchOptions: {
            ignored: /node_modules/
        },
        writeToDisk: filePath => {
            return /(index.html$)|(bundle.js$)|(style.css$)/.test(filePath);
        }
    },
    module: {
        rules: [
            {test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './images',
                            useRelativePath: true,
                            esModule: false
                        },
                    }
                ]
            },
            {test: /\.html$/, use: 'html-loader'},
            {test: /\.less$/, use: [CssWebpackPlugin.loader, 'css-loader', 'less-loader']},
            {test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins : ['@babel/plugin-proposal-class-properties'],
                    }
                }
            }, 
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new CssWebpackPlugin({
            filename: 'style.css'
        })
    ]

};