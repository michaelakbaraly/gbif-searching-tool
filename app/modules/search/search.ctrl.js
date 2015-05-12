(function () {
  angular.module("gbif-search")
    .controller("SearchController", SearchController);

  function SearchController($scope, SearchService) {
    $scope.search = "";
    $scope.find = find;

    function find(search) {
      SearchService.find(search)
        .then(function (response) {
          $scope.results = response.data.results;
        }, function () {
          $scope.error = "Error";
        });
    }
  }
})();
