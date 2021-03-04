const path = require('path');

module.exports = { //se establece configuracion
    entry:'./src/index.js', //punto de entrada de nuestra aplicacion
    output: {   //punto de salida, hacia donde mandamos el proyetco.
        path: path.resolve(__dirname, 'dist'), //utilizamos el path que trajimos
                                                //en la parte inicial, parapoder utilizar resolve, permite saber en que directorio se encuentra nuestro proyecto, evitamos problemas como nombre incorrecto, donde estoy posicionado, etc.
        filename: 'main.js',
    },
    resolve: {
         extensions: ['.js']
    },
    module: {
        rules:[
        {
            test: /\.m?js$/, //expresion regular
            exclude:/node_modules/, //excluye elementos
            use:{
                loader: 'babel-loader'
            }
        }
    ]
    }
}