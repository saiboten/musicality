var React = require('react');
var Instrument = require('./Instrument.jsx');

var InstrumentList = React.createClass({

    play() {
        this.props.instruments.forEach(instrument => {
            this.refs[instrument.name].play();
        })
    },

    pause() {
        this.props.instruments.forEach(instrument => {
            this.refs[instrument.name].pause();
        })
    },

    render() {

        return (
            <ul className="instrumentList">
                {this.props.instruments.map((instrument, i) => {

                    return (
                        <Instrument ref={instrument.name} key={instrument.name} part={this.props.part} instrument={instrument} />
                    );
                })}
            </ul>

        );
    }
});

module.exports = InstrumentList;