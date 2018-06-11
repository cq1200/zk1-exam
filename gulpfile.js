var gulp = require('gulp'); //连接gulp
var sass = require('gulp-sass'); //编译css
var uglify = require('gulp-uglify'); //压缩js 文件
var minCss = require('gulp-clean-css'); //压缩css文件
var server = require('gulp-webserver'); // 起服务
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean'); // 删除
var sequence = require('gulp-sequence'); // 实现顺序
var url = require('url');
var fs = require('fs');
var path = require('path');
// 起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8090, // 端口
            livereload: true, // 自动刷新
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }
        }))
})

//压缩 scss
gulp.task('css', function() {
    gulp.src('src/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >=4.0']
        }))
        .pipe(minCss())
        .pipe(gulp.dest('dev'));
});

// 压缩js 
gulp.task('uglify', function() {
    gulp.src('src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dev'))
});

// gulp.task('buildCss', function() {
//       gulp.src('src/**/*.scss')
//       .pipe(sass())
//       .pipe(autoprefixer(
//             browers = ['last 2 verions', 'Android >=4.0']
//       ))
//        .pipe(minCss())
//        .pipe(gulp.dest('build'));
//     })
// 监听
gulp.task('watch', function() {
    gulp.watch('src/**/*.scss', ['css']);
})