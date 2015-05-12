var gulp = require("gulp");
var connect = require("gulp-connect");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var karma = require("gulp-karma");
var usemin = require("gulp-usemin");
var templateCache = require('gulp-angular-templatecache');

gulp.task("connect:dev", function () {
  connect.server({
    root: "app",
    livereload: true
  });
});

gulp.task("connect:dist", function () {
  connect.server({
    root: "dist",
    livereload: true
  });
});

gulp.task("reload", function () {
  gulp.src("./app/**/*.html")
    .pipe(connect.reload());
});

gulp.task("watch", function () {
  gulp.watch(["./app/**/*.html", "./app/**/*.js"], ["templates", "reload"]);
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

gulp.task("usemin", function () {
  return gulp.src("./app/index.html")
    .pipe(usemin({
      lib: [uglify()],
      app: [uglify()]
    }))
    .pipe(gulp.dest("dist/"));
});

gulp.task("templates", function () {
  gulp.src(["app/app.tpl.html", "./app/modules/**/*.html"])
    .pipe(templateCache("templates.js", {
      standalone: true
    }))
    .pipe(gulp.dest("app"));
});

gulp.task("default", ["templates", "connect:dev", "watch"]);
gulp.task("dist", ["templates", "usemin", "connect:dist"]);
