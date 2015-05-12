(function () {
  angular.module("gbif-search")
    .controller("SearchController", ["$scope", "SearchService", SearchController]);

  function SearchController($scope, SearchService) {
    var vm = this;
    vm.find = find;
    vm.result = {};

    function find(search) {
      SearchService.find(search)
        .then(function (response) {
          vm.result = response.data;
          $scope.$parent.mainController.setUsageKey(vm.result.usageKey);
        }, function () {
          $scope.error = "Error";
        });
    }
  }
})();
