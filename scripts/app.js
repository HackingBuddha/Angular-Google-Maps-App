// Setup and angular app
var app = angular.module('app', []);

// Setup and angular controller and location names to the $scope
app.controller('mainController', function($scope) {

	$scope.markers = [];
	$scope.markerclick = function() {
    	infoWindows[this.index].open(map, markers[this.index]);
    	map.panTo(markers[this.index].getPosition());
	};

  	for (i = 0; i < markers.length; i++) {
	    $scope.markers[i] = markers[i].title;
	}
});