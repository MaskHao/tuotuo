var gulp = require('gulp');

var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var webserver  = require('gulp-webserver');
var clean = require('gulp-clean');
var ftp = require('gulp-ftp');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
    return gulp.src('./sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer({
                browsers:['Android >= 4.2', 'ios>=8'],
                cascade: false
            })
        )
        .pipe(gulp.dest('./dist/css'));
})

gulp.task('sass:watch', function(){
    //当scss文件变动，重新编译
    gulp.watch('./sass/*.scss', ['sass'])
})

gulp.task('imagemin', function(){
    gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
})

// gulp.task('compress', function(cb){
//     pump([
//         gulp.src('./js/*.js'),
//         uglify(),
//         rename('v.min.js'),
//         gulp.dest('./dist/js')
//             .pipe(connect.reload())
//         ],
//         cb
//     );
// })
gulp.task('compress', ['clean-scripts'], function(cb){
    return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(rename('v.min.js'))
        .pipe(gulp.dest('./dist/js'));
        // .pipe(webserver.reload())
})

gulp.task('compress:watch', function(){
    gulp.watch('./js/*.js', ['compress'])
})

gulp.task('clean-scripts', function(){
    return gulp.src('./dist/js/*.js')
        .pipe(clean())
})

// gulp.task('watch', function(){
//    
//     var server = livereload();
//     gulp.watch('./dist/**', function(file){
//         server.changed(file.path);
//     });
//    
//     // livereload.listen();
//     // gulp.watch(['dist/**']).on('change', function(file){
//     //     server.changed(file.path);
//     // })
// })

gulp.task('minifyhtml', function() {
    return gulp.src('./*.html')
        // .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/html'))
})



gulp.task('default', function(){
    gulp.start('minifyhtml', 'sass', 'sass:watch',  'webserver', 'compress', 'compress:watch');

})
gulp.task('scp', ['compress'], function () {
    return gulp.src('./dist/**/*')
        .pipe(ftp({
            host: '192.168.0.55',
            user: 'ftp',
            port: 21,
            pass: 'Wym137138702'
        }))
        .on('error', function (err) {
            console.log(err);
        });
})

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: 'heath.html'
        }));
})