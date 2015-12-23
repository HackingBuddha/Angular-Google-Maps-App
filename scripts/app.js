// Setup and angular app
var app = angular.module('app', []);

// Setup and angular controller and location names to the $scope
app.controller('mainController', function($scope) {

	$scope.locations = [];

  	for (i = 0; i < markers.length; i++) {
	    $scope.locations[i] = markers[i].title;
	}
});