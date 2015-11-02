var alt = require('../alt');
var SongActions = require('../actions/SongActions');
var request = require('superagent');
var debug = require('debug')('SongStore');

class SongsStore {
    constructor() {
        this.songs = [];

        this.bindListeners({
            handleAddSong: SongActions.ADD_SONG,
            handleUpdateSongs: SongActions.UPDATE_SONGS,
            handleGetSongs: SongActions.GET_SONGS,
            handleRemoveSong: SongActions.REMOVE_SONG

        });
    }

    handleRemoveSong(songName) {

        debug("Song to be removed ", songName);
        var that = this;

        this.songs = this.songs.filter(song => {
            return song !== songName;
        });

        request.del('/song/' + songName).end(function(err, res) {
            console.log("Song deleted ?", res, ". Err: " ,err);
            SongActions.getSongs();
        });
    }

    handleGetSongs() {
        var that = this;
        request.get('/get_songs').end(function(err, res) {
            console.log("Did we get some songs updated ?", res, ". Err: " ,err);
            SongActions.updateSongs(res.body.songs);
        });
    }

    handleUpdateSongs(songs) {
        debug('Updating songs: ', songs);
        this.songs = songs;
    }

    handleAddSong(song) {
        this.songs.push(song);

        request.put('/song/new/' + song).end(function(err, res) {
            console.log("Backend updated ?", res, ". Err: " ,err);
            SongActions.getSongs();
        })
    }
}

module.exports = alt.createStore(SongsStore, 'SongsStore');