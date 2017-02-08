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
			<div className="header row-fluid">
				<div className="jumbotron text-center">
				<h1>Welcome to the schools section!</h1>	
				<hr/>
				<h3>This page is currently under development. Please come back later!</h3>	
				</div>
			</div>
			)
	}
})

module.exports = Schools;