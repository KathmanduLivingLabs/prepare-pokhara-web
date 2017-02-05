
var React = require('react');

var Puker = React.createClass({
	render: function() {
		return (
		 <pre>{JSON.stringify(this.props.data, " ", 1)}</pre>
		)
	}
})

module.exports = Puker