/**
 * Created by Tobias on 11.10.2015.
 */
var SongMongoStore = require('./SongMongoStore');

var SongService = {
    updateSong(songname, data) {
        return SongMongoStore.updateSong(songname, data);
    },

    addSong(songName) {
        SongMongoStore.addSong(songName);
    },

    deleteSong(songName) {
        SongMongoStore.deleteSong(songName);
    },

    getSong(name) {
        console.log("SongService:: Finding song :", name);
        return SongMongoStore.getSong(name);
    },

    getSongs(name) {
        console.log("SongService:: Finding all songs");
        return SongMongoStore.getSongs();
    }
};

module.exports = SongService;