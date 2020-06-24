// task to build html
module.exports = function (gulp, plugins, config) {
  return function (cb) {
    gulp
      .src(config.path.src.html)
      .pipe(plugins.plumber())
      .pipe(plugins.fileInclude())
      .pipe(gulp.dest(config.path.dest.html));

    cb();
  };
};
