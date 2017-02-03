var React = require('react');
var Check = require('react-checkbox-group');
var Checkbox = Check.Checkbox;
var CheckboxGroup = Check.CheckboxGroup;

var CheckboxComp = React.createClass({
  getInitialState: function() {
    return {
      options: this.props.values,
      selectedOptions: this.props.values
    };
  },

  componentDidMount: function() {
  },

  render: function() {
    // the checkboxes can be arbitrarily deep. They will always be fetched and
    // attached the `name` attribute correctly. `value` is optional
    var col1 = this.state.options.filter(function(fruit, i){ if( !(i % 2) ) return fruit;})
    var col2 = this.state.options.filter(function(fruit, i){ if( i % 2 ) return fruit;})
    // console.log(col1, col2);
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
        {col1.map(function (fruit, i) {
        	return (
        			<div  key = {i} className="row-fluid">
        			<label >
        			<Checkbox value={fruit}/> {fruit}
        			</label>
        			</div>
        		)
        }.bind(this))}
        </div>

		<div className="col-md-6">
        	
        {col2.map(function (fruit, i) {
        	return (
        			<div  key = {i} className="row-fluid">
        			<label >
        			<Checkbox value={fruit}/> {fruit}
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
  	console.log("Selected features:", newOptions);
    this.setState({
      selectedOptions: newOptions
    });
  }
});

module.exports = CheckboxComp