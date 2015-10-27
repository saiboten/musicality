var request = require('superagent');

var SongSource = {
    fetch: function () {
        // returning a Promise because that is what fetch does.
        return new Promise(function (resolve, reject) {
            request.get('/song/rest/' + MusicalityGlobal.songName).end(function(err, res) {
                if(err) {
                    console.log("Nope, something is wrong: ", err);
                    reject(err);
                }
                else {
                    console.log("Got some data for this song :", res.body);
                    resolve(res.body.parts);
                }
            });
        });
    },

    fetchAllSongs() {
        return new Promise(function (resolve, reject) {
            request.get('/get_songs').end(function(err, res) {
                if(err) {
                    console.log("Nope, something is wrong: ", err);
                    reject(err);
                }
                else {
                    console.log("Got all songs :", res.body);
                    resolve(res.body.songs);
                }
            });
        });
    },

    store: function() {

    }
};


module.exports = SongSource;