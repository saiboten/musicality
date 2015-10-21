var React = require('react');
var InstrumentList = require('./InstrumentList.jsx');
var SongActions = require('../actions/SongActions');
var debug = require('debug')('Part');

var Part = React.createClass({

    getInitialState() {
        return {
            error: "",
            removeEnabled: false,
            isPlaying: false
        }
    },

    addInstrument() {
        if(React.findDOMNode(this.refs.instrument).value) {
            debug("Adding instrument");
            SongActions.addInstrument({part: this.props.part.partname, instrumentName: React.findDOMNode(this.refs.instrument).value});
            React.findDOMNode(this.refs.instrument).value = "";
            this.setState( {
                error: ""
            })
        }
        else {
            this.setState( {
                error: "Instrument kan ikke være tom"
            })
        }

    },

    playOrPausePart() {
        debug("Playing/Pausing");

        if(this.state.isPlaying) {
            debug("Pausing");
            this.refs.instrumentlist.pause();
        }
        else {
            debug("Playing");
            this.refs.instrumentlist.play();
        }
        var playing = !this.state.isPlaying;

        debug("New state: ", playing);

        this.setState( {
            isPlaying: playing
        });
    },

    removePart() {
        console.log("Removing part: ", this.props.part.partname);
        this.setState({
            removeEnabled: true
        });
    },

    removePartConfirm() {
        console.log("Removing part for real: ", this.props.part.partname);
        SongActions.removePart(this.props.part.partname);
        this.setState({
            removeEnabled: false
        });
    },

    cancelRemovePart() {
        this.setState({
            removeEnabled: false
        });
    },

    addInstrumentEnter(e) {
      if(e.key === "Enter") {
          this.addInstrument();
      }
    },

    render() {
        var confirmButton = <span><button onClick={this.removePartConfirm}>Bekreft sletting</button><button onClick={this.cancelRemovePart}>Avbryt</button></span>;
        var nothing = <span />;

        return (
            <li className="part">
                <h2>{this.props.part.partname}
                    <button className="headerButtons" onClick={this.playOrPausePart}>{this.state.isPlaying ? <img src="/images/glyphicons-175-pause.png" alt="Pause part" /> : <img src="/images/glyphicons-174-play.png" alt="Play part" />}</button>
                    <button className="headerButtons" onClick={this.removePart}><img src="images/glyphicons-208-remove-2.png" /></button></h2>
                {this.state.removeEnabled ? confirmButton : nothing}

                <InstrumentList ref="instrumentlist" part={this.props.part.partname} instruments={this.props.part.instruments} />
                <input className="addInstrument" ref="instrument" onKeyDown={this.addInstrumentEnter} /><button onClick={this.addInstrument}><img src="/images/guitar38.svg" className="guitar" alt="Add instrument"></img></button>
                <p>{this.state.error ? this.state.error : ""}</p>

            </li>
        );
    }
});

module.exports = Part;