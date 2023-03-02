const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    mode: 'development',
    //you can set to multiple entry points here by setting the key to bundle
    //entry : {
        //bundle: path.resolve(__dirname, 'src/index.js')
    //},
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),  
        //if multiple entry points where set in the ehtry using bundle
        //you can write the below as filename: '[name].js' and it will be named the first key under entry i.e. bundle
        filename: '[name].js',
        clean: true, //will only keep one js file instead saving mutiple cached versions
        assetModuleFilename: '[name][ext]'//preserves the file format of original images
    },
    devtool: 'source-map',
    devServer:{
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
             {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
             },
             {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ]
                    }
                }
             },
             {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource'
             }
        ]
    },
    plugins: [
        new Webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            title: "CAT+RABBIT",
            filename: 'index.html',
            template: 'src/template.html',
            //inject: false
        }),
        new BundleAnalyzerPlugin()
    ],
}