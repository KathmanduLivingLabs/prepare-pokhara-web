var React = require('react');
var Checkbox = require('./Checkbox');
var Slider = require('./Slider');
var Insight = require('./Insight');
var Dropdown = require('./Dropdown');
var SidebarPanel = require('./SidebarPanel');
var HH = require('./HospitalHelper');
var Puker = require ('../utils/Puker')
var LeafletMap = require('./Maps')
var Toggle = require('./Toggle')
require("../styles/contents.css")

var Hospitals = React.createClass({
	getInitialState: function() {
			return {
				isLoading:true,
				filterValues: {wards:[], maxBedCapacity:10000000},
				insightValues: {stats:{}, geojson:{}},
				filterParameters: {"type": "hospital","ward": "*", "filters": {}, "variables":{"Bed Capacity":"0"}}
			}		
	},
	componentWillMount: function () {
		HH.getWards().then(function(arr){
			this.setState({
				filterValues: {wards:arr, maxBedCapacity:this.state.filterValues.maxBedCapacity}
			})
		}.bind(this));

		HH.getInsights(this.state.filterParameters).then(function(response){
			this.setState({
				filterValues: {wards:this.state.filterValues.wards, maxBedCapacity:response.maxBedCapacity},
				insightValues: {stats: response.stats, geojson:response.geojson},
				isLoading:false
			})
		}.bind(this));
	},
	onParameterChange: function(params) {
		HH.getInsights(params).then(function(response){
			this.setState({
				filterValues: {wards:this.state.filterValues.wards, maxBedCapacity:response.maxBedCapacity},
				insightValues: {stats: response.stats, geojson:response.geojson},
				isLoading:false
			})
		}.bind(this));

	},
	onToggleGroupChange : function(params) {
		var newParameters = {
				"type": this.state.filterParameters.type,
				"ward": this.state.filterParameters.ward, 
				"filters": params, 
				"variables":this.state.filterParameters.variables
		}; 

		this.setState({
			filterParameters: newParameters
		}, this.onParameterChange(newParameters))
	},
	onCheckboxChange : function(params) {
		var newParameters = {
				"type": this.state.filterParameters.type,
				"ward": this.state.filterParameters.ward, 
				"filters": params, 
				"variables":this.state.filterParameters.variables
		}; 

		this.setState({
			filterParameters: newParameters
		}, this.onParameterChange(newParameters))
	},
	onSliderChange : function(params) {
		var newParameters = {
				"type": this.state.filterParameters.type,
				"ward": this.state.filterParameters.ward, 
				"filters": this.state.filterParameters.filters, 
				"variables":{"Bed Capacity": params}
		}; 

		this.setState({
			filterParameters: newParameters
		}, this.onParameterChange(newParameters))
	},
	onDropDownChange: function(params) {
		var newParameters = {
				"type": this.state.filterParameters.type,
				"ward": params, 
				"filters": this.state.filterParameters.filters, 
				"variables":this.state.filterParameters.variables
			};

		this.setState({
			filterParameters:  newParameters
		}, this.onParameterChange(newParameters))
	},
	render: function(){
		if (this.state.isLoading===true) {
			return (
					<div className="header">
					<h1>I am Loading</h1>
					</div>
				)

		} else {

		return (
			<div className="header ">
				<div className="row-fluid">
					<div className="col-md-9 no-padding">
						<div id="map-container" style={{height:"100px"}}>
								<LeafletMap data={this.state.insightValues.geojson}/>
						</div>

					</div>

					<div className="col-md-3" id="hospitals-sidebar">
						<SidebarPanel title = "filters">
							<Toggle title= "facilities" values = {["ICU", "NICU", "Ventilator", "Emergency", "Ambulance", "Xray", "Operation Theatre"]} handler={this.onToggleGroupChange}/>
							{/*<Checkbox title= "facilities" values = {["ICU", "NICU", "Ventilator", "Emergency", "Ambulance", "Xray", "Operation Theatre"]} handler={this.onCheckboxChange}/>*/}
							<Slider title= "bed capacity" outputlabel="Greater than" value="0" min="0" max={this.state.filterValues.maxBedCapacity.toString()} step = "25" label="Select number of beds:" handler={this.onSliderChange}/>
							

							<Dropdown title= "ward number"  options={this.state.filterValues.wards} handler={this.onDropDownChange}/>
						</SidebarPanel>

						<SidebarPanel title="insights">
							<Insight title="hospitals selected" valueL1={this.state.insightValues.stats.selection.total} valueL2={this.state.insightValues.stats.overall.total} subtextL="hospitals selected" valueR={this.state.insightValues.stats.insights.total} subtextR="of total "/>
							<Insight title="bed capacity" valueL1={this.state.insightValues.stats.selection["Bed Capacity"]} valueL2={this.state.insightValues.stats.overall["Bed Capacity"]} subtextL="beds in total" valueR={this.state.insightValues.stats.insights["Bed Capacity"]} subtextR="of total "/>
							<Insight title="personnel" valueL1={this.state.insightValues.stats.selection["Personnel Count"]} valueL2={this.state.insightValues.stats.overall["Personnel Count"]} subtextL="personnel" valueR={this.state.insightValues.stats.insights["Personnel Count"]} subtextR="of total "/>
						</SidebarPanel>
					</div>
				</div>
			</div>
			)
		}
	}
})

module.exports = Hospitals;