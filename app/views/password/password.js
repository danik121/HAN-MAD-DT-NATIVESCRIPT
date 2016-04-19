var application = require("application");
if(application.ios) {
  GMSServices.provideAPIKey("AIzaSyAaRQQ_Z3KjRJT4rLmpsDjPeoNa_2FG0Uo");
}

var mapsModule = require("nativescript-google-maps-sdk");

function OnMapReady(args) {
  var mapView = args.object;

  console.log("Setting a marker...");
  var marker = new mapsModule.Marker();
  marker.position = mapsModule.Position.positionFromLatLng(-33.86, 151.20);
  marker.title = "Sydney";
  marker.snippet = "Australia";
  marker.userData = { index : 1};
  mapView.addMarker(marker);
}

function onMarkerSelect(args) {
   console.log("Clicked on " +args.marker.title);
}

function onCameraChanged(args) {
    console.log("Camera changed: " + JSON.stringify(args.camera)); 
}

exports.onMapReady = OnMapReady;
exports.onMarkerSelect = onMarkerSelect;
exports.onCameraChanged = onCameraChanged;