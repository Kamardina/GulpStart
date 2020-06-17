// task to build js
module.exports = function () {
  $.gulp.task("js", function () {
    return $.gulp
      .src($.path.src.js)
      .pipe($.plugins.fileInclude())
      .pipe(
        $.plugins.uglifyEs
          .default()
          .on(
            "error",
            $.plugins.notify.onError("JS-Error: <%= error.message %>")
          )
      )
      .pipe($.gulp.dest($.path.build.js))
      .pipe(
        $.plugins.rename({
          extname: ".min.js",
        })
      )
      .pipe($.gulp.dest($.path.build.js))
      .pipe($.browsersync.stream());
  });
};
