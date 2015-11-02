var React = require('react');
var SongActions = require('../../actions/SongActions');
var debug = require('debug')('SongSelectorSong');

var Songs = React.createClass({

    getInitialState() {
        return {
            confirm: false
        }
    },

    delete() {
        if(this.state.confirm) {
            this.deleteConfirmed();
        }
        else {
            debug("Setting confirm state to true");
            this.setState({
                confirm: true
            })
        }
    },

    cancel() {
        debug("Setting confirm state to false");
        this.setState({
            confirm: false
        })
    },

    deleteConfirmed() {
        debug("Removing song: ", this.props.name);
        SongActions.removeSong(this.props.name);
    },

    render() {

        var confirm = this.state.confirm ? <span><button onClick={this.cancel}>Cancel</button></span> : "";

        return (
            <li><a href={'song/' + this.props.name}>{this.props.name}</a><img src="/images/glyphicons-208-remove-2.png" onClick={this.delete}></img>{confirm}</li>
        );
    }
});

module.exports = Songs;