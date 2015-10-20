var React = require('react');
var AlternativeList = require('./AlternativeList.jsx');
var SongActions = require('../actions/SongActions');
var request = require('superagent');
var Dropzone = require('react-dropzone');
var debug = require('debug')('Instrument');

var Instrument = React.createClass({

    componentDidMount() {
        this.refs.dropzone.multiple = false;
    },

    getInitialState() {
        return {file: {}}
    },

    onDrop: function (files) {
        debug('Received files: ', files);
        this.setState({
            file: files[0]
        })
    },

    play() {
      this.refs.alternativelist.play();
    },

    removeInstrument() {
        SongActions.removeInstrument({
            partName: this.props.part,
            instrumentName: this.props.instrument.name
        });
    },

    upload() {
        var req = request.post('/upload');
        req.query({ filename: this.state.file.name });

        req.attach("whatisthis", this.state.file);

        var songname = this.state.file.name;
        var that = this;

        req.end(function(err, res) {
            debug("err, ", err);
            debug("res, ", res);

            SongActions.addAlternative({
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

    abortUpload() {
        this.setState({
            file: {}
        })
    },

    render() {
        var fileupload = <p>Fil som blir lastet opp: {this.state.file.name}<button onClick={this.upload}>Last opp</button><button onClick={this.abortUpload}>Avbryt opplasting</button></p>;
        var nothing = <span></span>

        return (
            <div className="instrument">
                <h3>{this.props.instrument.name} <img onClick={this.removeInstrument} src="images/glyphicons-208-remove-2.png" /></h3>
                <AlternativeList ref="alternativelist" alternatives={this.props.instrument.alternatives} />
                <Dropzone ref="dropzone" className="dropzone" onDrop={this.onDrop}>
                    <div>Klikk/Drop flere spor her</div>
                </Dropzone>
                {this.state.file.name ? fileupload : nothing}
            </div>
        );
    }
});

module.exports = Instrument;