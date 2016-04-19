var geolocation = require("nativescript-geolocation");
var application = require("application");
var accelerometer = require("nativescript-accelerometer");
var touchid = require("nativescript-touchid");
var vibrator = require("nativescript-vibrate");
var imageModule = require("ui/image");
var cameraModule = require("camera");
var bluetooth = require("nativescript-bluetooth");
var connectivity = require("connectivity");
var connectionType = connectivity.getConnectionType();
var activityIndicatorModule = require("ui/activity-indicator");

var stackLayoutModule = require("ui/layouts/stack-layout");
var tabViewModule = require("ui/tab-view");
var tabView = new tabViewModule.TabView();
var items = [];
var StackLayout0 = new stackLayoutModule.StackLayout();
var tabEntry0 = {
    title: "Sensoren",
    view: StackLayout0
};
items.push(tabEntry0);
var StackLayout1 = new stackLayoutModule.StackLayout();
var tabEntry1 = {
    title: "Actuatoren",
    view: StackLayout1
};
items.push(tabEntry1);
var StackLayout2 = new stackLayoutModule.StackLayout();
var tabEntry2 = {
    title: "UIelem",
    view: StackLayout2
};
items.push(tabEntry2);

tabView.items = items;
var pageModule = require("ui/page");
// var page = new pageModule.Page();
// page.css("button {background-color: blue}");
function EnableLocation(){
  if (!geolocation.isEnabled()) {
    geolocation.enableLocationRequest();
  }
}
function buttonGetLocationTap(args) {


    var location = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
    then(function(loc) {
         if (loc) {
         alert(JSON.stringify(loc));
         }
         }, function(e){
         alert("Error: " + e.message);
         });
}

function buttonAccelerometer(args){
    accelerometer.startAccelerometerUpdates(function(data) {
        alert("x: " + data.x + "y: " + data.y + "z: " + data.z);
    });
}

function buttonTouchId(args){
    touchid.available().then(
     function(avail) {
     alert("Available? " + avail);
     }
     )

    touchid.verifyFingerprint({
        message: 'Scan yer finger', // optional, shown in the fingerprint dialog (default: 'Scan your finger').
        fallbackMessage: 'Enter PIN' // optional, the button label when scanning fails (default: 'Enter password').
    }).then(
        function() {
            alert("Fingerprint was OK");
        },
        function(error) {
            alert("Fingerprint NOT OK" + (error.code ? ". Code: " + error.code : ""));
        }
    )

}

function buttonTrillen(args){
    vibrator.vibration(2000);
}

function buttonCamera(args){
    cameraModule.takePicture().then(function(picture) {
        console.log("Result is an image source instance");
        var image = new imageModule.Image();
        image.imageSource = picture;
    });
}

function ButtonConnectionType(args){
    switch (connectionType) {
        case connectivity.connectionType.none:
            alert("No connection");
            break;
        case connectivity.connectionType.wifi:
            alert("WiFi connection");
            break;
        case connectivity.connectionType.mobile:
            alert("Mobile connection");
            break;
    }

}

function ButtonBluetooth(args){
    bluetooth.isBluetoothEnabled().then(
        function(enabled) {
            alert("Enabled? " + enabled);
        }
    );
    bluetooth.startScanning({
      serviceUUIDs: [],
      seconds: 4,
      onDiscovered: function (peripheral) {
        console.log("Periperhal found with UUID: " + peripheral.UUID);
      }
    }).then(function() {
      console.log("scanning complete");
    }, function (err) {
      console.log("error while scanning: " + err);
    });
}

function ButtonPush(args){
    alert("Test push");
}

function ButtonActive(args){
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
topmost.navigate("views/list/list");
}

function ButtonMaps(){
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
topmost.navigate("views/password/password");

}

function HealthKit(){
  var frameModule = require("ui/frame");
  var topmost = frameModule.topmost();
  topmost.navigate("views/healthkit/healthkit");
}
exports.buttonGetLocationTap = buttonGetLocationTap;
exports.buttonTrillen = buttonTrillen;
exports.buttonAccelerometer = buttonAccelerometer;
exports.buttonTouchId = buttonTouchId;
exports.buttonCamera = buttonCamera;
exports.ButtonConnectionType = ButtonConnectionType;
exports.ButtonBluetooth = ButtonBluetooth;
exports.ButtonPush = ButtonPush;
exports.ButtonActive = ButtonActive;
exports.ButtonMaps = ButtonMaps;
exports.EnableLocation = EnableLocation;
exports.HealthKit = HealthKit;



