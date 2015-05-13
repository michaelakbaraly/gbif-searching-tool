describe("Controller: SearchController", function () {
  beforeEach(module("gbif-search"));

  var scope, vm, controller, SearchService;
  var q, deferred;
  var state;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  describe("when search params is defined", function () {
    beforeEach(inject(function ($controller, $q) {
      q = $q;
      SearchService = {
        find: function () {
          deferred = q.defer();
          return deferred.promise;
        }
      };
      state = {
        go: function () {
          //fake implementation
        },
        params: {
          search: "Pica"
        }
      };
      controller = $controller("SearchController", {SearchService: SearchService, $state: state});
      vm = controller;
    }));
    it("should set the search", function () {
      expect(vm.search).toEqual("Pica");
    });
    describe("the find method", function () {
      describe("on success", function () {
        var expectedResponse;
        beforeEach(function () {
          expectedResponse = {
            data: {
              usageKey: 123456
            }
          };
          spyOn(SearchService, "find").and.callThrough();
        });
        it("should set the results", function () {
          vm.find();
          deferred.resolve(expectedResponse);
          scope.$digest();
          expect(SearchService.find).toHaveBeenCalled();
          expect(vm.result).toEqual(expectedResponse.data);
        });
      });
      describe("on error", function () {
        it("should set the results", function () {
          spyOn(SearchService, "find").and.callThrough();
          vm.find();
          deferred.reject("Error");
          scope.$digest();
          expect(SearchService.find).toHaveBeenCalled();
          expect(vm.error).toEqual("Error");
        });
      });
    });

  });

  describe("when search params is undefined", function () {
    beforeEach(inject(function ($controller) {
      state = {
        params: {
          search: undefined
        }
      };
      controller = $controller("SearchController", {SearchService: SearchService, $state: state});
      vm = controller;
    }));
    it("should not set the search", function () {
      expect(vm.search).not.toBeDefined;
    });
  });
});
