const {src,dest,watch,parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');


//Funcion que compilar el CSS 
function compilarCSS (done){
    //Identificar el archivo sass a compilar
    src('src/scss/**/*.scss')
    //En caso de haber errores no detiene el workflow
    .pipe(plumber())
    //Compilar
    .pipe( sass() )
    //Almacenarla en el disco duro
    .pipe(dest('build/css'));
    console.log('Compilando SASS');

done();
}
//Funcion para manter activo un wacht y que cada vez que se hagan cambio en un archivo.scss se modifique la hoja de estilos principal. 
function watchApp (done){
    watch('src/scss/**/*.scss',compilarCSS);

    done();
}
//Img
const webp = require('gulp-webp');
function generarImagenWebpp (done){
    const opciones = {
        quality:50
    };
    src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'));
    

    done();
}
//Image min 
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

function generarImagenMin (done){
    const opciones = {
        optimizationLevel:3
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))  
    done();
}
//Funcion para generar imagenes AVIF
const avif = require('gulp-avif');

function generarImagenAvif (done){
    const opciones = {
        quality:50
    };
    src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'))  
    done();
}

exports.compilarCSS = compilarCSS;
exports.generarImagenWebpp= generarImagenWebpp;
exports.generarImagenMin = generarImagenMin;
exports.generarImagenAvif =generarImagenAvif;

exports.watchApp = parallel(generarImagenWebpp,generarImagenMin,generarImagenAvif,watchApp);