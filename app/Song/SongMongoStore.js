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
    updateSong(data) {

        var Song = mongoose.model('Song', songSchema);

        Song.findOne({songName: data.songName}, function (err, doc) {
            console.log("document to be updated :", doc);

            if (doc) {
                console.log("Updating with new parts!");
                doc.parts = data.parts;
                doc.save();
            }
            else {
                var newSong = new Song({songName: data.songName, parts: data.parts});

                newSong.save(function (err, vintertjern) {
                    if (err) return console.error(err);
                    else {
                        console.log("Saved this one :", vintertjern);
                    }
                });
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
    }
}

module.exports = SongMongoStore;