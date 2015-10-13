var React = require('react');
var InstrumentList = require('./InstrumentList.jsx');
var SongActions = require('../actions/SongActions');

var Part = React.createClass({

    addInstrument() {
        console.log("Adding instrument");
        SongActions.addInstrument({part: this.props.part.partname, instrumentName: React.findDOMNode(this.refs.instrument).value});
    },

    playPart() {
        console.log(this.refs.instrumentlist);
    },

    removePart() {
        console.log("Removing part: ", this.props.part.partname);
        SongActions.removePart(this.props.part.partname);
    },

    render() {
        return (
            <li className="part">
                <h2>{this.props.part.partname}</h2>
                <button onClick={this.removePart}>Slett del</button>

                <InstrumentList ref="instrumentlist" part={this.props.part.partname} instruments={this.props.part.instruments} />
                <input ref="instrument" /><button onClick={this.addInstrument}>Legg til instrument</button>
                <button onClick={this.playPart}>Spill del</button>

            </li>
        );
    }
});

module.exports = Part;