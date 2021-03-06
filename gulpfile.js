const {src,dest,watch,parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

const autoprefixer = require('autoprefixer');
const csnano = require('cssnano');
const postcss = require('gulp-postcss');

const sourcemaps = require('gulp-sourcemaps')


//Funcion que compilar el CSS 
function compilarCSS (done){
    //Identificar el archivo sass a compilar
    src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    //En caso de haber errores no detiene el workflow
    .pipe(plumber())
    //Compilar
    .pipe( sass() )
    //Mejoras de css
    .pipe(postcss([autoprefixer(),csnano()]))
    .pipe(sourcemaps.write('.'))
    //Almacenarla en el disco duro
    .pipe(dest('build/css'));
    console.log('Compilando SASS');

done();
}
//

//Funcion para compilar javascript 
const terser = require('gulp-terser-js');
function javascript (done){
    src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build.js')),

    done();
}
//Funcion para manter activo un wacht y que cada vez que se hagan cambio en un archivo.scss se modifique la hoja de estilos principal. 
function watchApp (done){
    watch('src/scss/**/*.scss',compilarCSS);
    watch('src/js/**/*.js',javascript);

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
const cssnano = require('cssnano');

function generarImagenAvif (done){
    const opciones = {
        quality:50
    };
    src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'))  
    done();
}
//Funcion para compilar javascript 

function javascript (done){
    src('src/js/**/*.js')
    .pipe(dest('build/js')),

    done();
}

exports.compilarCSS = compilarCSS;
exports.generarImagenWebpp= generarImagenWebpp;
exports.generarImagenMin = generarImagenMin;
exports.generarImagenAvif =generarImagenAvif;
exports.javascript = javascript;

exports.watchApp = parallel(generarImagenWebpp,generarImagenMin,generarImagenAvif,javascript,watchApp);