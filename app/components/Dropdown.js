var React = require('react');
var ReactDOM = require('react-dom');


var Dropdown = React.createClass({
    getInitialState: function() {
        return {
            options: this.props.options,
            value: 0,
            selectedRelation: this.props.options[0].osmID
        };
    },
    formatWardNumber: function(option) {
        return option.number != 0 ? ("- Ward No. " + option.number) : ""
    },
    onChange: function(e) {
        this.setState({
            value: e.target.value,
            selectedRelation: this.state.options[e.target.value].osmID
        }, this.props.handler(this.state.options[e.target.value].osmID));
    },
    render: function() {
        return (
            <div className="clearfix row-fluid">
                            <div className="row-fluid filter-title">
                                {this.props.title}
                            </div>
                            <select className="col-md-12 col-xs-12 col-sm-12" onChange={this.onChange} value={this.state.value}>
                                {this.state.options.map(function(option, i){
                                        return <option value={i} key={i} >{option.name.toUpperCase()} {this.formatWardNumber(option).toUpperCase()}
                                               </option>;
                                }.bind(this))}
                            </select>           
            </div>
        );
    }
});

module.exports = Dropdown;
