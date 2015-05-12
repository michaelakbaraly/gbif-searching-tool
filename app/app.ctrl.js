(function () {
  angular.module("gbif-tool")
    .controller("MainController", MainController);

  function MainController() {
    var vm = this;
    vm.search = "";

    vm.usageKey = "";
    vm.setUsageKey = setUsageKey;

    function setUsageKey(usageKey) {
      vm.usageKey = usageKey;
    }
  }
})();
