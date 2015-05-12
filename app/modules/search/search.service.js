(function () {
  angular.module("gbif-search")
    .factory("SearchService", SearchService);

  function SearchService($http) {
    var url = "http://api.gbif.org/v1/species/search?q=";
    return {
      find: function (search) {
        return $http.get(url + search);
      }
    };
  }
})();
