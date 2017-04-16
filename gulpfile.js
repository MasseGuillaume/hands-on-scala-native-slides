var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    gulpUtil = require('gulp-util'),
    // concat = require('gulp-concat'),
    express = require('express'),
    https = require('https'),
    http = require('http'),
    fs = require('fs'),
    less = require('gulp-less'),
    livereload = require('connect-livereload'),
    refresh = require('gulp-livereload'),
    gulpFilter = require('gulp-filter'),
    rename = require('gulp-rename'),
    request = require('request'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    gutil = require('gulp-util'),
    rev = require('gulp-rev');

var useHttps = false,
    i = 0,
    livereloadport = 35729 + i,
    serverport = 5443 + i,
    apiport = 7331 + i,
    lrserver = require('tiny-lr')();

function serveF(assets){
  var server = express();

  server.use(livereload({port: livereloadport}));

  assets.forEach(function(a){
      server.use(express.static(a));
  });

  server.use(function(req, res) {
    req.pipe(request("http://localhost:" + serverport)).pipe(res);
  });

  http.createServer(server).listen(serverport);

  lrserver.listen(livereloadport);
}

gulp.task('styles', function() {
  return gulp.src('styles/main.less')
        .pipe(plumber()) 
        .pipe(less())
        .pipe(gulp.dest('tmp/styles'))
        .pipe(refresh(lrserver));
});

gulp.task('html', function(){
  gulp.src('web/**/*.html').pipe(refresh(lrserver));
});

gulp.task('js', function(){
  gulp.src('web/**/*.js').pipe(refresh(lrserver));
});

gulp.task('default', function() {
  gulp.start('styles', 'reveal', 'serve', 'watch');
});

gulp.task('serve', function(){
  serveF(['web', 'bower_components', 'tmp']);
});

gulp.task('watch', function() {
  gulp.watch('styles/**/*.less', ['styles']);
  gulp.watch('web/**/*.html', ['html']);
  gulp.watch('web/**/*.js', ['js']);
});

gulp.task('build', ['styles', 'usemin', 'reveal', 'screenshoot']);
gulp.task('buildServe', ['build', 'serveDist']);

gulp.task('serveDist', function(){
  serveF(['docs']);
});

gulp.task('reveal', function(){
  gulp.src('bower_components/reveal.js/plugin/highlight/highlight.js')
    .pipe(gulp.dest('docs/reveal.js/plugin/highlight'));
});

gulp.task('screenshoot', function(){
  gulp.src('web/out.gif')
    .pipe(gulp.dest('docs/'));
});

gulp.task('usemin', ['styles'], function() {
  var index = gulpFilter(['**/index.html']);

  gulp.src('web/index.html')
    .pipe(usemin())
    .pipe(gulp.dest('docs/'))
    .pipe(index)
    .pipe(gulp.dest('docs/assets/'))

});