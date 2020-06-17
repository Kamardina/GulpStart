// task to build images
module.exports = function () {
  $.gulp.task("images", function () {
    return $.gulp
      .src($.path.src.img)
      .pipe(
        $.plugins.imagemin({
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
      .pipe($.gulp.dest($.path.build.img))
      .pipe($.browsersync.stream());
  });
};
