var React = require('react');
var Song = require('./Song');

var Songs = React.createClass({
    render() {
        console.log("Any props here?", this.props);
        return (
            <ul className="songs">
            {this.props.songs.map((song, i) => {
                return (
                    <Song name={song.name} />
                );
            })}
            </ul>
        );
    }
});

module.exports = Songs;