var alt = require('../public/javascripts/alt');
var LocationSource = require('./LocationSource');

class LocationActions {
    updateLocations(locations) {
        this.dispatch(locations);
    }

    addNewLocation(location) {
        LocationSource.addNewLocation(location).then(() => {
            this.actions.fetchLocations();
        });
    }

    fetchLocations() {
        // we dispatch an event here so we can have "loading" state.
        this.dispatch();
        LocationSource.fetch()
            .then((locations) => {
                // we can access other actions within our action through `this.actions`
                this.actions.updateLocations(locations);
            })
            .catch((errorMessage) => {
                this.actions.locationsFailed(errorMessage);
            });
    }
    locationsFailed(errorMessage) {
        this.dispatch(errorMessage);
    }

    favoriteLocation(locationId) {
        this.dispatch(locationId);
    }

    deleteFavLocation(locationId) {
        this.dispatch(locationId);
    }
}

module.exports = alt.createActions(LocationActions);