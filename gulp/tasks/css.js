// task to build scss
module.exports = function () {
  $.gulp.task("css", function () {
    return $.gulp
      .src($.path.src.css)
      .pipe($.plugins.plumber())
      .pipe($.plugins.sourcemaps.init())
      .pipe(
        $.plugins
          .sass({
            includePaths: $.sassPaths,
            outputStyle: "compressed",
          })
          .on(
            "error",
            $.plugins.notify.onError("SCSS-Error: <%= error.message %>")
          )
      )
      .pipe($.plugins.groupCssMediaQueries())
      .pipe(
        $.plugins.autoprefixer({
          overrideBrowserslist: ["last 5 version"],
          cascade: true,
        })
      )
      .pipe(
        $.plugins.uncss({
          html: ["src/**/*.html"],
        })
      )
      .pipe($.gulp.dest($.path.build.css))
      .pipe($.plugins.cleanCss({ compatibility: "ie8" }))
      .pipe(
        $.plugins.rename({
          extname: ".min.css",
        })
      )
      .pipe($.plugins.sourcemaps.write())
      .pipe($.gulp.dest($.path.build.css))
      .pipe($.browsersync.stream());
  });
};
