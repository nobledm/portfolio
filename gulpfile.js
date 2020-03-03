const gulp = require("gulp"),
  devBuild = process.env.NODE_ENV !== "production",
  src = "src/",
  build = "build/",
  noop = require("gulp-noop"),
  newer = require("gulp-newer"),
  imagemin = require("gulp-imagemin"),
  htmlclean = require("gulp-htmlclean"),
  concat = require("gulp-concat"),
  deporder = require("gulp-deporder"),
  terser = require("gulp-terser"),
  stripdebug = devBuild ? null : require("gulp-strip-debug"),
  sourcemaps = devBuild ? require("gulp-sourcemaps") : null,
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  assets = require("postcss-assets"),
  autoprefixer = require("autoprefixer"),
  mqpacker = require("css-mqpacker"),
  cssnano = require("cssnano");

function images() {
  const out = build + "images/";

  return gulp
    .src(src + "images/**/*")
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
}

function index() {
  const out = build;

  return gulp
    .src(src + 'index.html')
    .pipe(newer(out))
    .pipe(devBuild ? noop() : htmlclean())
    .pipe(gulp.dest(out));
}

function html() {
  const out = build + "pages/";

  return gulp
    .src(src + "pages/**/*")
    .pipe(newer(out))
    .pipe(devBuild ? noop() : htmlclean())
    .pipe(gulp.dest(out));
}

function js() {
  return gulp
    .src(src + "js/**/*")
    .pipe(sourcemaps ? sourcemaps.init() : noop())
    .pipe(deporder())
    .pipe(concat("main.js"))
    .pipe(stripdebug ? stripdebug() : noop())
    .pipe(terser())
    .pipe(sourcemaps ? sourcemaps.write() : noop())
    .pipe(gulp.dest(build + "js/"));
}

function css() {
  return gulp
    .src(src + "scss/style.scss")
    .pipe(sourcemaps ? sourcemaps.init() : noop())
    .pipe(
      sass({
        outputStyle: "nested",
        imagePath: "/images/",
        precision: 3,
        errLogToConsole: true
      }).on("error", sass.logError)
    )
    .pipe(
      postcss([
        assets({ loadPaths: ["images/"] }),
        autoprefixer(),
        mqpacker,
        cssnano
      ])
    )
    .pipe(sourcemaps ? sourcemaps.write() : noop())
    .pipe(gulp.dest(build + "css/"));
}

exports.html = gulp.series(images, index, html);
exports.js = js;
exports.css = gulp.series(images, css);

exports.build = gulp.parallel(exports.html, exports.js, exports.css);

function watch(done) {
  gulp.watch(src + "images/**/*", images);
  gulp.watch(src + 'index.html', index);
  gulp.watch(src + "pages/**/*", html);
  gulp.watch(src + "js/**/*", js);
  gulp.watch(src + "scss/**/*", css);

  done();
}

exports.watch = watch;

exports.default = gulp.series(exports.build, exports.watch);
