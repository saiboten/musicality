var React = require('react');

var Alternative = React.createClass({

    getInitialState() {
        return {
            votes: 0,
            playtext: "Play",
            playing: false
        }
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
            playtext: this.state.playing ? "Play":"Pause"
        });
    },

    upvote() {
        this.setState({
           votes: this.state.votes+1
        });
    },

    render() {
        return (
            <li className="alternative">
                <audio ref="play" src={this.props.alternative.href}>Hallo</audio>
                {this.props.alternative.name} - Stemmer: {this.state.votes}
                <button onClick={this.playPause}>{this.state.playtext}</button>
                <button onClick={this.upvote}>Upvote</button>
            </li>
        );
    }
});

module.exports = Alternative;