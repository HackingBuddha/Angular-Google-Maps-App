// Create variables to store map data
var map;
var markers = [];
var infoWindows = [];
var markerClick = function() {
    infoWindows[this.index].open(map, markers[this.index]);
    map.panTo(markers[this.index].getPosition());
};
var toggleBounce = function() {
    if (markers[this.index].getAnimation() !== null) {
        markers[this.index].setAnimation(null);
    } else {
        markers[this.index].setAnimation(google.maps.Animation.BOUNCE);
    }
};


// Create the callback for Google Maps API
initMap = function() {

  // Create the new map
    map = new google.maps.Map(document.getElementById('map'), {
        center: locations[0],
        zoom: 2
    });
  
    // Create Markers
    for (i = 0; i < locations.length; i++) {
        markers[i] = new google.maps.Marker({
            position: locations[i],
            map: map,
            title: locations[i].title,
        });

        // Create indexes for markers
        markers[i].index = i;

        // Create info windows
        infoWindows[i] = new google.maps.InfoWindow({
            content: locations[i].title
        });

        // Create onClick listeners
        markers[i].addListener('click', markerClick);
        markers[i].addListener('click', toggleBounce);
    }
};