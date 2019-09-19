const path = require('path');

module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, '../../public/js'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
};
