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
	$scope.clicked = [];

	// Function that's going to be called when a marker is clicked on a map
	$scope.markerClick = function() {
		self = this.index;
		$scope.activateMarker(self);
	};

	// Function that is going to be called on click of items in the search list
	$scope.listClick = function($index) {
		self = $index;
		$scope.activateMarker(self);
	};

	// Common functionality for both Click functions
	$scope.activateMarker = function(self) {
		$scope.infoWindows[self].open($scope.map, $scope.markers[self]);
    	$scope.map.panTo($scope.markers[self].getPosition());
	};

	// A function to toggle marker animation
	$scope.toggleBounce = function() {
    	if ($scope.markers[this.index].getAnimation() !== null) {
        	$scope.markers[this.index].setAnimation(null);
    	} else {
        	$scope.markers[this.index].setAnimation(google.maps.Animation.BOUNCE);
    	}
	};

	// Function to bind markers titles to locations array
	$scope.setLocations = function() {
		for (i = 0; i < $scope.markers.length; i++) {
			$scope.locations[i] = $scope.markers[i].title;
		}
	};

	// Calling setLocations after a delay to account for AJAX delay
	$timeout( function() {
		$scope.setLocations();
	}, 100);

	// The callback for the Google Maps API
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

	        // Create marker click listeners on the map
        	$scope.markers[i].addListener('click', $scope.markerClick);
        	$scope.markers[i].addListener('click', $scope.toggleBounce);
    	}
	};
});