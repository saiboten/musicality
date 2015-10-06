var alt = require('../alt');
var SongSource = require('../sources/SongSource');

class SongActions {

    getSong() {

        console.log("Yeah, SongACtions! songs");
        // we dispatch an event here so we can have "loading" state.
        this.dispatch();
        SongSource.fetch()
            .then((song) => {
                // we can access other actions within our action through `this.actions`
                console.log("Got it baby! Got the songs!");
                this.actions.updateSong(song);
            })
            .catch((errorMessage) => {
                this.actions.songFailed(errorMessage);
            });
    }

    updateSong(song) {
        this.dispatch(song);
    }

    addSong(newSong) {
        this.dispatch(newSong);
    }

    addPart(partName) {
        this.dispatch(partName);
    }

    addInstrument(info) {
        console.log("Dispatching ADD INSTRUMENT");
        this.dispatch(info);
    }

    songFailed(errorMessage) {
        this.dispatch(errorMessage);
    }
}

module.exports = alt.createActions(SongActions);