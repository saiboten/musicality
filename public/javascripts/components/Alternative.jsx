var React = require('react');
var debug = require('debug')('Alternative');
var SongActions = require('../actions/SongActions');


var Alternative = React.createClass({

    isCreated: false,

    wavesurfer: undefined,

    getInitialState() {
        return {
            playtext: "images/glyphicons-174-play.png",
            playing: false,
            selected: false,
            loaded: false
        }
    },

    play() {
        if(this.state.selected && this.isCreated) {
            var offset = 0 + this.props.alternative.offset ? this.props.alternative.offset : 0;
            debug('offset: ', offset);

            this.wavesurfer.seekTo(offset);
            this.wavesurfer.play();
        }
    },

    pause() {
        if(this.isCreated) {
            this.wavesurfer.seekTo(0);
            this.wavesurfer.pause();
        }
    },

    setSelected(e) {
      this.setState({
         selected: !this.state.selected
      });
    },

    playPause() {
        if(this.isCreated) {
            if(this.state.playing) {
                //React.findDOMNode(this.refs.play).pause();
                this.wavesurfer.pause();
            }
            else {
                //React.findDOMNode(this.refs.play).play();
                this.wavesurfer.play();
            }

            this.setState( {
                playing: !this.state.playing,
                playtext: this.state.playing ? "images/glyphicons-174-play.png":"images/glyphicons-175-pause.png"
            });
        }
    },

    adjustOffset(time) {

        debug('offset: ', this.props.alternative.offset);
        var offset = this.props.alternative.offset ? this.props.alternative.offset : 0;
        var newOffset = offset+time;
        debug('New offset', newOffset);

        var info = {
            part: this.props.part,
            instrument: this.props.instrument,
            alternative: this.props.alternative.name,
            offset: offset+time
        };

        SongActions.adjustOffset(info)
    },

    setup() {
        if(this.isCreated) {
            debug("Already created");
        }
        else {
            var wavesurfer = Object.create(WaveSurfer);

            wavesurfer.init({
                container: React.findDOMNode(this.refs.alternativeAudio),
                waveColor: 'violet',
                backend: 'MediaElement',
                height: '25'
            });

            wavesurfer.load(this.props.alternative.href);
            var that = this;
            wavesurfer.on('ready', function () {
                debug('Song is loaded - and is ready for action!');
                that.isCreated = true;
                that.wavesurfer = wavesurfer;
                that.setState({
                    loaded: true
                })
            });

        }
    },


    render() {

        var enabled = <img src={this.state.playtext} onClick={this.playPause} />;
        var checkbox = <input type="checkbox" checked={this.state.selected} onChange={this.setSelected}></input>
        var disabled = <span></span>;
        var offsetButtons = <div>{this.props.alternative.offset ? this.props.alternative.offset.toFixed(3) : 0};
            <button onClick={this.adjustOffset.bind(this,0.005)}>++</button>
            <button onClick={this.adjustOffset.bind(this,0.001)}>+</button>
            <button onClick={this.adjustOffset.bind(this,-0.001)}>-</button>
            <button onClick={this.adjustOffset.bind(this,-0.005)}>--</button></div>;

        return (
            <li className="alternative">
                <div className="audio" ref="alternativeAudio"></div>
                {this.state.loaded ? <span></span> : <button className="headerButtons" onClick={this.setup}><img className="load" src="images/arrows130.svg" alt="Load track" /></button>}
                {this.props.alternative.name}
                {this.state.loaded ? enabled : disabled}
                {this.state.loaded ? checkbox : disabled}
                {this.state.loaded ? offsetButtons : disabled}
            </li>
        );
    }
});

module.exports = Alternative;