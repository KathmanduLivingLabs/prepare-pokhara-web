var React = require('react');
var Nouislider = require('react-nouislider')

require('../styles/slider.css')
require('../styles/noui.css')

var Slider = React.createClass({
    getInitialState: function() {
        return {
            range: { min: Number(this.props.min), max: Number(this.props.max) },
            start: [Number(this.props.min), Number(this.props.max)],
            step: Number(this.props.step),
            label: this.props.label.toUpperCase()
        };
    },

    handleChange: function(e) {
        var value = {}
        value.high = Number(e[1])
        value.low = Number(e[0])

        var start = [value.low, value.high]
        this.setState({ value: value, start: start }, this.props.handler(value))

    },
    render: function() {
        return (
            <div className="clearfix row-fluid">
                <div className="row-fluid filter-title">
                    {this.props.title}
                </div>
                <div className = "col-md-12 noui-content">
                  <Nouislider onChange = {this.handleChange} connect={true} step = {this.state.step} range={this.state.range} start={this.state.start} tooltips />
                </div>
            </div>
        );
    }
});

module.exports = Slider;
