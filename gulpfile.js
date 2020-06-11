let project_folder = require("path").basename(__dirname); // <-folder to return the result
let source_folder = "src"; // <-source folder

let path = {
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
};

let { src, dest } = require("gulp"), // <-connect plugins
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  del = require("del"),
  fileinclude = require("gulp-file-include"),
  groupMedia = require("gulp-group-css-media-queries"),
  cleanCSS = require("gulp-clean-css"),
  uglify = require("gulp-uglify-es").default,
  notify = require("gulp-notify"),
  plugins = require("gulp-load-plugins")();

// init localserver
function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/",
    },
    port: 3000,
    notify: false,
  });
}
// task to build html
function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

// task to build scss
function css() {
  return src(path.src.css)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(
      plugins.sass({
        outputStyle: "expanded",
      })
    )
    .pipe(groupMedia())
    .pipe(
      plugins.autoprefixer({
        overrideBrowserslist: ["last 5 version"],
        cascade: true,
      })
    )
    .pipe(dest(path.build.css))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(
      plugins.uncss({
        html: ["src/**/*.html"],
      })
    )
    .pipe(
      plugins.rename({
        extname: ".min.css",
      })
    )
    .pipe(plugins.sourcemaps.write())
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

// task to build js
function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(
      uglify().on("error", notify.onError("JS-Error: <%= error.message %>"))
    )
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      plugins.rename({
        extname: ".min.js",
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

// task to build images
function images() {
  return src(path.src.img)
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
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

// watch the specified files
function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

// Cleaning tasks
function clean(params) {
  return del(path.clean);
}

// Build tasks
let build = gulp.series(clean, gulp.parallel(js, css, html, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

// Exports a task that calls a function
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
