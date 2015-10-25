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

    pause() {
        this.refs.alternativelist.pause();
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
                <h3>{this.props.instrument.name}
                    <img className="removeInstrument headerButtons" onClick={this.removeInstrument} src="/images/glyphicons-208-remove-2.png" />
                    <Dropzone ref="dropzone" className="dropzone" onDrop={this.onDrop}>
                        <img className="headerButtons"  src="/images/glyphicons-202-upload.png" />
                    </Dropzone>
                </h3>
                <AlternativeList part={this.props.part} instrument={this.props.instrument.name} ref="alternativelist" alternatives={this.props.instrument.alternatives} />

                {this.state.file.name ? fileupload : nothing}
            </div>
        );
    }
});

module.exports = Instrument;