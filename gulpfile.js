var gulp = require("gulp");
var connect = require("gulp-connect");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var karma = require("gulp-karma");

var config = {
  lib: [
    "bower_components/angular/angular.js"
  ]
};

gulp.task("connect-dev", function () {
  connect.server({
    root: "app",
    livereload: true
  });
});

gulp.task("connect-dist", function () {
  connect.server({
    root: "dist",
    livereload: true
  });
});

gulp.task("reload", function () {
  gulp.src("./app/*.html")
    .pipe(connect.reload());
});

gulp.task("watch", function () {
  gulp.watch(["./app/*.html", "./app/*.js"], ["reload"]);
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

gulp.task("concat", function () {
  return gulp.src(config.lib)
    .pipe(concat("lib.js"))
    .pipe(gulp.dest("app"));
});

gulp.task("compress", function () {
  return gulp.src("lib.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
});

gulp.task("dev", ["concat", "connect-dev", "watch"]);
