const path = require('path');

module.exports = {
    entry: './index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    node: {
      fs: "empty"
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                //loader:'ts-loader' ,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
    ]
}   

