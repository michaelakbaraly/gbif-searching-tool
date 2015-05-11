(function () {
  angular.module("gbif-map")
    .directive("gbifMap", mapDirective);

  function mapDirective() {
    return {
      restrict: "E",
      template: "<div id=\"gbif-map\" style=\"width:100%; height:500px\"></div>",
      scope: {
        search: "@",
        rank: "@"
      },
      controller: "MapController",
      controllerAs: "vm",
      link: function (scope, element, attrs) {
        var map = L.map("gbif-map", {
          center: [51.505, -0.09],
          zoom: 1
        });
        var tileLayer = L.tileLayer('http://api.gbif.org/v1/map/density/tile?x={x}&y={y}&z={z}&type=TAXON&key=1', {
          maxZoom: 18
        });
        tileLayer.addTo(map);
      }
    };
  }
})();
