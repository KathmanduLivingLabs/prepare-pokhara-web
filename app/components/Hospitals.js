var React = require('react');
var Checkbox = require('./Checkbox');
var Slider = require('./Slider')
var Insight = require('./Insight')

require("../styles/contents.css")

var Hospitals = React.createClass({
	getInitialState: function() {
		return {
		}
	},
	componentWillMount: function () {
	},
	componentDidMount: function() {
	},
	render: function(){
		return(
			<div className="header ">
				<div className="row-fluid">
					<div className="col-md-8 no-padding">
					</div>

					<div className="col-md-4" id="hospitals-sidebar">
						<div className="row-fluid section-title">
							<span>filters</span>
						</div>
						<div className="row-fluid filter-title">
							facilities
						</div>
						<Checkbox values = {["ICU", "NICU", "Ventilator", "Emergency", "Ambulance", "X-Ray", "Operation Theater"]}/>
						<div className="row-fluid filter-title">
							bed capacity
						</div>
						<Slider value="7" min="0" max="12" step = "0.5" label="Select number of beds:"/>

						<div className="row-fluid section-title">
							<span>insights</span>
						</div>

						<Insight title="hospitals selected" valueL1={12} valueL2={32} subtextL="hospitals selected" valueR={46} subtextR="of total "/>
						<Insight title="bed capacity" valueL1={153} valueL2={213} subtextL="beds in total" valueR={63} subtextR="of total "/>
						<Insight title="personnel" valueL1={721} valueL2={906} subtextL="personnel" valueR={81} subtextR="of total "/>
						</div>



					</div>
				</div>
			)
	}
})

module.exports = Hospitals;