var React = require('react');
var SongStore = require('../stores/SongStore');
var AltContainer = require('alt/AltContainer');
var SongActions = require('../actions/SongActions');
var Parts = require('./Parts.jsx');

var Song = React.createClass({

    componentDidMount() {
        console.log("Finding songs");
        SongActions.getSong();
    },

    addPart() {
        SongActions.addPart(React.findDOMNode(this.refs.partname).value);
    },

    render() {
        return (
            <div className="song">
                <h1>Vintertjern</h1>
                <ol>
                    <AltContainer store={SongStore}>
                        <Parts />
                    </AltContainer>
                </ol>
                <input ref="partname" />
                <button onClick={this.addPart}>Legg til del</button>
            </div>
        );
    }
});

module.exports = Song;