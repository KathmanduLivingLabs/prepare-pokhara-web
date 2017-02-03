var React = require('react');
var ReactDOM = require('react-dom');
var Dropdown = require('react-dropdown')


var Drop = React.createClass({
    getInitialState: function(){
        return {
            options: this.props.options,
            value: 0
            // defaultOption: 2,
            // value: 'two',
            // placeholder: "Bleh"
        };
    },
 	handleChange: function(e) {
        // var selectedVar = (this.state.options[e.target.value]);
        console.log("Selected Ward:", this.state.options[e.target.value])
        this.setState({value: e.target.value});  
	},
    render: function() {
        return (
        	<div className="clearfix">
                            <div className="row-fluid filter-title">
                                {this.props.title}
                            </div>
                            <select onChange={this.handleChange} value={this.state.value}>
                                {this.state.options.map(function(option, i){
                                        return <option value={i} key={i} >{option.toUpperCase()}</option>;
                                }.bind(this))}
                            </select> 			
            </div>
        );
    }
});
 
module.exports = Drop;