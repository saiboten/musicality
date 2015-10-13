var request = require('superagent');

var mockData = [
    {
        partname: "Introriff!",
        instruments: [
            {
                name: "Guitar",
                alternatives: []
            },
            {
                name: "Trommer",
                alternatives: []
            },
        ]
    }];

var SongSource = {
    fetch: function () {
        // returning a Promise because that is what fetch does.
        return new Promise(function (resolve, reject) {
            request.get('/song/Awesome').end(function(err, res) {
                if(err) {
                    console.log("Nope, something is wrong: ", err);
                    reject(err);
                }
                else {
                    console.log("Got some data for this song :", res.body);
                    console.log("It should look like this:", mockData);
                    resolve(res.body.parts);
                }
            });
        });
    },

    store: function() {

    }
};


module.exports = SongSource;