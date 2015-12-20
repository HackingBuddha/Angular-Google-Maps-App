// Setup and angular app
var app = angular.module('app', []);

// Setup and angular controller and location names to the $scope
app.controller('SearchController', function($scope) {
	$scope.markers = [];
	locations.forEach(function(location) {
		$scope.markers.push(location.title);
	});
});