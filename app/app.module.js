(function () {
  angular.module("gbif-tool", ["ui.bootstrap", "ui.router", "templates", "gbif-search", "gbif-map"])
    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise("/search/");

      $stateProvider
        .state("search", {
          url: "/search/:search",
          templateUrl: "search/search.tpl.html",
          controller: "SearchController",
          controllerAs: "searchController"
        });
    }])
    .config(["$httpProvider", function ($httpProvider) {
      $httpProvider.interceptors.push("AppHttpInterceptor");
    }]);
})();
