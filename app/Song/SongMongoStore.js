/**
 * Created by Tobias on 11.10.2015.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/musicality');
var db = mongoose.connection;

var songSchema = mongoose.Schema(
{
    songName: String,
    parts: [{
        partname: String,
        instruments: [
            {
                name: String,
                alternatives: [{
                    name: String,
                    href: String,
                    offset: Number
                }]
            }
        ]
    }]
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    // yay
    console.log("Open");
});

var SongMongoStore = {
    updateSong(songname, data) {

        var Song = mongoose.model('Song', songSchema);

        Song.findOne({songName: songname}, function (err, doc) {
            console.log("document to be updated :", doc);

            if (doc) {
                console.log("Updating with new parts!");
                doc.parts = data.parts;
                doc.save();
            }
            else {
                var newSong = new Song({songName: songname, parts: data.parts});

                newSong.save(function (err, vintertjern) {
                    if (err) return console.error(err);
                    else {
                        console.log("Saved this one :", vintertjern);
                    }
                });
            }
        });
    },


    addSong(songname) {

        var Song = mongoose.model('Song', songSchema);
        var newSong = new Song({songName: songname, parts: []});

        newSong.save(function (err, storedSong) {
            if (err) return console.error(err);
            else {
                console.log("Saved this one :", storedSong);
            }
        });
    },


    getSong(name) {
        console.log("Finding song with name ", name);
        return new Promise(function(success, errorCallback) {

            var Song = mongoose.model('Song', songSchema);
            Song.findOne({songName: name}, function (err, doc) {
                console.log("Found stuff? ", err, doc);
                if(doc) {
                    console.log("Found a document!");;
                    success(doc);
                }
                else {
                    console.log("Error, could not find doc");
                    errorCallback({error: "Fant ikke noe"});
                }
            });
        });
    },

    getSongs() {
        console.log("Finding all songs");
        return new Promise(function(success, errorCallback) {

            var Song = mongoose.model('Song', songSchema);
            Song.find({}, function (err, docs) {
                console.log("Found stuff? ", err, docs);
                if(docs) {
                    console.log("Found the songs!");;
                    success(docs.map(function(song) {
                        return {name: song.songName};
                    }));
                }
                else {
                    console.log("Error, could not find doc");
                    errorCallback({error: "Fant ikke noe"});
                }
            });
        });
    }
}

module.exports = SongMongoStore;