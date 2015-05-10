var gulp = require("gulp");
var connect = require("gulp-connect");
var karma = require("gulp-karma");

gulp.task("connect", function () {
  connect.server({
    root: "app",
    livereload: true
  });
});

gulp.task("html", function () {
  gulp.src("./app/*.html")
    .pipe(connect.reload());
});

gulp.task("watch", function () {
  gulp.watch(["./app/*.html"], ["html"]);
});

gulp.task("test", function () {
  return gulp.src("test/*")
    .pipe(karma({
      configFile: "karma.conf.js",
      action: "run"
    }))
    .on("error", function (err) {
      throw err;
    });
});

gulp.task("default", ["connect", "watch"]);
