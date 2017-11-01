/**
 * Created by WillWang on 2016/11/24.
 */
//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),             //本地安装gulp所用到的地方
    less = require('gulp-less'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),            //当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
    plumber = require('gulp-plumber'),
    // sourcemaps = require('gulp-sourcemaps'),    //生成对应的sourcemaps文件，方便以后修改文件
    cssmin = require('gulp-minify-css'),        //压缩
    uglify = require('gulp-uglify'),           //js压缩
    rename = require('gulp-rename'),            //重命名
    concat = require('gulp-concat'),            //合并js文件，减少网络请求
    imagemin = require('gulp-imagemin'),        //图片压缩
    pngquant = require('imagemin-pngquant'),   //深度压缩png图片
    rev = require('gulp-rev-append'),         //给页面添加版本号，清除页面引用缓存
    autoprefixer = require('gulp-autoprefixer');    //根据游览器版本自动处理游览器前缀（尤其是移动端）
    // livereload = require('gulp-livereload');        //监听文件发生变化时，游览器自佛那个刷新页面

var browserSync = require('browser-sync');
var reload = browserSync.reload;







//定义一个testLess任务（自定义任务名称）
// gulp.task('less', function () {
//     //除了reset.less和test.less（**匹配src/less的0个或多个子文件夹）
//     // gulp.src(['src/less/*.less', '!src/less/**/{reset,test}.less'])
//     // "!":排除important里面的less不生成css
//     // gulp.src(['./src/less/index-1.less', '!./src/less/important/**/*.less']
//
//     gulp.src('src/less/*.less')         //该任务针对的文件
//         // .pipe(sourcemaps.init())
//         .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
//         .pipe(less())                   //该任务调用的模块
//         .pipe(autoprefixer({
//             browsers: ['Android >= 4.2', 'ios>=8'],
//             cascade: true
//         }))
//         // .pipe(concat('less.css'))       //合并所有的less形成的css
//         .pipe(cssmin())                 //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
//         // .pipe(sourcemaps.write())
//         .pipe(gulp.dest('dist/css'))    //将会在src/css下生成index.css
//         // .pipe(livereload());
// });

gulp.task('sass',function () {
    return gulp.src(['scss/*.scss','!scss/normalize.scss'])
    // return gulp.src('scss/*.scss')
        // .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        // .pipe(rename({suffix: '.min'}))
        // .pipe(cssmin())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({ stream: true }));
});



gulp.task('jsmin',function () {
    //压缩src/js下的所有js文件
    //除了test1.js,test2.js
    // gulp.src(['js/*.js','!js/**/{test1,test2}.js'])
     return gulp.src('js/*.js')
        // .pipe(concat('all.min.js'))      //合并js
        // .pipe(rename({suffix: '.min'}))
        // //压缩js
        // .pipe(uglify({
        //     // mangle:{except: ['require', 'exports', 'module', '$']},  //排除混淆关键字
        //     mangle:true,            //Boolean类型 默认true 是否改变变量名
        //     compress: true         //boolean类型 默认true 是否完全压缩
        //     // preserveComments: 'all' //保留所有注释
        // }))
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({ stream:true }));
});

gulp.task('imgmin',function () {
    gulp.src('image/*.{png,jpg,gif,ico}')
        .pipe(imagemin(
            {
            optimizationLevel: 5,           //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true,              //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true,               //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true,                //类型：Boolean 默认：false 多次优化svg直到完全优化
            svgoPlugins:[{removeViewBox: false}], //不移除svg的viewbox属性
            use: [pngquant()]               //使用pngquant深度压缩png图片的imagemin插件
        }
        ))
        .pipe(imagemin())
        .pipe(reload({ stream:true }))
        .pipe(gulp.dest('dist/image'))
        .pipe(notify({ message: 'Image task complete' }));
});

gulp.task('testPev',function () {
    gulp.src('*.html')
        // .pipe(rev())
        .pipe(gulp.dest('dist'));
});

gulp.task('serve',['sass','jsmin','imgmin'],function () {
    browserSync.init({
        server:{
            baseDir:'./'
        }
    });
     gulp.watch('scss/*.scss',['sass']);
     gulp.watch("*.html").on('change', reload);
     gulp.watch("js/*.js", ['jsmin']);
     gulp.watch('image/*',['imgmin']);

});


gulp.task('default',['testPev','serve']); //定义默认任务