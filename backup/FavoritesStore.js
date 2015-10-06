var alt = require('../public/javascripts/alt');
var LocationActions = require('LocationActions');

class FavoritesStore {
    constructor() {
        this.locations = [];

        this.bindListeners({
            addFavoriteLocation: LocationActions.FAVORITE_LOCATION,
            deleteFavorite: LocationActions.DELETE_FAV_LOCATION
        });
    }

    addFavoriteLocation(location) {
        this.locations.push(location);
    }

    deleteFavorite(location) {
        var new_locations = [];

        this.locations.forEach(e => {
            if(e.id !== location.id) {
                new_locations.push(e);
            }
        });
        this.locations = new_locations;
    }
}

module.exports = alt.createStore(FavoritesStore, 'FavoritesStore');