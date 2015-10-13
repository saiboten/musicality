var alt = require('../alt');
var SongSource = require('../sources/SongSource');
var debug = require('debug')('SongActions');

class SongActions {

    getSong() {

        debug("Yeah, SongACtions! songs");
        // we dispatch an event here so we can have "loading" state.
        this.dispatch();
        SongSource.fetch()
            .then((song) => {
                // we can access other actions within our action through `this.actions`
                debug("Got it baby! Got the songs!");
                this.actions.updateSong(song);
            })
            .catch((errorMessage) => {
                this.actions.songFailed(errorMessage);
            });
    }

    updateSong(song) {
        this.dispatch(song);
    }

    addAlternative(alternative) {
        this.dispatch(alternative);
    }

    addPart(partName) {
        this.dispatch(partName);
    }

    removePart(partName) {
        this.dispatch(partName);
    }

    addInstrument(info) {
        debug("Dispatching ADD INSTRUMENT");
        this.dispatch(info);
    }

    songFailed(errorMessage) {
        this.dispatch(errorMessage);
    }
}

module.exports = alt.createActions(SongActions);