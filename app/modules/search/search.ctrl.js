(function () {
  angular.module("gbif-search")
    .controller("SearchController", SearchController);

  function SearchController($scope) {
    $scope.search = "1"
  }
})();
