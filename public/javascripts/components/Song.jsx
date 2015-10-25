var React = require('react');
var SongStore = require('../stores/SongStore');
var AltContainer = require('alt/AltContainer');
var SongActions = require('../actions/SongActions');
var Parts = require('./Parts.jsx');

var Song = React.createClass({

    getInitialState() {
        return {
            error: ""
        }
    },

    componentDidMount() {
        console.log("Finding songs");
        SongActions.getSong();
        SongActions.setSongName(MusicalityGlobal.songName);
    },

    addPart() {
        if(React.findDOMNode(this.refs.partname).value) {
            SongActions.addPart(React.findDOMNode(this.refs.partname).value);
            React.findDOMNode(this.refs.partname).value = "";
            this.setState({
                error: ""
            })
        }
        else {
            this.setState({
                error: "Du må gi delen et navn"
            })
        }
    },

    checkEnter(e) {

        if(e.key === "Enter") {
            console.log("Enter");
            this.addPart();
        }
    },

    render() {
        return (
            <div className="song">
                <h1>{MusicalityGlobal.songName} </h1><a href="/">Tilbake til sangoversikt</a>
                    <AltContainer store={SongStore}>
                        <Parts />
                    </AltContainer>
                    <p>{this.state.error ? this.state.error : ""}</p>
                    <div className="part">
                        <h2>Legg til ny del</h2>
                        <hr></hr>
                        <input placeholder="Navn på del" className="addPart" onKeyPress={this.checkEnter} ref="partname" />
                        <button className="addPartButton" onClick={this.addPart}><img className="headerButtons" src="/images/glyphicons-433-plus.png" /></button>
                    </div>
            </div>
        );
    }
});

module.exports = Song;