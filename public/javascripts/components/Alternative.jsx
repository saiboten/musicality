var React = require('react');

var Alternative = React.createClass({

    getInitialState() {
        return {
            playtext: "images/glyphicons-174-play.png",
            playing: false,
            selected: false
        }
    },

    play() {
        if(this.state.selected) {
            React.findDOMNode(this.refs.play).play();
        }
    },

    setSelected(e) {
      this.setState({
         selected: !this.state.selected
      });
    },

    playPause() {
        if(this.state.playing) {
            React.findDOMNode(this.refs.play).pause();
        }
        else {
            React.findDOMNode(this.refs.play).play();
        }

        this.setState( {
            playing: !this.state.playing,
            playtext: this.state.playing ? "images/glyphicons-174-play.png":"images/glyphicons-175-pause.png"
        });
    },

    render() {
        return (
            <li className="alternative">
                <audio ref="play" src={this.props.alternative.href}>Hallo</audio>
                {this.props.alternative.name}
                <img src={this.state.playtext} onClick={this.playPause} />
                <input type="checkbox" checked={this.state.selected} onChange={this.setSelected}>Valgt</input>
            </li>
        );
    }
});

module.exports = Alternative;