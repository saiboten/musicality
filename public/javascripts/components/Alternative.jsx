var React = require('react');
var debug = require('debug')('Alternative');

var Alternative = React.createClass({

    isCreated: false,

    wavesurfer: undefined,

    getInitialState() {
        return {
            playtext: "images/glyphicons-174-play.png",
            playing: false,
            selected: false
        }
    },

    play() {
        if(this.state.selected && this.isCreated) {
            //React.findDOMNode(this.refs.play).play();
            this.wavesurfer.seekTo(0);
            this.wavesurfer.play();
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

    setup() {
        if(this.isCreated) {
            debug("Already created");
        }
        else {
            var wavesurfer = Object.create(WaveSurfer);

            wavesurfer.init({
                container: React.findDOMNode(this.refs.alternativeAudio),
                waveColor: 'violet',
                backend: 'MediaElement'
            });

            wavesurfer.load(this.props.alternative.href);
            var that = this;
            wavesurfer.on('ready', function () {
                debug('Song is loaded - and is ready for action!');
                that.isCreated = true;
                that.wavesurfer = wavesurfer;
            });

        }
    },

    render() {
        return (
            <li className="alternative">
                <div ref="alternativeAudio"></div>
                <button onClick={this.setup}>Last låt</button>
                <audio preload="none" ref="play" src={this.props.alternative.href}>Hallo</audio>
                {this.props.alternative.name}
                <img src={this.state.playtext} onClick={this.playPause} />
                <input type="checkbox" checked={this.state.selected} onChange={this.setSelected}>Valgt</input>
            </li>
        );
    }
});

module.exports = Alternative;