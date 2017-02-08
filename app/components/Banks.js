var React = require('react');

require("../styles/contents.css")

var Banks = React.createClass({
	getInitialState: function() {
		return {
			selectedPage: this.props.selectedPage
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
				<h1>Welcome to the banks page!</h1>	
				<hr/>
				<h3>This page is currently under development. Please come back later!</h3>	
				</div>
			</div>
			)
	}
})

module.exports = Banks;