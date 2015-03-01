module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/src',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'}
        ]
    }
};