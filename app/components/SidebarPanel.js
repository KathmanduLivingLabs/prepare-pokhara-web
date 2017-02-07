var React = require ('react');

var SidebarPanel = React.createClass({
	render: function(){
		return (
					<div className="row-fluid clearfix">
						<div className="row-fluid section-title">
								<span className="sidebar-title">{this.props.title}</span>
						</div>
						{this.props.children}
					</div>
			)
	}
})

module.exports = SidebarPanel;