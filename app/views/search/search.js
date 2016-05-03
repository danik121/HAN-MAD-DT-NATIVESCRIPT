var searchBarModule = require("ui/search-bar");

var searchBar = new searchBarModule.SearchBar();
searchBar.on(searchBarModule.SearchBar.submitEvent, function (args) {
    console.log("Search for " + args.object.text);
});
searchBar.on(searchBarModule.SearchBar.clearEvent, function (args) {
    console.log("Clear");
});