var React = require('react');
var InstrumentList = require('./InstrumentList.jsx');
var SongActions = require('../actions/SongActions');

var Part = React.createClass({

    getInitialState() {
        return {
            error: "",
            removeEnabled: false
        }
    },

    addInstrument() {
        if(React.findDOMNode(this.refs.instrument).value) {
            console.log("Adding instrument");
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

    playPart() {
        this.refs.instrumentlist.play();
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
                <h2>{this.props.part.partname}</h2>
                <img onClick={this.removePart} src="images/glyphicons-208-remove-2.png" />
                {this.state.removeEnabled ? confirmButton : nothing}

                <InstrumentList ref="instrumentlist" part={this.props.part.partname} instruments={this.props.part.instruments} />
                <input ref="instrument" onKeyDown={this.addInstrumentEnter} /><button onClick={this.addInstrument}>Legg til instrument</button>
                <p>{this.state.error ? this.state.error : ""}</p>
                <button onClick={this.playPart}>Spill del</button>

            </li>
        );
    }
});

module.exports = Part;