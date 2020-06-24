// task to build js
module.exports = function (gulp, plugins, config) {
  return function (cb) {
    gulp
      .src([...config.path.libsJS, config.path.src.js])
      .pipe(plugins.plumber())
      .pipe(plugins.concat("scripts.js"))
      .pipe(
        plugins.uglifyEs
          .default()
          .on("error", plugins.notify.onError("JS-Error: <%= error.message %>"))
      )
      .pipe(gulp.dest(config.path.dest.js))
      .pipe(
        plugins.rename({
          suffix: ".min",
        })
      )
      .pipe(gulp.dest(config.path.dest.js));

    cb();
  };
};
