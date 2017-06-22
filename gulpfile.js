/**
 * Created by GeancarloCE on 31/03/2017.
 */
/*importar los modulos y plugin que se
 usaran. Cada uno se importa con require('modulo')*/
var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

/*Crear la tarea  */
/*creas un metodo
 gulp.task('nombre de la tarea',funcion(){
 hacemos lo que quieras
 });
 */


gulp.task('pug', function () {
    gulp.src('./pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./')).on('end',browserSync.reload);
});






gulp.task('sass', function () {
    /*   *.scss  indica todos los archivos .scss    */
    return gulp.src('./scss/**/*.scss')
    /*para pasar sass y si hay error nos genera un log*/
        .pipe(sass().on('error', sass.logError))
        /*para pasar los autoprefixer*/
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: true
        }))
        /*a que destino se han ido los destinos procesados*/
        .pipe(gulp.dest('./css'))
        /*cargar el css del browser cuando carga*/
        .pipe(browserSync.stream());
});




/*serve por default para evitar en la consola de git solo gulp*/
gulp.task('default',['sass','pug'], function () {

    browserSync.init({
        /*    aqui modificamos ./app por  ./     */
        server: "./"
    });
    /*aqui colocaremos la ruta de nuestro archivo sass*/
    gulp.watch("./scss/**/*.scss", ['sass']);
    gulp.watch("./pug/**/*.pug", ['pug']);
    /*Vigila todos los html en este caso vigilara nuestro index.html y colocaremos la ruta*/
    gulp.watch("/*.html").on('change', browserSync.reload);

    //mira los js
    gulp.watch("./js/*.js").on('change', browserSync.reload);

});

