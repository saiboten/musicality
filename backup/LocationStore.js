var alt = require('../public/javascripts/alt');
var LocationActions = require('LocationActions');
var LocationSource = require('LocationSource');
var FavoritesStore = require('./FavoritesStore');

class LocationStore {
    constructor() {
        this.locations = [];
        this.errorMessage = null;

        this.bindListeners({
            handleUpdateLocations: LocationActions.UPDATE_LOCATIONS,
            handleFetchLocations: LocationActions.FETCH_LOCATIONS,
            handleLocationsFailed: LocationActions.LOCATIONS_FAILED,
            setFavorites: LocationActions.FAVORITE_LOCATION,
            deleteFavoriteLocations: LocationActions.DELETE_FAV_LOCATION
        });

        this.exportPublicMethods({
            getLocation: this.getLocation
        });

        //this.exportAsync(LocationSource);
    }

    deleteFavoriteLocations(location) {

        console.log("Deleting location: ", location);
        console.log("Current locations: ", this.locations);

        var favoritedLocations = FavoritesStore.getState().locations;

        for (var i = 0; i < this.locations.length; i += 1) {

            // set has_favorite to false
            if (this.locations[i].id === location.id) {
                console.log("Deleting ", this.locations[i]);
                this.locations[i].has_favorite = false;
                break;
            }
        }
    }

    handleUpdateLocations(locations) {
        this.locations = locations;
        this.errorMessage = null;
    }

    handleFetchLocations() {
        this.locations = [];
    }

    handleLocationsFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }

    setFavorites(location) {

        console.log("Setting favorit location: ", location);
        console.log("Current locations: ", this.locations);

        this.waitFor(FavoritesStore);

        // find each location in the array
        for (var i = 0; i < this.locations.length; i += 1) {
            // set has_favorite to true
            if (this.locations[i].id === location.id) {
                this.locations[i].has_favorite = true;
                break;
            }
        }
    }

    getLocation(id) {
        var { locations } = this.getState();
        for (var i = 0; i < locations.length; i += 1) {
            if (locations[i].id === id) {
                return locations[i];
            }
        }

        return null;
    }

}

module.exports = alt.createStore(LocationStore, 'LocationStore');