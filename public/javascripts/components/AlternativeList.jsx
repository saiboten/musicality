var React = require('react');
var Alternative = require('./Alternative.jsx');

var AlternativeList = React.createClass({

    render() {
        return (
            <ul className="alternativeList">
        {this.props.alternatives.map((alternative, i) => {
            return (
                <Alternative alternative={alternative} />
            );
        })}
            </ul>
        );
    }
});

module.exports = AlternativeList;