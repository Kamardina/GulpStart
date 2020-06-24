const gulp = require("gulp");
const plugins = require("gulp-load-plugins")();
plugins.del = require("del");
plugins.browserSync = require("browser-sync").create();

const destinationFolder = "./dest/"; // <-folder to return the result
const sourceFolder = "./src"; // <-source folder

const config = {
  destinationFolder, // <-folder to return the result
  sourceFolder, // <-source folder
  path: {
    dest: {
      // paths to build
      html: destinationFolder + "/",
      css: destinationFolder + "/css/",
      js: destinationFolder + "/js/",
      img: destinationFolder + "/img/",
      lib: destinationFolder + "/lib",
    },
    src: {
      // paths to source files
      html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
      sass: sourceFolder + "/scss/style.scss",
      js: sourceFolder + "/js/scripts.js",
      img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    watch: {
      // paths to modify files
      html: sourceFolder + "/**/*.html",
      sass: sourceFolder + "/scss/**/*.scss",
      js: sourceFolder + "/js/**/*.js",
      img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: destinationFolder,
    libsSCSS: ["node_modules/foundation-sites/scss"],
    libsJS: ["node_modules/jquery/dist/jquery.min.js"],
  },
};

gulp.task("clean", require("./gulp/tasks/clean")(plugins, config));

gulp.task("sass", require("./gulp/tasks/sass")(gulp, plugins, config));

gulp.task("html", require("./gulp/tasks/html")(gulp, plugins, config));

gulp.task(
  "javascript",
  require("./gulp/tasks/javascript")(gulp, plugins, config)
);

gulp.task("images", require("./gulp/tasks/images")(gulp, plugins, config));

gulp.task(
  "build",
  gulp.series("clean", gulp.parallel("javascript", "sass", "html", "images"))
);

gulp.task("watch", function () {
  plugins.browserSync.init({
    server: {
      baseDir: destinationFolder,
    },
    port: 3000,
    notify: false,
  });
  gulp
    .watch([config.path.watch.html], gulp.series("html"))
    .on("change", plugins.browserSync.reload);
  gulp
    .watch([config.path.watch.sass], gulp.series("sass"))
    .on("change", plugins.browserSync.reload);
  gulp
    .watch([config.path.watch.js], gulp.series("javascript"))
    .on("change", plugins.browserSync.reload);
  gulp
    .watch([config.path.watch.img], gulp.series("images"))
    .on("change", plugins.browserSync.reload);
});

gulp.task("default", gulp.series("build", "watch"));
