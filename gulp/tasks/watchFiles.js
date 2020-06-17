// watch the specified files
module.exports = function () {
  $.gulp.task("watchFiles", function () {
    $.gulp.watch([$.path.watch.html], $.gulp.series("html"));
    $.gulp.watch([$.path.watch.css], $.gulp.series("css"));
    $.gulp.watch([$.path.watch.js], $.gulp.series("js"));
    $.gulp.watch([$.path.watch.img], $.gulp.series("images"));
  });
};
