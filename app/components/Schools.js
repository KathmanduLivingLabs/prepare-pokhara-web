var React = require('react');

// var MyMap = require('./Maps')
require("../styles/contents.css")

var Schools = React.createClass({
	getInitialState: function() {
		return {
		}
	},
	componentWillMount: function () {
	},
	componentDidMount: function() {
	},
	render: function(){
		return(
			<div className="row-fluid header">
				<h2>Welcome to the schools page! {this.props.selectedPage}</h2>	
			</div>
			)
	}
})

module.exports = Schools;