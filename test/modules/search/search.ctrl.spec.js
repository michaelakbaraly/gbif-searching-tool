describe("Controller: SearchController", function () {
  beforeEach(module("gbif-search"));

  var scope, vm, controller, SearchService;
  var q, deferred;

  beforeEach(inject(function ($rootScope, $controller, $q) {
    scope = $rootScope.$new();
    q = $q;
    SearchService = {
      find: function () {
        deferred = q.defer();
        return deferred.promise;
      }
    };
    controller = $controller("SearchController", {$scope: scope, SearchService: SearchService});
    vm = controller;
  }));

  describe("the find method", function () {
    describe("on success", function () {
      it("should set the results", function () {
        scope.$parent = {
          mainController: {
            setUsageKey: function () {
              //fake implementation
            }
          }
        };
        spyOn(scope.$parent.mainController, "setUsageKey");
        var expectedResponse = {
          data: {
            usageKey: 123456
          }
        };
        spyOn(SearchService, "find").and.callThrough();
        vm.find();
        deferred.resolve(expectedResponse);
        scope.$digest();
        expect(SearchService.find).toHaveBeenCalled();
        expect(scope.$parent.mainController.setUsageKey).toHaveBeenCalled();
        expect(vm.result).toEqual(expectedResponse.data);
      });
    });
    describe("on error", function () {
      it("should set the results", function () {
        spyOn(SearchService, "find").and.callThrough();
        vm.find();
        deferred.reject();
        scope.$digest();
        expect(SearchService.find).toHaveBeenCalled();
        expect(scope.error).toEqual("Error");
      });
    });
  });
});