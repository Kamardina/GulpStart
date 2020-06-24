// task to build scss
module.exports = function (gulp, plugins, config) {
  const mode = plugins.mode();

  return function (cb) {
    gulp
      .src(config.path.src.sass)
      .pipe(plugins.plumber())
      .pipe(mode.development(plugins.sourcemaps.init()))
      .pipe(
        plugins
          .sass({
            includePaths: config.path.libsSCSS,
            outputStyle: "compressed",
          })
          .on(
            "error",
            plugins.notify.onError("SCSS-Error: <%= error.message %>")
          )
      )
      .pipe(plugins.groupCssMediaQueries())
      .pipe(
        plugins.autoprefixer({
          overrideBrowserslist: ["last 5 version"],
          cascade: true,
        })
      )
      .pipe(
        mode.production(
          plugins.uncss({
            html: [config.path.dest.html + "index.html"],
          })
        )
      )
      .pipe(mode.production(gulp.dest(config.path.dest.css)))
      .pipe(plugins.cleanCss({ compatibility: "ie8" }))
      .pipe(
        plugins.rename({
          suffix: ".min",
        })
      )
      .pipe(mode.development(plugins.sourcemaps.write()))
      .pipe(gulp.dest(config.path.dest.css));

    cb();
  };
};
