var map;

function initMap() {

  // Create the new map
  map = new google.maps.Map(document.getElementById('map'), {
    center: locations[0],
    zoom: 2
  });
  
  // Create Markers
  var chiMarker = new google.maps.Marker({
    position: locations[0],
    map: map,
    title: locations[0].title
  });

  var wuMarker = new google.maps.Marker({
    position: locations[1],
    map: map,
    title: locations[1].title
  });

  var okMarker = new google.maps.Marker({
    position: locations[2],
    map: map,
    title: locations[2].title
  });

  var barMarker = new google.maps.Marker({
    position: locations[3],
    map: map,
    title: locations[3].title
  });

  var yelMarker = new google.maps.Marker({
    position: locations[4],
    map: map,
    title: locations[4].title
  });

  // Create info windows
  var chiInfo = new google.maps.InfoWindow({
    content: chiMarker.title
  });

  var wuInfo = new google.maps.InfoWindow({
    content: wuMarker.title
  });

  var okInfo = new google.maps.InfoWindow({
    content: okMarker.title
  }); 

  var barInfo = new google.maps.InfoWindow({
    content: barMarker.title
  }); 

  var yelInfo = new google.maps.InfoWindow({
    content: yelMarker.title
  }); 

  // Create Info Window onClick listeners
  chiMarker.addListener('click', function() {
    chiInfo.open(map, chiMarker);
  });

  wuMarker.addListener('click', function() {
    wuInfo.open(map, wuMarker);
  });

  okMarker.addListener('click', function() {
    okInfo.open(map, okMarker);
  });

  barMarker.addListener('click', function() {
    barInfo.open(map, barMarker);
  });

  yelMarker.addListener('click', function() {
    yelInfo.open(map, yelMarker);
  });
}