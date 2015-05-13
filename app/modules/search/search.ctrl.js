(function () {
  angular.module("gbif-search")
    .controller("SearchController", ["SearchService", "$state", SearchController]);

  function SearchController(SearchService, $state) {
    var vm = this;

    vm.search = $state.params.search ? $state.params.search : undefined;
    vm.usageKey = undefined;
    vm.result = undefined;
    vm.error = undefined;
    vm.find = find;

    if (vm.search) {
      vm.find(vm.search);
    }

    function find(search) {
      SearchService.find(search)
        .then(function (response) {
          vm.result = response.data;
          vm.usageKey = vm.result.usageKey;
          $state.go("search", {search: search});
        }, function (error) {
          vm.error = error;
        });
    }
  }
})();
