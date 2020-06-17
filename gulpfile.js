const project_folder = require("path").basename(__dirname); // <-folder to return the result
const source_folder = "./src"; // <-source folder

global.$ = {
  project_folder: require("path").basename(__dirname), // <-folder to return the result
  source_folder, // <-source folder

  path: {
    task: require("./gulp/paths/tasks.js"),
    build: {
      // paths to build
      html: project_folder + "/",
      css: project_folder + "/css/",
      js: project_folder + "/js/",
      img: project_folder + "/img/",
    },
    src: {
      // paths to source files
      html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
      css: source_folder + "/scss/style.scss",
      js: source_folder + "/js/script.js",
      img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    watch: {
      // paths to modify files
      html: source_folder + "/**/*.html",
      css: source_folder + "/scss/**/*.scss",
      js: source_folder + "/js/**/*.js",
      img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/",
  },
  sassPaths: "node_modules/foundation-sites/scss",
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
  $.gulp.series("clean", $.gulp.parallel("js", "css", "html", "images"))
);
$.gulp.task(
  "default",
  $.gulp.series("build", $.gulp.parallel("watchFiles", "browserSync"))
);
