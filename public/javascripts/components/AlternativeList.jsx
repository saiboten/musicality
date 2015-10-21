var React = require('react');
var Alternative = require('./Alternative.jsx');

var AlternativeList = React.createClass({

    play() {
        this.props.alternatives.forEach(alternative => {
            this.refs[alternative.name].play();
        });
    },

    pause() {
        this.props.alternatives.forEach(alternative => {
            this.refs[alternative.name].pause();
        });
    },

    render() {
        return (
            <ul className="alternativeList">
        {this.props.alternatives.map((alternative, i) => {
            console.log(alternative);
            return (
                <Alternative part={this.props.part} instrument={this.props.instrument} ref={alternative.name} key={alternative.name} alternative={alternative} />
            );
        })}
            </ul>
        );
    }
});

module.exports = AlternativeList;