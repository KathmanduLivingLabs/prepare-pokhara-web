var React = require ('react')
require('../styles/insight.css')

var Insight = React.createClass({
	getInitialState: function () {
		return {
			title: this.props.title.toUpperCase(),
			valueL1: this.props.valueL1.toString(),
			valueL2: this.props.valueL2.toString(),
			subtextL: this.props.subtextL,
			valueR: this.props.valueR.toString(),
			subtextR: this.props.subtextR

		}
	},
	render: function (){
		return (
						<div id="insights" className="clearfix">
							<div className="row-fluid insight-title">
								{this.state.title}
							</div>
							<div  className="row-fluid insights-row">	
								<div className="col-md-6 no-padding">
									<div className="row-fluid insights-value no-padding">
										{this.state.valueL1}<span className="grey">/{this.state.valueL2}</span>
									</div>
									<div className="row-fluid insights-subtext no-padding">
										{this.state.subtextL}
									</div>

								</div>
								<div className="col-md-6 no-padding">
									<div className="row-fluid insights-value no-padding">
										{this.state.valueR}%
									</div>
									<div className="row-fluid insights-subtext no-padding">
										{this.state.subtextR}
									</div>
								</div>
							</div>
						</div>
			)
	}
})

module.exports = Insight;