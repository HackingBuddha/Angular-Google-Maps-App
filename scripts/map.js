var map;
var markers = [];
var infoWindows = [];

function initMap() {

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

    markers[i].index = i;

    // Create info windows
    infoWindows[i] = new google.maps.InfoWindow({
      content: locations[i].title
    });

    // Create Info Window onClick listeners
    markers[i].addListener('click', function() {
      infoWindows[this.index].open(map, markers[this.index]);
      map.panTo(markers[this.index].getPosition());
    });
  }
}
