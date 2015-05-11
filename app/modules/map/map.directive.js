(function () {
  angular.module("gbif-map")
    .directive("gbifMap", mapDirective);

  function mapDirective(MapService) {
    return {
      restrict: "E",
      template: "<div id=\"gbif-map\" style=\"width:100%; height:500px\"></div>",
      scope: {
        search: "@"
      },
      controller: "MapController",
      controllerAs: "vm",
      link: function (scope, element, attrs) {
        var map = L.map("gbif-map", {
          center: [0, 0],
          zoom: 2
        });
        MapService.setBackground(map);

        var tileLayer;
        attrs.$observe("search", function(value) {
          tileLayer = MapService.updateTileLayer(map, tileLayer, value);
        });
      }
    };
  }
})();
