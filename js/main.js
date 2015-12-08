function initialize() {
  var latlng = new google.maps.LatLng(46.993844, 8.606245);
  var myOptions = {
    zoom: 16,
    center: latlng,
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map-contact"),
  myOptions);

  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
  });
}

google.maps.event.addDomListener(window, "load", initialize);
