var React = require('react');

var Songs = React.createClass({
    render() {

        console.log("Any props here?", this.props);
        return (
            <ul className="songs">
            {this.props.songs.map((song, i) => {
                return (
                    <li><a href={'song/' + song.name}>{song.name}</a></li>
                );
            })}
            </ul>
        );
    }
});

module.exports = Songs;