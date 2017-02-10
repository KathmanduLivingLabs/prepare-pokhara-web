var React = require('react');
var PropTypes = React.PropTypes;

var Updater = React.createClass({
    render: function() {
        return (
            <div className="clearfix row-fluid" style = {{opacity:this.props.config.opacity, pointerEvents: this.props.config.allowPointer}}>
					{this.props.children}
			</div>
        );
    }
})

module.exports = Updater;
