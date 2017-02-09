var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;

// Load Components
var Nav = require('./Nav')

// var MyMap = require('./Maps')

require("../styles/styles.css")

var Home = React.createClass({
	getInitialState: function() {
		return {
		}
	},
	updateNavState: function(selectedPage) {
		this.setState({selectedPage: selectedPage});
	},
	componentWillMount: function () {
		this.updateNavState();
	},
	componentDidMount: function() {
	},
	render: function(){
		return(
			<div>
				<Nav updateRootState={this.updateNavState} location={this.props.location} />
				{React.cloneElement(this.props.children, this.state)}
			</div>
			)
	}
})

module.exports = Home;