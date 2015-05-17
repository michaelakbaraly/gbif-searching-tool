(function () {
  angular.module("gbif-map")
    .directive("gbifMap", ["MapService", "$compile", mapDirective]);

  function mapDirective(MapService, $compile) {
    return {
      restrict: "E",
      template: "<div><div id=\"gbif-map\" class=\"map\"></div></div>",
      replace: true,
      scope: true,
      link: function (scope, element, attrs) {
        var map = L.map("gbif-map", {
          center: [20, 0],
          zoom: 2,
          minZoom: 2
        });
        MapService.setBackground(map);

        var key = attrs.key;

        var tileLayer;
        attrs.$observe("key", function (value) {
          tileLayer = MapService.updateTileLayer(map, tileLayer, value, null);
          key = value;
        });

        //should be done while using an library external to the angular scope. Avoiding memory leak risks
        scope.$on("$destroy", function () {
          map.remove();
          tileLayer = null;
        });

        /**
         * If the show slider is defined, it sets a slider element using a date range object to filter the results
         */
        attrs.$observe("showSlider", function (value) {
          if (value === "true") {
            scope.dateRange = {
              withoutYear: false,
              minDate: 1890,
              maxDate: 2020
            };

            element.append(
              "<div id=\"slider\"><slider floor=\"1890\" ceiling=\"2020\" step=\"10\" " +
              "  ng-model-low=\"dateRange.minDate\" ng-model-high=\"dateRange.maxDate\"></slider>" +
              "  <div>" +
              "    <p>From {{ dateRange.minDate == '1890' ? 'Before 1900' : dateRange.minDate }} to " +
              "            {{ dateRange.maxDate == '1890' ? 'Before 1900' : dateRange.maxDate }}</p>" +
              "    <div class=\"form-group\">" +
              "       <label>Show only occurrences without years:</label>" +
              "       <input type=\"checkbox\" ng-model=\"dateRange.withoutYear\">" +
              "    </div>" +
              "  </div>" +
              "</div>");

            /**
             * Update the layer each time the date range is changing
             */
            scope.$watch("dateRange", function () {
              tileLayer = MapService.updateTileLayer(map, tileLayer, key, scope.dateRange);
            }, true);
            $compile(element)(scope);
          } else {
            angular.element(element.children()[1]).remove();
            tileLayer = MapService.updateTileLayer(map, tileLayer, key, null);
          }
        });
      }
    };
  }
})();
