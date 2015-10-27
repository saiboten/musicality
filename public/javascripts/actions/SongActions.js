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

    adjustOffset(info) {
        this.dispatch(info)
    }

    addAlternative(alternative) {
        this.dispatch(alternative);
    }

    addPart(partName) {
        this.dispatch(partName);
    }

    addSong(song) {
        this.dispatch(song);
    }

    getSongs() {
        this.dispatch();
        SongSource.fetchAllSongs()
            .then((songs) => {
                // we can access other actions within our action through `this.actions`
                debug("Got it baby! Got the songs!");
                this.actions.updateSongs(songs);
            })
            .catch((errorMessage) => {
                this.actions.songFailed(errorMessage);
            });
    }

    updateSongs(songs) {
        this.dispatch(songs);
    }

    removeInstrument(info) {
        debug("Dispatching remove instrument");
        this.dispatch(info);
    }

    removeAlternative(info) {
        debug("Dispatching remove alternative");
        this.dispatch(info);
    }

    removePart(partName) {
        debug("Dispatching remove part");
        this.dispatch(partName);
    }

    addInstrument(info) {
        debug("Dispatching ADD INSTRUMENT");
        this.dispatch(info);
    }

    songFailed(errorMessage) {
        this.dispatch(errorMessage);
    }

    setSongName(songName) {
        this.dispatch(songName);
    }
}

module.exports = alt.createActions(SongActions);