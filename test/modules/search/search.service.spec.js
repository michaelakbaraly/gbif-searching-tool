describe("Service: SearchService", function () {
  beforeEach(module("gbif-search"));

  var SearchService, httpBackend;

  beforeEach(inject(function ($httpBackend, _SearchService_) {
    SearchService = _SearchService_;
    httpBackend = $httpBackend;
  }));

  describe("the find method", function () {
    it("should call the Search API", function () {
      var search = "pica";
      httpBackend.expectGET("http://api.gbif.org/v1/species/match?verbose=true&name=" + search).respond("200", {
        results: [
          {
            usageKey: "5229490"
          }
        ]
      });
      SearchService.find(search);
      httpBackend.flush();
    });
  });
});
