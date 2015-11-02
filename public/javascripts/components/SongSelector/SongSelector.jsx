var React = require('react');
var AltContainer = require('alt/AltContainer');
var SongsStore = require('../../stores/SongsStore');
var SongActions = require('../../actions/SongActions');
var Songs = require('./Songs.jsx');

var debug = require('debug')('SongSelector');

var SongSelector = React.createClass({

    getInitialState() {
      return {
          valid: true
      }
    },

    componentDidMount() {
        debug("Findings songs");
        SongActions.getSongs();
    },

    addSong() {

        var newSongName = React.findDOMNode(this.refs.song ).value;
        debug("Adding song", newSongName);

        if(newSongName) {
            debug('Valid');
            SongActions.addSong(newSongName);
            //window.location = '/song/' + newSongName;
        }
        else {
            this.setState({
                valid: false
            })
        }
    },

    checkEnter(e) {
        if(e.key === "Enter") {
            debug("Enter");
            this.addSong();
        }
    },

    render() {

        debug("Props? ", this.props);
        return (
        <div>
            <input onKeyPress={this.checkEnter} ref="song" placeholder="New Song" />
            <button onClick={this.addSong}>Ny låt</button>
        {this.state.valid ? "": <div>Sangnavn kan ikke være tom</div>}
            <AltContainer store={SongsStore}>
               <Songs />
            </AltContainer>
        </div>
        );
    }
});

module.exports = SongSelector;