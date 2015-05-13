describe("Directive: MapDirective", function () {
  beforeEach(module("gbif-map"));

  var scope, element, MapService;

  beforeEach(inject(function ($rootScope, $compile, _MapService_) {

    scope = $rootScope.$new();
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
});
