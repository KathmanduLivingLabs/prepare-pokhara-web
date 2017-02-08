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
 	handleChange: function(e) {
        this.setState({value:e.target.value})
	},
    handleMouseUp: function(e) {
        console.log("Selected bed capacity: ",e.target.value)
        this.setState({value:e.target.value}, this.props.handler(e.target.value))
    },
    render: function() {
        return (
        	<div className="clearfix row-fluid">
                        <div className="row-fluid filter-title">
                            {this.props.title}
                        </div>
                <label className="pull-right">{this.state.max}</label>
                <label className="pull-left">{this.state.min}</label>
                    <input onChange = {this.handleChange} onMouseUp={this.handleMouseUp} value = {this.state.value} type="range" min={this.state.min} max={this.state.max} step={this.state.step} /> 
                {this.props.outputlabel} {this.state.value}
			</div>   
        );
    }
});
 
module.exports = Slider;
