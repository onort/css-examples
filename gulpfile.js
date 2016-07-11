var gulp = require('gulp');
var gulpJade = require('gulp-jade');

var del = require('del');
var browsersync = require('browser-sync');

var src = 'src/', build = 'build/';

var jade = {
  in: src + '*.jade',
  watch: src + '*.jade',
  out: build
};

var css = {
  in: src + '*.css',
  watch: src + '*.css',
  out: build
}

var syncOpts = {
  server: {
    baseDir: build,
    index: 'index.html'
  },
  open: true,
  notify: true
}
// Clean Build Folder
gulp.task('clean', function() {
  del([build + '*']);
});
// Copy CSS & Sync
gulp.task('css', function() {
  return gulp
    .src(css.in)
    .pipe(gulp.dest(css.out))
    .pipe(browsersync.reload({ stream: true }));
});
// Compile Jade
gulp.task('jade', function() {
  return gulp
    .src(jade.in)
    .pipe(gulpJade({
      pretty: true
    }))
    .pipe(gulp.dest(jade.out));
});
// BrowserSync
gulp.task('sync', function() {
  browsersync(syncOpts);
});

// Default Task
gulp.task('default', ['jade', 'css', 'sync'], function(){
  gulp.watch(jade.watch, ['jade', browsersync.reload]);
  gulp.watch(css.watch, ['css']);
});
