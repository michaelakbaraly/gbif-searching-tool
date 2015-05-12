(function () {
  angular.module("gbif-search")
    .factory("SearchService", ["$http", SearchService]);

  function SearchService($http) {
    var url = "http://api.gbif.org/v1/species/match?verbose=true&name=";
    return {
      find: function (search) {
        return $http.get(url + search);
      }
    };
  }
})();
