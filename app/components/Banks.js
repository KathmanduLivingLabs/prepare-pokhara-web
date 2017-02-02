var React = require('react');

require("../styles/contents.css")

var Banks = React.createClass({
	getInitialState: function() {
		return {
			selectedPage: this.props.selectedPage
		}
	},
	componentWillMount: function () {
		// console.log(this.props)
	},
	componentDidMount: function() {
	},
	render: function(){
		return(
			<div className="header">
				Welcome to the banks page! {this.props.selectedPage}
			</div>
			)
	}
})

module.exports = Banks;