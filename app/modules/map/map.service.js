(function () {
  angular.module("gbif-map")
    .factory("MapService", mapService);

  function mapService() {
    var generateOBSAndSPLayerString = function (year) {
      var subLayer = "";
      if (year === "PRE_1900" || year === "NO_YEAR") {
        subLayer += "&layer=OBS_" + year;
        subLayer += "&layer=SP_" + year;
        subLayer += "&layer=OTH_" + year;
        return subLayer;
      }
      subLayer += "&layer=OBS_" + year + "_" + (year + 10);
      subLayer += "&layer=SP_" + year + "_" + (year + 10);
      subLayer += "&layer=OTH_" + year + "_" + (year + 10);
      return subLayer;
    };

    var generateLayerString = function (dateRange) {
      var layer = "";
      if (dateRange.withoutYear) {
        return generateOBSAndSPLayerString("NO_YEAR");
      }

      var minDate = parseInt(dateRange.minDate, 10);
      var maxDate = parseInt(dateRange.maxDate, 10);

      if (minDate === maxDate) {
        if (minDate === 1890) {
          layer += generateOBSAndSPLayerString("PRE_1900");
        } else {
          layer += generateOBSAndSPLayerString(minDate);
        }
      } else {
        var i = minDate;
        for (i; i < maxDate; i += 10) {
          if (i === 1890) {
            layer += generateOBSAndSPLayerString("PRE_1900");
          } else {
            layer += generateOBSAndSPLayerString(i);
          }
        }
      }
      return layer;
    };
    return {
      setBackground: function (map) {
        var img = "http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png";
        L.tileLayer(img, {
          subdomains: ["otile1", "otile2", "otile3", "otile4"]
        }).addTo(map);
      },
      updateTileLayer: function (map, tileLayer, key, dateRange) {
        var url = "http://api.gbif.org/v1/map/density/tile?x={x}&y={y}&z={z}&type=TAXON&palette=yellows_reds&resolution=2";
        if (!_.isEmpty(dateRange)) {
          var layer = generateLayerString(dateRange);
          url += layer;
        }
        if (!_.isEmpty(tileLayer)) {
          map.removeLayer(tileLayer);
        }
        if (key !== "") {
          tileLayer = L.tileLayer(url + "&key=" + key, {
            maxZoom: 18
          });
          tileLayer.addTo(map);
        }
        return tileLayer;
      }
    };
  }
})();
