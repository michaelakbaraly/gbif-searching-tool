(function () {
  angular.module("gbif-map")
    .factory("MapService", mapService);

  function mapService() {
    return {
      setBackground: function(map) {
        var img = "http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png"
        L.tileLayer( img, {
          subdomains: ['otile1','otile2','otile3','otile4']
        }).addTo(map);
      },
      updateTileLayer: function (map, tileLayer, key) {
        var url = "http://api.gbif.org/v1/map/density/tile?x={x}&y={y}&z={z}&type=TAXON&palette=yellows_reds&key="

        if (tileLayer !== undefined) {
          map.removeLayer(tileLayer);
        }
        if (key !== "") {
          tileLayer = L.tileLayer(url + key, {
            maxZoom: 18
          });
          tileLayer.addTo(map);
        }
        return tileLayer;
      }
    };
  }
})();
