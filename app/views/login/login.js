var geolocation = require("nativescript-geolocation");
var accelerometer = require("nativescript-accelerometer");
var touchid = require("nativescript-touchid");
var vibrator = require("nativescript-vibrate");
var imageModule = require("ui/image");
var cameraModule = require("camera");
var bluetooth = require("nativescript-bluetooth");
var connectivity = require("connectivity");
var connectionType = connectivity.getConnectionType();
var activityIndicatorModule = require("ui/activity-indicator");

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
    var indicator = new activityIndicatorModule.ActivityIndicator();
//    var image = new imageModule.Image();
//    var indicator = new activityIndicatorModule.ActivityIndicator();
//    indicator.width = 100;
//    indicator.height = 100;
//    // Bind the busy property of the indicator to the isLoading property of the image
//    indicator.bind({
//                   sourceProperty: "isLoading",
//                   targetProperty: "busy"
//                   }, image);
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

