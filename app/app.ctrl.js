(function () {
  angular.module("gbif-tool")
    .controller("MainController", MainController);

  function MainController() {
    var vm = this;
    vm.showSlider = false;
  }
})();
