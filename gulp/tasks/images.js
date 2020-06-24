// task to build images
module.exports = function (gulp, plugins, config) {
  return function (cb) {
    gulp
      .src(config.path.src.img)
      .pipe(plugins.plumber())
      .pipe(
        plugins.imagemin({
          progressive: true,
          svgoPlugins: [
            {
              removeViewBox: false,
            },
          ],
          interlaced: true,
          optimizationLevel: 3,
        })
      )
      .pipe(gulp.dest(config.path.dest.img));

    cb();
  };
};
