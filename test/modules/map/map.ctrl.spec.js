describe("Controller: MapController", function () {

  beforeEach(module("gbif-map"));

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller("MapController");
  }));

});