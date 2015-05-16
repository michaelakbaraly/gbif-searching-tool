(function () {
  angular.module("gbif-tool")
    .factory("AppHttpInterceptor", ["$rootScope", AppHttpInterceptor]);

  function AppHttpInterceptor($rootScope) {
    return {
      "request": function (config) {
        $rootScope.spinner = true;
        return config;
      },
      "response": function (response) {
        $rootScope.spinner = false;
        return response;
      },
      "responseError": function (response) {
        $rootScope.spinner = false;
        return response;
      }
    };
  }
})();
