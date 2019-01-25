var gulp = require("gulp");
var watch = require("gulp-watch");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssvars = require("postcss-simple-vars");
var nested = require("postcss-nested");
var cssImport = require("postcss-import");

gulp.task("default", function() {
  console.log("Hoooooray, you created a GULP task");
});

gulp.task("html", html);
function html() {
  console.log("html() task ran");
  return gulp.src("./app/index.html").pipe(gulp.dest("./app/temp/"));
}

gulp.task("styles", styles);
function styles() {
  console.log("styles() task ran");
  return gulp
    .src("./app/assets/styles/styles.css")
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest("./app/temp/styles"));
}

gulp.task("watch", function() {
  watch("./app/index.html", function() {
    html();
  });

  watch("./app/assets/styles/**/*.css", function() {
    styles();
  });
});
