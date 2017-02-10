var React = require('react');
require('../styles/sidebarpanel.css')
var SidebarPanel = React.createClass({
    render: function() {
        return (
            <div className="row-fluid clearfix sidebar-panel">
						<div className="row-fluid section-title">
							<span className="sidebar-title">{this.props.title}</span>
						</div>
						{this.props.children}
					</div>
        )
    }
})

module.exports = SidebarPanel;
