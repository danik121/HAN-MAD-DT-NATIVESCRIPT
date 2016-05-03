var listviewModule = require("ui/core/view");
var borderModule = require("ui/border");

function pageLoaded(args) {
    var page = args.object;

    var countries = [
        { name: "Nederland" },
        { name: "Belgie" },
        { name: "Luxemburg" },
        { name: "Duitsland" },
        { name: "Frankrijk" },
        { name: "Spanje" },
        { name: "Portugal" },
        { name: "Polen" },
        { name: "Schotland" },
        { name: "Ierland" },
        { name: "Griekenland" },
        { name: "Turkije" },
        { name: "Zwitserland" },
        { name: "Oosterijk" },
        { name: "Denemarken" },
        { name: "Japan" },
        { name: "Aruba" },
        { name: "Noorwegen" },
        { name: "Zweden" },
        { name: "Finland" }
    ];

    page.bindingContext = { countries };

    // Will work!
    var listView1 = listviewModule.getViewById(page, "listView1");
}
exports.pageLoaded = pageLoaded;