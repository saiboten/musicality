/**
 * Created by Tobias on 11.10.2015.
 */
var SongMongoStore = require('./SongMongoStore');

var SongService = {
    updateSong(data) {
        return SongMongoStore.updateSong(data);
    },

    getSong(name) {
        console.log("SongService:: Finding song :", name);
        return SongMongoStore.getSong(name);
    }
};

module.exports = SongService;