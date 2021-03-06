var React = require('react');
var Check = require('react-checkbox-group');
var Checkbox = Check.Checkbox;
var CheckboxGroup = Check.CheckboxGroup;
var _ = require('lodash')

require('../styles/checkbox.css')


var CheckboxComp = React.createClass({
    getInitialState: function() {
        return {
            options: this.props.values,
            selectedOptions: this.props.values
        };
    },
    render: function() {
        var oddCols = this.state.options.filter(function(option, i) {
            if (!(i % 2)) return option; })
        var evenCols = this.state.options.filter(function(option, i) {
            if (i % 2) return option; })
        return (
            <div className="row-fluid clearfix checkboxes">
        <div className="row-fluid filter-title">
                {this.props.title}
        </div>
        <CheckboxGroup
          name="options"
          value={this.state.selectedOptions}
          onChange={this.optionsChanged}>
          <div className="col-md-6">
          {oddCols.map(function (option, i) {
            return (
                <div  key = {i} className="row-fluid">
                <label>
                <Checkbox value={option}/> {option}
                </label>
                </div>
              )
          }.bind(this))}
          </div>

      <div className="col-md-6">
            
          {evenCols.map(function (option, i) {
            return (
                <div  key = {i} className="row-fluid">
                <label >
                <Checkbox value={option}/> {option}
                </label>
                </div>
              )
          }.bind(this))}
          </div>

        </CheckboxGroup>
      </div>
        );
    },
    optionsChanged: function(newOptions) {
        // console.log("Selected features:", newOptions);
        var filters = {}
        var test = {}
            // console.log(newOptions);

        // newOptions.map(function(option){
        //   filters[option]="yes"
        // });

        filters["Operator Type"] = newOptions;
        // console.log(JSON.stringify(test))
        // console.log("Selectedfilters:",filters)
        this.setState({
            selectedOptions: newOptions
        }, this.props.handler(filters));
    }
});

module.exports = CheckboxComp
