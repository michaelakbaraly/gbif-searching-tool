(function () {
  angular.module("gbif-search")
    .controller("SearchController", ["SearchService", "$state", SearchController]);

  function SearchController(SearchService, $state) {
    var vm = this;

    vm.search = $state.params.search ? $state.params.search : undefined;
    vm.usageKey = undefined;
    vm.result = undefined;
    vm.alerts = [];
    vm.find = find;
    vm.suggest = suggest;
    vm.closeAlert = closeAlert;
    vm.lastSearches = retrieveLastSearches();
    vm.showSlider = false;

    if (vm.search) {
      vm.find(vm.search);
    }

    function find(search) {
      SearchService.find(search)
        .then(function (response) {
          if (response.data.matchType !== "NONE") {
            vm.result = response.data;
            vm.usageKey = vm.result.usageKey;
            SearchService.storeLastSearch(search);
            $state.go("search", {search: search});
          } else {
            vm.alerts.push({
              type: "info",
              content: "No results are matching your request"
            });
          }
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
