var gulp = require("gulp");
var connect = require("gulp-connect");
var uglify = require("gulp-uglify");
var karma = require("gulp-karma");
var usemin = require("gulp-usemin");
var templateCache = require("gulp-angular-templatecache");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");

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

gulp.task("sass", function () {
  gulp.src("./app/style/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./app/style/"));
});

gulp.task("reload", function () {
  gulp.src("./app/**/*.html")
    .pipe(connect.reload());
});

gulp.task("watch", function () {
  gulp.watch(["./app/**/*.html", "./app/**/*.js", "./app/style/*.scss"], ["sass", "templates", "reload"]);
});

var testFiles = [
  "app/bower_components/angular/angular.js",
  "app/bower_components/angular-mocks/angular-mocks.js",
  "app/bower_components/jquery/dist/jquery.js",
  "app/bower_components/leaflet/dist/leaflet-src.js",
  "app/bower_components/lodash/lodash.js",
  "app/app.module.js",
  "app/modules/**/*.module.js",
  "app/modules/**/*.ctrl.js",
  "app/modules/**/*.service.js",
  "app/modules/**/*.directive.js",
  "test/**/*.js"
];
gulp.task("test", function () {
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: "karma.conf.js",
      action: "watch"
    }))
    .on("error", function (err) {
      throw err;
    });
});

gulp.task("usemin", function () {
  return gulp.src("./app/index.html")
    .pipe(usemin({
      lib: [uglify()],
      app: []
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

gulp.task("assets", function() {
  gulp.src("app/assets/**/*")
    .pipe(gulp.dest("dist/assets"));
});

gulp.task("default", ["sass", "templates", "connect:dev", "watch"]);
gulp.task("dist", ["assets", "templates", "usemin", "connect:dist"]);
