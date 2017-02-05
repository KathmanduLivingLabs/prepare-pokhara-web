var React = require ('react')
require('../styles/insight.css')

var Insight = React.createClass({
	render: function (){
		return (
						<div id="insights" className="clearfix">
							<div className="row-fluid insight-title">
								{this.props.title.toUpperCase()}
							</div>
							<div  className="row-fluid insights-row">	
								<div className="col-md-6 no-padding">
									<div className="row-fluid insights-value no-padding">
										{this.props.valueL1.toString()}<span className="grey">/{this.props.valueL2.toString()}</span>
									</div>
									<div className="row-fluid insights-subtext no-padding">
										{this.props.subtextL}
									</div>

								</div>
								<div className="col-md-6 no-padding">
									<div className="row-fluid insights-value no-padding">
										{this.props.valueR.toString()}%
									</div>
									<div className="row-fluid insights-subtext no-padding">
										{this.props.subtextR}
									</div>
								</div>
							</div>
						</div>
			)
	}
})

module.exports = Insight;