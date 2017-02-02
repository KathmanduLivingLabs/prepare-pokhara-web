var React = require('react');
var Checkbox = require('./Checkbox');
var Slider = require('./Slider');
var Insight = require('./Insight');
var Dropdown = require('./Dropdown');
var SidebarSection = require('./SidebarSection');

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
						<SidebarSection title = "filters">
							<Checkbox title= "facilities" values = {["ICU", "NICU", "Ventilator", "Emergency", "Ambulance", "X-Ray", "Operation Theater"]}/>
							<Slider title= "bed capacity" value="7" min="0" max="12" step = "0.5" label="Select number of beds:"/>
							<Dropdown title= "ward number" options = {['All Wards', 'Ward No 1', 'Ward No 2', 'Ward No 3', 'Ward No 4']}/>
						</SidebarSection>

						<SidebarSection title="insights">
						<Insight title="hospitals selected" valueL1={12} valueL2={32} subtextL="hospitals selected" valueR={46} subtextR="of total "/>
						<Insight title="bed capacity" valueL1={153} valueL2={213} subtextL="beds in total" valueR={63} subtextR="of total "/>
						<Insight title="personnel" valueL1={721} valueL2={906} subtextL="personnel" valueR={81} subtextR="of total "/>
						</SidebarSection>



					</div>
				</div>
			</div>
			)
	}
})

module.exports = Hospitals;