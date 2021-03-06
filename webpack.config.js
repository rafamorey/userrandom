const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv=require('dotenv-webpack');
const{ CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = { //se establece configuracion
    entry:'./src/index.js', //punto de entrada de nuestra aplicacion
    output: {   //punto de salida, hacia donde mandamos el proyetco.
        path: path.resolve(__dirname, 'dist'), //utilizamos el path que trajimos
                                                //en la parte inicial, parapoder utilizar resolve, permite saber en que directorio se encuentra nuestro proyecto, evitamos problemas como nombre incorrecto, donde estoy posicionado, etc.
        filename: '[name].[contenthash].js',// si se coloca de esta manera podemos optimizar recursos
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
         extensions: ['.js'],
         alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },
    module: {
        rules:[
        {
            test: /\.m?js$/, //expresion regular
            exclude:/node_modules/, //excluye elementos
            use:{
                loader: 'babel-loader'
            }
        },
        {
            test: /\.css|.styl$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader',
            'stylus-loader'
        ],
    },
        {
            test: /\.png/,
            type: 'asset/resource'
        },
        {
            test: /\.(woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: "aplication/font-woff",
                    name:"[name].[contenthash].[ext]",//optimizacion [name].[contenthash].[ext]
                    outputPath: './assets/fonts',
                    publicPath: "../assets/fonts/",
                    esModule: false,
                },
            }
        }
    ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject:true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'//optimizacion
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,"src","assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
        new CleanWebpackPlugin(),
    ],
    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
}