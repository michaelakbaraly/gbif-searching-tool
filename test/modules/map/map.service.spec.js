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

  describe("the setBackground method", function () {
    it("should call the tileLayer method", function () {
      MapService.setBackground(map);
      expect(L.tileLayer).toHaveBeenCalledWith("http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png", {
        subdomains: ["otile1", "otile2", "otile3", "otile4"]
      });
    });
  });
  describe("the updateTileLayer method", function () {
    describe("when the dateRange is notDefined", function () {
      describe("when the tileLayer is defined", function () {
        it("should call the map removeLayer method", function () {
          var tileLayer = {
            key: "value"
          };
          MapService.updateTileLayer(map, tileLayer, null);
          expect(map.removeLayer).toHaveBeenCalled();
        });
        describe("when the key is defined", function () {
          it("should call the leaflet tileLayer method", function () {
            var tileLayer = {};
            var key = "KEY";
            MapService.updateTileLayer(map, tileLayer, key);
            expect(L.tileLayer).toHaveBeenCalledWith("http://api.gbif.org/v1/map/density/tile?x={x}&y={y}&z={z}" +
            "&type=TAXON&palette=yellows_reds&resolution=2&key=KEY", {maxZoom: 18});
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
          MapService.updateTileLayer(map, null, null);
          expect(map.removeLayer).not.toHaveBeenCalled();
        });
      });
    });
    describe("when the dateRange is defined", function () {
      var dateRange;
      describe("when the dateMin and dateMax are different", function () {
        it("should set the dateRange with the range", function () {
          var tileLayer = {};
          var key = "KEY";
          dateRange = {
            minDate: "1990",
            maxDate: "2010"
          };
          MapService.updateTileLayer(map, tileLayer, key, dateRange);
          expect(L.tileLayer).toHaveBeenCalledWith("http://api.gbif.org/v1/map/density/tile?x={x}&y={y}&z={z}" +
          "&type=TAXON&palette=yellows_reds&resolution=2" +
          "&layer=OBS_1990_2000&layer=SP_1990_2000&layer=OTH_1990_2000" +
          "&layer=OBS_2000_2010&layer=SP_2000_2010&layer=OTH_2000_2010" +
          "&key=KEY", {maxZoom: 18});
        });
      });
      describe("when the dateMin and dateMax are equal", function () {
        it("should set the dateRange with the unique date", function () {
          var tileLayer = {};
          var key = "KEY";
          dateRange = {
            minDate: "1990",
            maxDate: "1990"
          };
          MapService.updateTileLayer(map, tileLayer, key, dateRange);
          expect(L.tileLayer).toHaveBeenCalledWith("http://api.gbif.org/v1/map/density/tile?x={x}&y={y}&z={z}" +
          "&type=TAXON&palette=yellows_reds&resolution=2" +
          "&layer=OBS_1990_2000&layer=SP_1990_2000&layer=OTH_1990_2000&key=KEY", {maxZoom: 18});
        });
        it("should set the dateRange to PRE_1900 if both dates are 1890", function () {
          var tileLayer = {};
          var key = "KEY";
          dateRange = {
            minDate: "1890",
            maxDate: "1890"
          };
          MapService.updateTileLayer(map, tileLayer, key, dateRange);
          expect(L.tileLayer).toHaveBeenCalledWith("http://api.gbif.org/v1/map/density/tile?x={x}&y={y}&z={z}" +
          "&type=TAXON&palette=yellows_reds&resolution=2" +
          "&layer=OBS_PRE_1900&layer=SP_PRE_1900&layer=OTH_PRE_1900&key=KEY", {maxZoom: 18});
        });
      });
      describe("when withoutYear is true", function () {
        it("should add the NO_YEAR layer and not take into account the date range", function () {
          var tileLayer = {};
          var key = "KEY";
          dateRange = {
            minDate: "1990",
            maxDate: "2010",
            withoutYear: true
          };

          MapService.updateTileLayer(map, tileLayer, key, dateRange);
          expect(L.tileLayer).toHaveBeenCalledWith("http://api.gbif.org/v1/map/density/tile?x={x}&y={y}&z={z}" +
          "&type=TAXON&palette=yellows_reds&resolution=2" +
          "&layer=OBS_NO_YEAR&layer=SP_NO_YEAR&layer=OTH_NO_YEAR&key=KEY", {maxZoom: 18});
        });
      });
    });

  });
});
