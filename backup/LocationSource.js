var mockData = [
    { id: 0, name: 'Song 1', href: '/src/songs/1.mp3' },
    { id: 1, name: 'Song 2', href: '/src/songs/2.mp3' }
];

var LocationSource = {
    fetch: function () {
        // returning a Promise because that is what fetch does.
        return new Promise(function (resolve, reject) {
            // simulate an asynchronous action where data is fetched on
            // a remote server somewhere.
            setTimeout(function () {
                // resolve with some mock data
                resolve(mockData);
            }, 250);
        });
    },

    addNewLocation: function(city) {

        console.log("New city data: ", city);

        mockData.push({
            name: city,
            id: mockData.length
        });

        return new Promise(function(resolve, reject) {
            resolve();
        });
    }
};

module.exports = LocationSource;