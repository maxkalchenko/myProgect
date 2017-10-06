var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/index.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/index.html'], ['html']);
});

gulp.task('default', ['connect', 'watch']);

// var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'}); // html
//     res.end('_html-stuff_');
// }).listen(8080);
