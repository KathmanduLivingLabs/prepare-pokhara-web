var React = require('react');
require('../styles/slider.css');

var Slider = React.createClass({
    getInitialState: function(){
        return {
            value: this.props.value,
            min: this.props.min,
            max: this.props.max,
            step: this.props.step,
            label: this.props.label.toUpperCase()
        };
    },
 	change: function(e) {
		this.setState({value:e.target.value})
	},
    handleChange: function(value) {
        this.setState({
            value: value,
        });
    },
 
    render: function() {
        return (
        	<div className="clearfix">
				<label className="pull-right">{this.state.max}</label>
        		<label className="pull-left">{this.state.min}</label>
				<input onChange = {this.change} value = {this.state.value} type="range" min={this.state.min} max={this.state.max} step={this.state.step} /> 
				<label>{this.state.label}
				</label>
					<input className="pull-right" type="text" value = {this.state.value} onChange = {this.change}  name="fname"/>
			</div>
        );
    }
});
 
module.exports = Slider;