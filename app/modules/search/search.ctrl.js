(function () {
  angular.module("gbif-search")
    .controller("SearchController", ["SearchService", "$state", SearchController]);

  function SearchController(SearchService, $state) {
    var vm = this;

    vm.search = $state.params.search ? $state.params.search : undefined;
    vm.usageKey = undefined;
    vm.result = undefined;
    vm.alerts = [];
    vm.warning = "warning";
    vm.find = find;
    vm.suggest = suggest;
    vm.closeAlert = closeAlert;
    vm.lastSearches = retrieveLastSearches();

    if (vm.search) {
      vm.find(vm.search);
    }

    function find(search) {
      SearchService.find(search)
        .then(function (response) {
          vm.result = response.data;
          vm.usageKey = vm.result.usageKey;
          SearchService.storeLastSearch(search);
          $state.go("search", {search: search});
        }, function (error) {
          vm.alerts.push({
            type: "danger",
            content: error
          });
        });
    }

    function suggest(search) {
      SearchService.suggest(search)
        .then(function (response) {
          vm.suggestions = response.data;
        }, function (warning) {
          vm.alerts.push({
            type: "warning",
            content: warning
          });
        });
    }

    function closeAlert(index) {
      vm.alerts.splice(index, 1);
    }

    function retrieveLastSearches() {
      return SearchService.retrieveLastSearches();
    }
  }
})();
