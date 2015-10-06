var React = require('react');
var SongStore = require('../stores/SongStore');
var AltContainer = require('alt/AltContainer');
var SongActions = require('../actions/SongActions');
var Dropzone = require('react-dropzone');
var request = require('superagent');


var Alternative = React.createClass({


    play() {
      React.findDOMNode(this.refs.play).play();
    },

    render() {
        return (
            <li className="alternative"><audio ref="play" src={this.props.alternative.href}>Hallo</audio>{this.props.alternative.name}<button onClick={this.play}>Play</button></li>
        );
    }
});

var AlternativeList = React.createClass({

    render() {
        return (
            <ul className="alternativeList">
        {this.props.alternatives.map((alternative, i) => {
            return (
                <Alternative alternative={alternative} />
            );
        })}
            </ul>
        );
    }
});

var Instrument = React.createClass({

    componentDidMount() {
        this.refs.dropzone.multiple = false;
    },

    getInitialState() {
        return {file: {}}
    },

    onDrop: function (files) {
        console.log('Received files: ', files);
        this.setState({
            file: files[0]
        })
    },

    upload() {
        var req = request.post('/upload');
        req.query({ filename: this.state.file.name });

        req.attach("whatisthis", this.state.file);

        var songname = this.state.file.name;
        var that = this;

        req.end(function(err, res) {
            console.log("err, ", err);
            console.log("res, ", res);

            SongActions.addSong({
                href: '/songs/'+songname,
                name: songname,
                part: that.props.part,
                instrument: that.props.instrument.name
            });
            that.setState({
                file: {}
            })
        });


    },

    render() {

        return (
            <div className="instrument">
                <h3>{this.props.instrument.name}</h3>
                <AlternativeList alternatives={this.props.instrument.alternatives} />
                <Dropzone ref="dropzone" className="dropzone" onDrop={this.onDrop}>
                    <div>Nytt alternativ</div>
                </Dropzone>
                <p>Fil som blir lastet opp: {this.state.file.name}<button onClick={this.upload}>Last opp</button></p>
            </div>
        );
    }
});

var InstrumentList = React.createClass({

    render() {
        return (
            <ul className="instrumentList">
              {this.props.instruments.map((instrument, i) => {
                  return (
                      <Instrument part={this.props.part} instrument={instrument} />
                  );
              })}
            </ul>
        );
    }
});


var Part = React.createClass({

    addInstrument() {
        console.log("Adding instrument");
        SongActions.addInstrument({part: this.props.part.partname, instrumentName: React.findDOMNode(this.refs.instrument).value});
    },

    playPart() {
        console.log(this.refs.instrumentlist);
    },

    render() {
        return (
            <li className="part">
                <h2>{this.props.part.partname}</h2>
                <InstrumentList ref="instrumentlist" part={this.props.part.partname} instruments={this.props.part.instruments} />
                <input ref="instrument" /><button onClick={this.addInstrument}>Legg til instrument</button>
                <button onClick={this.playPart}>Spill del</button>

            </li>
    );
    }
});

var Parts = React.createClass({
    render() {

        return (
        <ul className="parts">
            {this.props.parts.map((part, i) => {
             return (
             <Part part={part} />
             );
             })}
        </ul>
        );
    }
});

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