describe("Service: MapService", function () {
  beforeEach(module("gbif-map"));

  var MapService, map;
  beforeEach(inject(function (_MapService_) {
    map = {
      removeLayer: function () {
      }
    };
    MapService = _MapService_;
    spyOn(map, "removeLayer").and.callFake(function () {
    });
    spyOn(L, "tileLayer").and.callFake(function () {
      return {
        addTo: function () {
        }
      };
    });
  }));

  describe("the setBackground method", function() {
    it("should call the tileLayer method", function() {
      MapService.setBackground(map);
      expect(L.tileLayer).toHaveBeenCalledWith("http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png", {
        subdomains: ['otile1','otile2','otile3','otile4']
      });
    });
  });
  describe("the updateTileLayer method", function () {
    describe("when the tileLayer is defined", function () {
      it("should call the map removeLayer method", function () {
        var tileLayer = {};
        MapService.updateTileLayer(map, tileLayer, null);
        expect(map.removeLayer).toHaveBeenCalled();
      });
      describe("when the key is defined", function () {
        it("should call the leaflet tileLayer method", function () {
          var tileLayer = {};
          var key = "KEY";
          MapService.updateTileLayer(map, tileLayer, key);
          expect(L.tileLayer).toHaveBeenCalledWith("http://api.gbif.org/v1/map/density/tile?x={x}&y={y}&z={z}" +
          "&type=TAXON&palette=yellows_reds&key=KEY", {maxZoom: 18});
        });
      });
      describe("when the key is empty", function () {
        it("should not call the leaflet tileLayer method", function () {
          var tileLayer = {};
          var key = "";
          MapService.updateTileLayer(map, tileLayer, key);
          expect(L.tileLayer).not.toHaveBeenCalled();
        });
      });
    });
    describe("when the tileLayer is not defined", function () {
      it("should not call the leaflet removeLayer method", function () {
        var tileLayer = undefined;
        MapService.updateTileLayer(map, tileLayer, null);
        expect(map.removeLayer).not.toHaveBeenCalled();
      });
    });
  });
});