var React = require('react');
var Instrument = require('./Instrument.jsx');

var InstrumentList = React.createClass({

    render() {
        return (
            <ul className="instrumentList">
              {this.props.instruments.map((instrument, i) => {
                  return (
                      <Instrument part={this.props.part} instrument={instrument} />
                  );
              })}
            </ul>
        );
    }
});

module.exports = InstrumentList;