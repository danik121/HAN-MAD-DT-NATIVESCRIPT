
var view = require("ui/core/view");
var application = require("application");
var mapViewInstance;

var MapView = (function (_super) {
    __extends(MapView, _super);
    function MapView() {
        _super.apply(this, arguments);
        console.log("gMapsPlugin:constructor");

        this.on("loaded", this.onLoaded);
    }

    MapView.prototype.onLoaded = function (args)
    {
        console.log("gMapsPlugin:onLoaded");

        var that = this;
        // TODO expose these as events, create issue.
        application.android.onActivityDestroyed = function (activity)
        {
            console.log("gMapsPlugin:onActivityDestroyed");
            that.android.onDestroy();
        }

        application.android.onActivityPaused = function (activity)
        {
            console.log("gMapsPlugin:onActivityPaused");
           that.android.onPause();
        }

        application.android.onActivityResumed = function (activity)
        {
            console.log("gMapsPlugin:onActivityResumed");
           that.android.onResume();
        }

        application.android.onActivitySaveInstanceState = function (activity, bundle)
        {
            console.log("gMapsPlugin:onActivitySaveInstanceState");
            that.android.onSaveInstanceState(bundle);
        }
    }

    Object.defineProperty(MapView.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });

    MapView.prototype._createUI = function () {
        console.log("gMapsPlugin:_createUI");

        var that = new WeakRef(this);

        var activity = this._context;
        this._android = new com.google.android.gms.maps.MapView(activity);
        this._android.onCreate(null);

        var callbacks = new com.google.android.gms.maps.OnMapReadyCallback({
            onMapReady: function (gMap) {

                that.get()._emit(MapView.mapReadyEvent);
                console.log("gMapsPlugin:onMapReady:GoogleMap=" + gMap);
            }
        });

        console.log("gMapsPlugin:getMapAsync");
        this._android.getMapAsync(callbacks);

    };
    MapView.mapReadyEvent = "mapReady";
    return MapView;
})(view.View);
exports.MapView = MapView;
