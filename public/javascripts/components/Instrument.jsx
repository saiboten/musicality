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

module.exports = Instrument;