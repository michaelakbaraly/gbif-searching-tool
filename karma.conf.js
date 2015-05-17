module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: ".",

    // list of files / patterns to load in the browser
    files: [
      "app/bower_components/angular/angular.js",
      "app/bower_components/angular-mocks/angular-mocks.js",
      "app/bower_components/jquery/dist/jquery.js",
      "app/bower_components/leaflet/dist/leaflet-src.js",
      "app/bower_components/angular-bootstrap/ui-bootstrap.js",
      "app/bower_components/angular-ui-router/release/angular-ui-router.js",
      "app/bower_components/angular-slider/slider.js",
      "app/bower_components/lodash/lodash.js",
      "app/app.module.js",
      "app/app.*.js",
      {pattern: "app/modules/**/*.module.js", watched: true, included: true, served: true},
      {pattern: "app/modules/**/*.ctrl.js", watched: true, included: true, served: true},
      {pattern: "app/modules/**/*.service.js", watched: true, included: true, served: true},
      {pattern: "app/modules/**/*.directive.js", watched: true, included: true, served: true},
      "app/templates.js",
      "test/**/*.js"
    ],

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: "dots", "progress", "junit", "growl", "coverage"
    reporters: ["progress"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true,

    // frameworks to use
    frameworks: ["jasmine"],

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
