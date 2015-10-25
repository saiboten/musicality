var React = require('react');
var Song = require('./components/Song.jsx');
var SongSelector = require('./components/SongSelector.jsx');

if(document.getElementById('ReactApp')) {
    console.log("React app found, yeah!");
    React.render(
        <Song />,
        document.getElementById('ReactApp')
    );
}

if(document.getElementById('SongSelector')) {
    console.log("Song selector app found, yeah!");
    React.render(
        <SongSelector />,
        document.getElementById('SongSelector')
    );
}
