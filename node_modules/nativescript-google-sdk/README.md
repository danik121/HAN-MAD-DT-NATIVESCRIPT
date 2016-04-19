NativeScript plugin for Google Maps SDK
================

## The plugin is in experimental state!
## if you want to contribute please send pull request. The source code is available at [GitHub](https://github.com/valentinstoychev/NativeScript-GoogleSDK.git)

With the NativeScript plugin for Google Maps SDK you can easily use the native [Google Maps API](https://developers.google.com/maps/) in a cross-platform manner for Android and iOS.

* [Installation](#installation "How to configure and install the plugin")
* [License](#license)

Installation
===

## Install the plugin using the NativeScript CLI tooling

The plugin is available for installing as an npm package.

First you need to create a NativeScript project. If you are new to [NativeScript](http://www.nativescript.org/), please follow the [NativeScript getting started guide](http://docs.nativescript.org/getting-started) to create your app.

After you have the app created, in the command prompt, at the root of the NativeScript project, run the following command.

```
tns plugin add nativescript-google-sdk
```

Now you have the plugin installed. In this version the plugin is not adding the native Google SDKs, so you will need to add them manualy.

If you are new to GooglePlayServices, please read the [official guide about how to install the native GooglePlay services](https://developers.google.com/maps/documentation/android/start) on your machine. Make sure to get the latest SDKs installed to make sure that the entire API will be available to you.

After the GooglePlay services are installed, for Android please run the followng command: 

```
tns library add android "path to the GooglePlayServices SDK"
```
For example:
```
tns library add android "C:\Users\me\AppData\Local\Android\android-sdk\extras\google\google_play_services\libproject\google-play-services_lib"
```

This will add the native libraries in the NativeScript project and will make the native API available for consumption in JavaScript.

The next step is to modify the AndroidManifest.xml file. It is located in your project folder in *platforms/android/* folder. Please merge the content of the two ```<application>``` sections into one section only. This is all you need to do in the AndroidManifest.xml file.

The next step is to set the GooglePlay API_KEY. It is specific for each app and each user, so you need to get it from the google service. Here is a [tutorial how to obtain that key](https://developers.google.com/maps/documentation/android/signup). 

Set the API_KEY in the AndroidManifest.xml file for the ```<meta-data android:name="com.google.android.geo.API_KEY"``` entry.

You are now done and you can start using the plugin from your application! Follow the next steps to see how to use the plugin and add the maps to your application UI.

##  Adding the map to the screen.

Modify the  ```/app/main-page.xml``` file to look like this:

```
 <Page 
	xmlns="http://www.nativescript.org/tns.xsd"
	xmlns:googleSDK="tns_modules/nativescript-google-sdk"
	>
  <GridLayout>
    <googleSDK:MapView/>
  </GridLayout>
</Page>
```

and then execute

```
tns run android 
```

This will show the MapView with its default settings. To set the behavior of the MapView component you need to handle the mapCreated event and configure it. Modify the xml declaration in ```/app/main-page.xml``` file, for the MapView to look like this:
```
<googleSDK:MapView mapReady="OnMapReady"/>
```
then in the JS code behind (in ```/app/main-page.js``` file) declare the ```mapReady``` callback:
```
function OnMapReady(args) {
	var mapView = args.object.android;

	var gMap = mapView.getMap();

	/*
	 * gMap is the reference to the native GoogleMap object. See the native  API reference 
	 * to configure the map - https://developers.google.com/android/reference/com/google/android/gms/maps/GoogleMap
	 *
	 * The code below is a sample implementation which will open the map with location and marker set to Sydney, Australia.
	 *
	 */
	var latlng = new com.google.android.gms.maps.model.LatLng(-33.86, 151.20);

	gMap.setMyLocationEnabled(true);
	console.log("gMapsPlugin:onMapReady:LocationENabled");

	gMap.moveCamera(com.google.android.gms.maps.CameraUpdateFactory.newLatLngZoom(latlng, 13));
	console.log("gMapsPlugin:onMapReady:CameraMoved");       

	markerOptions = new com.google.android.gms.maps.model.MarkerOptions();
	markerOptions.title("Sydney");
	markerOptions.snippet("Australia");

	markerOptions.position(latlng);
	console.log("gMapsPlugin:onMapReady:SettingMarker");

	gMap.addMarker(markerOptions);
	console.log("gMapsPlugin:onMapReady:MarkerSet");
}
exports.OnMapReady = OnMapReady;

```
Now execute

```
tns run android 
```

and enjoy the map of Syddney, Australia on your device.

If you have any problems, questions or suggestions you are more than welcome to [log an issue in GitHub](https://github.com/valentinstoychev/NativeScript-GoogleSDK/issues).

```
// support is coming for iOS
```

[Back to Top][1]

License
===

This software is licensed under the Apache 2.0 license, quoted <a href="LICENSE" target="_blank">here</a>.
