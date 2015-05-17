describe("Directive: MapDirective", function () {
  beforeEach(module("gbif-map"));

  var scope, element, MapService, compile;

  beforeEach(inject(function ($rootScope, $compile, _MapService_) {

    scope = $rootScope.$new();
    compile = $compile;
    MapService = _MapService_;
    spyOn(L, "map").and.callFake(function () {
      return {};
    });
    spyOn(MapService, "setBackground").and.callFake(function () {
      //fake implementation
    });
    spyOn(MapService, "updateTileLayer").and.callFake(function () {
      //fake implementation
    });

    element =
      "<gbif-map key=\"12345\"></gbif-map>";
    element = $compile(element)(scope);
    scope.$digest();
  }));

  it("should create a div element with an ID", function () {
    expect($(element).find("div").length).toBe(1);
    var divElement = $($(element).find("div")[0]);
    expect(divElement.attr("id")).toBe("gbif-map");
  });

  it("should initialize the map", function () {
    expect(L.map).toHaveBeenCalled();
    expect(MapService.setBackground).toHaveBeenCalled();
    expect(MapService.updateTileLayer).toHaveBeenCalled();
  });

  it("should call MapService updateTileLayer method each time search is changing", function () {
    $(element).attr("search", "canis");
    expect(MapService.updateTileLayer).toHaveBeenCalled();
    $(element).attr("search", "canis lupus");
    expect(MapService.updateTileLayer).toHaveBeenCalled();
  });

  describe("when the show slider attribute is true", function () {
    var sliderElement;
    beforeEach(function () {
      element =
        "<gbif-map key=\"12345\" show-slider=\"true\" min-date=\"2000\" max-date=\"2020\"></gbif-map>";
      element = compile(element)(scope);
      scope.$digest();
      sliderElement = $(element).find("#slider")[0];
    });
    it("should display a #slider element", function () {
      expect(sliderElement).toBeDefined();
    });
    it("should call MapService updateTileLayer method with the dates arguments", function () {
      scope.dateRange = {
        minDate: "1990",
        maxDate: "2020"
      };
      expect(MapService.updateTileLayer.calls.count()).toBe(3);
    });
  });
});
