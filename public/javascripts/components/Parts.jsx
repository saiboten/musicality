var React = require('react');
var Part = require('./Part.jsx');

var Parts = React.createClass({
    render() {

        return (
            <ul className="parts">
            {this.props.parts.map((part, i) => {
                return (
                    <Part part={part} />
                );
            })}
            </ul>
        );
    }
});

module.exports = Parts;