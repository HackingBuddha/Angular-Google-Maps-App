var initMap = function() {};

// Setup and angular app
var app = angular.module('app', []);

app.factory('wikiService', function($http) {
    
    // Define a service to query wikipedia
    var wikiService = {
        get: function(location) {
            return $http.jsonp('http://en.wikipedia.org/w/api.php?action=opensearch&search=' + location.toLowerCase() + '&format=json&callback=JSON_CALLBACK');
        }
    };
    
    return wikiService;
});

// Setup an angular controller
app.controller('MainController', function($scope, $timeout, wikiService) {

	// Initialize variables
	$scope.map;
	$scope.markers = [];
	$scope.infoWindows = [];
	$scope.locations = [];
	$scope.clicked = [];
	$scope.wikiurls = [];

	// Function that's going to be called when a marker is clicked on the map
	$scope.markerClick = function() {
		self = this.index;
		$scope.activateMarker(self);
		$scope.toggleAnimation(self);
	};

	// Function that is going to be called on click of items in the search list
	$scope.listClick = function($index) {
		self = $index;
		$scope.activateMarker(self);
		$scope.toggleAnimation(self);
	};

	// Common functionality for both Click functions
	$scope.activateMarker = function(self) {
		$scope.infoWindows[self].open($scope.map, $scope.markers[self]);
    	$scope.map.panTo($scope.markers[self].getPosition());
	};

	// A function to toggle marker animation
	$scope.toggleAnimation = function(self) {
		for (i = 0; i < $scope.markers.length; i++) {
        	$scope.markers[i].setAnimation(null);
    	}
    	$scope.markers[self].setAnimation(google.maps.Animation.BOUNCE);
	};

	// Function to bind markers titles to locations array
	$scope.setLocations = function() {
		for (i = 0; i < $scope.markers.length; i++) {
			$scope.locations[i] = $scope.markers[i].title;
		}
	};

	// Function that populates $scope.wikiurls array with data
	$scope.getWikiData = function(title, index) {
		wikiService.get(title).then(function(data) {
    		$scope.wikiurls[index] = data.data[3][0];
    	});
	};

	// The callback for Google Maps API
	initMap = function() {

		// Create the new map
	    $scope.map = new google.maps.Map(document.getElementById('map'), {
	        center: locations[0],
	        zoom: 2
	    });

	    // Iteratively call getWikiData
	    for (i = 0; i < locations.length; i++) {
			$scope.getWikiData(locations[i].title, i);
		}

		$timeout(function() {
	    	for (i = 0; i < locations.length; i++) {
	        	
	        	// Create Markers
	        	$scope.markers[i] = new google.maps.Marker({
	           		position: locations[i],
	            	map: $scope.map,
	            	title: locations[i].title,
	        	});

	        	// Setup indexes for the markers
	        	$scope.markers[i].index = i;

		        // Create info windows with wikipedia urls and error handling
				var infoContent;
				if ($scope.wikiurls.length != 0) {
		        	infoContent = locations[i].title + '</br>' + '<a target="_blank" href=' + $scope.wikiurls[i] + '>' + 'Wiki Article' + '</a>';
		        } else {
		        	infoContent = "Failed to load wikipedia content, please try again later";
		        }

	 			$scope.infoWindows[i] = new google.maps.InfoWindow({
		            content: infoContent
		        });

		        // Create marker click listeners on the map
	        	$scope.markers[i].addListener('click', $scope.markerClick);
	    	}
	    }, 500);
	};

	// Calling setLocations after a delay to account for AJAX delay
	$timeout(function() {
		$scope.setLocations();
	}, 1000);

});