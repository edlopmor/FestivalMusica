const {src,dest,watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');



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
function watchApp (done){
    watch('src/scss/**/*.scss',compilarCSS);

    done();
}

exports.compilarCSS = compilarCSS;
exports.watchApp = watchApp;