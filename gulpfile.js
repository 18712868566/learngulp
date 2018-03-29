// 模块引用
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del'), //清空dist文件夹
    useref = require('gulp-useref'), //会将多个文件拼接成单一文件，并输出到相应目录。
    browserSync = require('browser-sync');


//删除dist下的所有文件  
gulp.task('delete', function(cb) {
    return del(['dist/*', '!dist/images'], cb);
});

//编译scss文件到,指定目录
gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//Browser Sync 帮助我们搭建简单的本地服务器并能实时刷新浏览器
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
    })
});


// 默认操作
gulp.task('default', ['delete', 'browserSync', 'sass'], function() {
    //监听scss文件的变化
    gulp.watch('app/scss/**/*.scss', ['sass']);
    //监听html
    gulp.watch('app/**/*.html', browserSync.reload);
    //监听js
    gulp.watch('app/js/**/*.js', browserSync.reload);
});