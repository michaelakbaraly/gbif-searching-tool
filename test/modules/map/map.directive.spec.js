describe("Directive: MapDirective", function () {
  beforeEach(module("gbif-map"));

  var scope, element, l;

  l = {
    map: function () {
      return function () {
      };
    },
    tileLayer: function () {
      return {};
    },
    addTo: function () {
      return {};
    }
  };

  beforeEach(inject(function ($rootScope, $compile) {

    scope = $rootScope.$new();
    spyOn(L, "map").and.callFake(function () {
      return {};
    });
    spyOn(L, "tileLayer").and.callFake(function () {
      return {
        addTo: function () {
        }
      };
    });

    element =
      "<gbif-map search=\"pica\"></gbif-map>";
    element = $compile(element)(scope);
    scope.$digest();
  }));

  it("should create a div element with an ID", function () {
    expect($(element).find("div").length).toBe(1);
    var divElement = $($(element).find("div")[0]);
    expect(divElement.attr("id")).toBe("gbif-map");
  });

  it("should have call the leaflet function", function () {
    expect(L.map).toHaveBeenCalled();
    expect(L.tileLayer).toHaveBeenCalled();
  });

  it("should set search in scope", function () {
    expect(element.isolateScope().search).toEqual("pica");
  });
});