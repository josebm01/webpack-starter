const HTMLWebPack = require('html-webpack-plugin');
const MiniCssExtract= require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');


module.exports = {
    mode: 'production',

    // para limpiar los archivos anteriormente creados
    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {
                // Buscando todos ($) los archivos HTML por medio de una expresión regular
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false // mandar imagenes y cosas que se relacionan con el html, en este caso se deja manualmente
                }
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: [ 'style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [ MiniCssExtract.loader, 'css-loader' ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            { // Regla para la configuración de babel (permite que los navegadores se adapten con la versión de javascript)
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },

    // Minimizando (ofuscar) los estilos
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser()
        ]
    },

    plugins: [
        // sin parámetros () agrega el script de importanción del archivo main.js cuando no se indique (index) al html sin nada más
        new HTMLWebPack({
            title: 'Mi webpack App',
            // filename: 'index.html' // por defecto index
            template: './src/index.html' // archivo del cual se debe basar
        }),
        
        new MiniCssExtract({
            filename: '[name].[fullhash].css', // el hash hace un archivo único por cada ejecución de build para no mantenerlo en caché
            ignoreOrder: false
        }),

        new CopyPlugin({ 
           patterns: [
               { from: 'src/assets/', to: 'assets/' }
           ]
        })
    ]
}