(function () {
  angular.module("gbif-search")
    .factory("SearchService", ["$http", SearchService]);

  function SearchService($http) {
    var matchURL = "http://api.gbif.org/v1/species/match?verbose=true&name=";
    var suggestURL = "http://api.gbif.org/v1/species/suggest?q=";
    return {
      find: function (search) {
        return $http.get(matchURL + search, {cache: true});
      },
      suggest: function (search) {
        return $http.get(suggestURL + search);
      },
      storeLastSearch: function (search) {
        var lastSearches = JSON.parse(localStorage.getItem("lastSearches"));
        if (_.isEmpty(lastSearches)) {
          localStorage.setItem("lastSearches", JSON.stringify([search]));
        } else {
          lastSearches.push(search);
          localStorage.setItem("lastSearches", JSON.stringify(lastSearches));
        }
      },
      retrieveLastSearches: function () {
        var lastSearches = JSON.parse(localStorage.getItem("lastSearches"));
        if (_.isEmpty(lastSearches)) {
          return undefined;
        }
        return _.uniq(JSON.parse(localStorage.getItem("lastSearches")).reverse());
      }
    };
  }
})();
