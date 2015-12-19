var app = angular.module('app', []);

app.controller('SearchController', function($scope) {
	$scope.markers = [];
	locations.forEach(function(location) {
		$scope.markers.push(location.title);
	});
});