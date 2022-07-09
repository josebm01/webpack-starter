const HTMLWebPack = require('html-webpack-plugin');
const MiniCssExtract= require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    mode: 'development',

    // para limpiar los archivos anteriormente creados
    output: {
        clean: true
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
            }
        ]
    },

    optimization: {},

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