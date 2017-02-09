var React = require('react');
var PropTypes = React.PropTypes;

var Updater = React.createClass({
	getInitialState: function() {
		// this.originalText=this.props.text; 
		return {
		}	
	},
	componentDidMount: function() {
		console.log(this.props.config)
	},

	componentDidUpdate: function() {
		console.log(this.props.config)
	},
	componentWillUnmount: function(){
	},
	render: function() {
		return (
				<div className="clearfix row-fluid" style = {{opacity:this.props.config.opacity, pointerEvents: this.props.config.allowPointer}}>
					{this.props.children}
				</div>
			);
	}
})

module.exports = Updater;