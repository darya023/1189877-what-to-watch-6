const path = require('path');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    entry: ['./src/index.js', './src/styles/main.css', './src/styles/styles.scss'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        watchContentBase: true,
        open: true,
        port: 1337,
        historyApiFallback: true,
    },
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            },
        },
        {
            test:/\.(s*)css$/,
            use: [
               miniCss.loader,
               'css-loader',
               'postcss-loader',
               'sass-loader',
            ]
        }
        ],
    },
    plugins: [
        new miniCss({
           filename: './css/main.min.css',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
};