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
  describe("the getSuggestion method", function () {
    it("should call the Suggest API", function () {
      var search = "puma";
      httpBackend.expectGET("http://api.gbif.org/v1/species/suggest?q=" + search).respond("200", {
        results: [
          {
            canonicalName: "Puma concolor",
            key: "2435099"
          }
        ]
      });
      SearchService.suggest(search);
      httpBackend.flush();
    });
  });
  describe("the storeLastSearch method", function () {
    describe("when lastSearch item has already been used", function() {
      it("should put the last Search in the localeStorage", function () {
        spyOn(localStorage, "getItem").and.returnValue("[\"oldSearch\"]");
        spyOn(localStorage, "setItem").and.callFake(function () {
          //fake implementation
        });
        var search = "Pica";
        SearchService.storeLastSearch(search);
        expect(localStorage.getItem).toHaveBeenCalledWith("lastSearches");
        expect(localStorage.setItem).toHaveBeenCalledWith("lastSearches", "[\"oldSearch\",\"Pica\"]");
      });
    });
    describe("when lastSearch item has already been used", function() {
      it("should put the last Search in the localeStorage", function () {
        spyOn(localStorage, "getItem").and.returnValue(null);
        spyOn(localStorage, "setItem").and.callFake(function () {
          //fake implementation
        });
        var search = "Pica";
        SearchService.storeLastSearch(search);
        expect(localStorage.getItem).toHaveBeenCalledWith("lastSearches");
        expect(localStorage.setItem).toHaveBeenCalledWith("lastSearches", "[\"Pica\"]");
      });
    });
  });
});
