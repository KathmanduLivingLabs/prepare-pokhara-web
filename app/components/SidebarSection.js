var React = require ('react');

var SidebarSection = React.createClass({
	render: function(){
		return (
					<div className="row-fluid clearfix">
						<div className="row-fluid section-title">
								<span>{this.props.title}</span>
						</div>
						{this.props.children}
					</div>
			)
	}
})

module.exports = SidebarSection;