var initMap = function() {};

// Setup and angular app
var app = angular.module('app', []);

// Setup and angular controller and location names to the $scope
app.controller('mainController', function($scope, $timeout) {

	// Initialize variables
	$scope.map;
	$scope.markers = [];
	$scope.infoWindows = [];
	$scope.locations = [];

	$scope.markerClick = function() {
    $scope.infoWindows[this.index].open($scope.map, $scope.markers[this.index]);
    $scope.map.panTo($scope.markers[this.index].getPosition());
	};
	
	$scope.toggleBounce = function() {
    if ($scope.markers[this.index].getAnimation() !== null) {
        	$scope.markers[this.index].setAnimation(null);
    	} else {
        	$scope.markers[this.index].setAnimation(google.maps.Animation.BOUNCE);
    	}
	};

	$scope.setLocations = function() {
		for (i = 0; i < $scope.markers.length; i++) {
			$scope.locations[i] = $scope.markers[i].title;
		}
	};

	$timeout( function() {
		$scope.setLocations();
	}, 100);

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

        	// Setup indexes for the markers
        	$scope.markers[i].index = i;

	        // Create info windows
	        $scope.infoWindows[i] = new google.maps.InfoWindow({
	            content: locations[i].title
	        });

	        // Create onClick listeners
        	$scope.markers[i].addListener('click', $scope.markerClick);
        	$scope.markers[i].addListener('click', $scope.toggleBounce);
    	}
	};
});