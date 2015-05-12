describe("Controller: SearchController", function () {
  beforeEach(module("gbif-search"));

  var scope, controller, SearchService
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
  }));

  describe("the find method", function () {
    describe("on success", function () {
      it("should set the results", function () {
        var expectedResponse = {
          data: {
            results: [
              {
                key: 12345
              },
              {
                key: 54321
              }
            ]
          }
        };
        spyOn(SearchService, "find").and.callThrough();
        scope.find();
        deferred.resolve(expectedResponse);
        scope.$digest();
        expect(SearchService.find).toHaveBeenCalled();
        expect(scope.results).toEqual(expectedResponse.data.results);
      });
    });
    describe("on error", function () {
      it("should set the results", function () {
        spyOn(SearchService, "find").and.callThrough();
        scope.find();
        deferred.reject();
        scope.$digest();
        expect(SearchService.find).toHaveBeenCalled();
        expect(scope.error).toEqual("Error");
      });
    });
  });
});