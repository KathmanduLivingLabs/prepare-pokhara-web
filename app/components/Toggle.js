var React = require('react')
var _ = require('lodash')
var Toggle = require('react-toggle')

require('../styles/toggle.css')

var Toggle = React.createClass({
	getInitialState: function() {
		return {
			toggleValue: false
		}
	},
	onToggle: function() {
		var newValue = !this.state.toggleValue
		this.setState({
			toggleValue: newValue
		}, this.props.handler(this.props.label))
	},
	render: function() {
		return (
				<div className="switch row-fluid">
				  <input id={this.props.label} onChange = {this.onToggle} checked={this.state.toggleValue} className="cmn-toggle cmn-toggle-round" type="checkbox"/>
				  <label htmlFor={this.props.label} ></label>
				  <span className="radio-label">{this.props.label.toUpperCase()}</span>
				</div>
			)
	}
})


var ToggleGroup = React.createClass({
	getInitialState: function() {
		return {
			options: this.props.values,
			selectedOptions: []
		}
	},
	onToggleChange: function(label) {
		var filtersArray = this.state.selectedOptions
		
		if (!_.includes(filtersArray, label)) {
			filtersArray.push(label)
		} else {
			_.remove(filtersArray, function(item) {
			  return item == label;
			});
		} 

		var filtersObject = {}
		filtersArray.map(function(item){
			filtersObject[item] = "yes"
		})

		this.setState({
			selectedOptions: filtersArray
		}, this.props.handler(filtersObject));

	},
	render: function() {
		    var oddCols = this.state.options.filter(function(option, i){ if( !(i % 2) ) return option;})
    		var evenCols = this.state.options.filter(function(option, i){ if( i % 2 ) return option;})
			return (
				<div className="row-fluid clearfix checkboxes">
					<div className="row-fluid filter-title">
						{this.props.title}
					</div>

					<div className="col-md-6">
						{oddCols.map(function(option, i){
						return (<div className="row" key={i}><Toggle label = {option} handler ={this.onToggleChange} /></div>)
						}.bind(this))}
					</div>

					<div className="col-md-6">
						{evenCols.map(function(option, i){
						return (<div className="row" key={i}><Toggle label = {option} handler ={this.onToggleChange} /></div>)
						}.bind(this))}
					</div>
				</div>
			)
	}
})

module.exports = ToggleGroup