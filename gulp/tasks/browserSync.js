// init localserver
module.exports = function () {
  $.gulp.task("browserSync", function () {
    $.browsersync.init({
      server: {
        baseDir: "./" + $.project_folder + "/",
      },
      port: 3000,
      notify: false,
    });
  });
};
