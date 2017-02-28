var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
})


var osmAuthLandingPage = new HtmlWebpackPlugin({
    template: __dirname + '/app/land.html',
    filename: 'land.html',
})


module.exports = {
    entry: [
        './app/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: "index_bundle.js"
    },
    module: {
        loaders: [
            {  test: /\.(png|jpg|gif)$/,  loader: 'url-loader'  },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    plugins: [HtmlWebpackPluginConfig,osmAuthLandingPage],
    node: {
        fs: "empty"
    }

}
