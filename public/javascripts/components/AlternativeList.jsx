var React = require('react');
var Alternative = require('./Alternative.jsx');

var AlternativeList = React.createClass({

    play() {
        console.log("refs", this.refs);
        this.props.alternatives.forEach(alternative => {
            this.refs[alternative.name].play();
        });
    },

    render() {
        return (
            <ul className="alternativeList">
        {this.props.alternatives.map((alternative, i) => {
            console.log(alternative);
            return (
                <Alternative ref={alternative.name} key={alternative.name} alternative={alternative} />
            );
        })}
            </ul>
        );
    }
});

module.exports = AlternativeList;