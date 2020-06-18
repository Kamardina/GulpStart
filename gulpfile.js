const projectFolder = "dist"; // <-folder to return the result
const sourceFolder = "./src"; // <-source folder

global.$ = {
  projectFolder, // <-folder to return the result
  sourceFolder, // <-source folder

  path: {
    task: require("./gulp/paths/tasks.js"),
    build: {
      // paths to build
      html: projectFolder + "/",
      css: projectFolder + "/css/",
      js: projectFolder + "/js/",
      img: projectFolder + "/img/",
      lib: projectFolder + "/lib",
    },
    src: {
      // paths to source files
      html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
      css: sourceFolder + "/scss/style.scss",
      js: sourceFolder + "/js/script.js",
      img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    watch: {
      // paths to modify files
      html: sourceFolder + "/**/*.html",
      css: sourceFolder + "/scss/**/*.scss",
      js: sourceFolder + "/js/**/*.js",
      img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + projectFolder + "/",
  },
  sassPaths: "node_modules/foundation-sites/scss",
  jqueryPaths: "node_modules/jquery/dist/jquery.min.js",
  gulp: require("gulp"),
  browsersync: require("browser-sync").create(),
  del: require("del"),
  plugins: require("gulp-load-plugins")(),
};

$.path.task.forEach(function (taskPath) {
  require(taskPath)();
});
$.gulp.task(
  "build",
  $.gulp.series(
    "clean",
    $.gulp.parallel("js:lib", "js", "css", "html", "images")
  )
);
$.gulp.task(
  "default",
  $.gulp.series("build", $.gulp.parallel("watchFiles", "browserSync"))
);
