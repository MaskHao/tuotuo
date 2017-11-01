var gulp = require('gulp');

var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var webserver  = require('gulp-webserver');
var clean = require('gulp-clean');
var ftp = require('gulp-ftp');
var autoprefixer = require('gulp-autoprefixer');
var assetRev = require('gulp-asset-rev'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');


//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
    return gulp.src('./scripts/*.js')
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});

gulp.task('sass', function(){
    return gulp.src('./sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer({
                browsers:['Android >= 4.0', 'ios>=8'],
                cascade: false
            })
        )
        .pipe(gulp.dest('./Content/styles'));
});

gulp.task('sass:watch', function(){
    //当scss文件变动，重新编译
    gulp.watch('./sass/*.scss', ['sass']);
});

// gulp.task('revHtml', function () {
//     return gulp.src(['rev/**/*.json', '*.html'])
//         .pipe(revCollector())
//         .pipe(gulp.dest());
// });

gulp.task('default', function(){
    gulp. start('sass', 'sass:watch', 'webserver');
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
            open: 'friendPay.html'
        }));
})