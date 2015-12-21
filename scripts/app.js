
var initMap  = function() {};

// Setup and angular app
var app = angular.module('app', []);

// Setup and angular controller and location names to the $scope
app.controller('SearchController', function($scope) {

	// For debugging
	window.MY_SCOPE = $scope;

	$scope.markers = [];
	$scope.infoWindows = [];

	initMap = function() {

	  	// Create the new map
	  	$scope.map = new google.maps.Map(document.getElementById('map'), {
	    	center: locations[0],
	    	zoom: 2
	  	});
  
	  	// Create Markers
		for (i = 0; i < locations.length; i++) {
	    	$scope.markers[i] = new google.maps.Marker({
	      		position: locations[i],
	      		map: $scope.map,
	      		title: locations[i].title,
	    	});

    		$scope.markers[i].index = i;

		    // Create info windows
		    $scope.infoWindows[i] = new google.maps.InfoWindow({
		    	content: locations[i].title
		    });

		    // Create Info Window onClick listeners
		    $scope.markers[i].addListener('click', function() {
		    	$scope.infoWindows[this.index].open($scope.map, $scope.markers[this.index]);
		    	$scope.map.panTo($scope.markers[this.index].getPosition());
		    });

		   // $scope.markers[i] = markers[i];
  		}
	}

});