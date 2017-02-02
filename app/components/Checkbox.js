var React = require('react');
var Check = require('react-checkbox-group');
var Checkbox = Check.Checkbox;
var CheckboxGroup = Check.CheckboxGroup;

var CheckboxComp = React.createClass({
  getInitialState: function() {
    return {
      fruits: this.props.values,
      newfruits: this.props.values
    };
  },

  componentDidMount: function() {
  },

  render: function() {
    // the checkboxes can be arbitrarily deep. They will always be fetched and
    // attached the `name` attribute correctly. `value` is optional
    var col1 = this.state.fruits.filter(function(fruit, i){ if( !(i % 2) ) return fruit;})
    var col2 = this.state.fruits.filter(function(fruit, i){ if( i % 2 ) return fruit;})
    // console.log(col1, col2);
    return (
    <div className="row-fluid clearfix checkboxes">
      <CheckboxGroup
        name="fruits"
        value={this.state.newfruits}
        onChange={this.fruitsChanged}>
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
  fruitsChanged: function(newFruits) {
  	console.log(newFruits);
    this.setState({
      newfruits: newFruits
    });
  }
});

module.exports = CheckboxComp