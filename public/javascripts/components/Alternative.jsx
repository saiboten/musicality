var React = require('react');
var debug = require('debug')('Alternative');

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

        return (
            <li className="alternative">
                <div ref="alternativeAudio"></div>
                {this.state.loaded ? <span></span> : <button onClick={this.setup}>Last inn låt</button>}
                {this.props.alternative.name}
                {this.state.loaded ? enabled : disabled}
                {this.state.loaded ? checkbox : disabled}
            </li>
        );
    }
});

module.exports = Alternative;