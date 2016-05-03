var activityIndicatorModule = require("ui/activity-indicator");
var ImageModule = require("ui/image");
var image = new ImageModule.Image();
var indicator = new activityIndicatorModule.ActivityIndicator();
indicator.width = 100;
indicator.height = 100;
// Bind the busy property of the indicator to the isLoading property of the image
indicator.bind({
    sourceProperty: "isLoading",
    targetProperty: "busy"
}, image);