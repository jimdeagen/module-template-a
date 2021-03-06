var gulp = require("gulp");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssvars = require("postcss-simple-vars");
var nested = require("postcss-nested");
var cssImport = require("postcss-import");
var mixins = require("postcss-mixins");
var watch = require("gulp-watch");
var browserSync = require("browser-sync").create();
var hexrgba = require("postcss-hexrgba");

gulp.task("styles", styles);
function styles() {
  console.log("styles() task ran");
  return gulp
    .src("./app/assets/styles/styles.css")
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    .on("error", function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit("end");
    })
    .pipe(gulp.dest("./app/temp/styles"));
}

gulp.task("watch", function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  watch("./app/index.html", function() {
    console.log("html reloaded");
    browserSync.reload();
  });

  watch("./app/assets/styles/**/*.css", function() {
    styles();
    browserSync.reload();
  });
});
