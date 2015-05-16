(function () {
  angular.module("gbif-map")
    .directive("gbifMap", ["MapService", mapDirective]);

  function mapDirective(MapService) {
    return {
      restrict: "E",
      template: "<div id=\"gbif-map\" class=\"map\"></div>",
      link: function (scope, element, attrs) {
        var map = L.map("gbif-map", {
          center: [20, 0],
          zoom: 2,
          minZoom: 2
        });
        MapService.setBackground(map);

        var tileLayer;
        attrs.$observe("key", function (value) {
          tileLayer = MapService.updateTileLayer(map, tileLayer, value);
        });

        //should be done while using an library external to the angular scope. Avoiding memory leak risks
        scope.$on("$destroy", function () {
          map.remove();
          tileLayer = null;
        });
      }
    };
  }
})();
