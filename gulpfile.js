var gulp = require('gulp');
var gulpJade = require('gulp-jade');
var autoprefix = require('gulp-autoprefixer');


var del = require('del');
var browsersync = require('browser-sync');

var src = 'src/', build = 'build/';

var jade = {
  in: [src + '*.jade', src + '**/*.jade'],
  watch: [src + '*.jade', src + '**/*.jade'],
  out: build
};

var css = {
  in: src + '**/*.css',
  watch: src + '**/*.css',
  out: build
}

var js = {
  in: src + '**/*.js',
  watch: src + '**/*.js',
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
    .pipe(autoprefix({
      browsers:['> 5%']
    }))
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
// Copy JS
gulp.task('js', function() {
  return gulp
    .src(js.in)
    .pipe(gulp.dest(js.out));
});
// Copy images folder
gulp.task('images', function() {
  return gulp
    .src(src + 'images/**.*')
    .pipe(gulp.dest(build + 'images/'));
});
// BrowserSync
gulp.task('sync', function() {
  browsersync(syncOpts);
});

// Default Task
gulp.task('default', ['jade', 'css', 'js', 'images', 'sync'], function(){
  gulp.watch(jade.watch, ['jade', browsersync.reload]);
  gulp.watch(css.watch, ['css']);
  gulp.watch(js.watch, ['js', browsersync.reload]);
});
