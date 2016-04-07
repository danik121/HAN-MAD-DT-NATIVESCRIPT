var timer = require("timer");
var location = null;
var Location = (function () {
    function Location() {
    }
    return Location;
})();
exports.Location = Location;
var defaultGetLocationTimeout = 5 * 60 * 1000;
function getCurrentLocation(options) {
    options = options || {};
    if (!location) {
        location = require("nativescript-geolocation");
    }
    if (options && options.timeout === 0) {
        return new Promise(function (resolve, reject) {
            var lastLocation = location.LocationMonitor.getLastKnownLocation();
            if (lastLocation) {
                if (options && typeof options.maximumAge === "number") {
                    if (lastLocation.timestamp.valueOf() + options.maximumAge > new Date().valueOf()) {
                        resolve(lastLocation);
                    }
                    else {
                        reject(new Error("Last known location too old!"));
                    }
                }
                else {
                    resolve(lastLocation);
                }
            }
            else {
                reject(new Error("There is no last known location!"));
            }
        });
    }
    return new Promise(function (resolve, reject) {
        var stopTimerAndMonitor = function (locListenerId) {
            if (timerId !== undefined) {
                timer.clearTimeout(timerId);
            }
            location.LocationMonitor.stopLocationMonitoring(locListenerId);
        };
        if (!location.isEnabled()) {
            reject(new Error("Location service is disabled"));
        }
        var successCallback = function (location) {
            if (options && typeof options.maximumAge === "number") {
                if (location.timestamp.valueOf() + options.maximumAge > new Date().valueOf()) {
                    stopTimerAndMonitor(locListener.id);
                    resolve(location);
                }
                else {
                    stopTimerAndMonitor(locListener.id);
                    reject(new Error("New location is older than requested maximum age!"));
                }
            }
            else {
                stopTimerAndMonitor(locListener.id);
                resolve(location);
            }
        };
        var locListener = location.LocationMonitor.createListenerWithCallbackAndOptions(successCallback, options);
        try {
            location.LocationMonitor.startLocationMonitoring(options, locListener);
        }
        catch (e) {
            stopTimerAndMonitor(locListener.id);
            reject(e);
        }
        if (options && typeof options.timeout === "number") {
            var timerId = timer.setTimeout(function () {
                location.LocationMonitor.stopLocationMonitoring(locListener.id);
                reject(new Error("Timeout while searching for location!"));
            }, options.timeout || defaultGetLocationTimeout);
        }
    });
}
exports.getCurrentLocation = getCurrentLocation;
