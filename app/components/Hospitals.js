var React = require('react');
var Checkbox = require('./Checkbox');
var Slider = require('./Slider');
var Insight = require('./Insight');
var Dropdown = require('./Dropdown');
var SidebarSection = require('./SidebarSection');
var HH = require('./HospitalHelper');
var Puker = require ('../utils/Puker')
// var LMap = require('./Map')
var LeafletMap = require('./Maps')

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
	fetchValues: function(params) {
		console.log("FilterParams",JSON.stringify(params))
		HH.fetchInsights(params).then(
				function(response) {
					// console.log(response.data.stats)
					this.setState({
						// filterValues: {wards:this.state.filterValues.wards, maxBedCapacity:response.data.initialMetrics.slider["Bed Capacity"]},
						insightValues: {stats: response.data.stats, geojson:response.data.geojson}
					})
				}.bind(this)
		)
	},
	componentWillMount: function () {
		HH.fetchDropDowns().then(
			function(response){
				// console.log(response.data)s
				var wards = [{
					"name": "All Wards",
					"number": "0",
					"osmID":"*"
				}];

				response.data.metrics.wards.map(function(ward){
					wards.push(ward)
				});

				this.setState({
					filterValues: {wards:wards, maxBedCapacity:this.state.filterValues.maxBedCapacity}
				})
			}.bind(this)
		);

		HH.fetchInsights(this.state.filterParameters).then(
				function(response) {
					// console.log(response.data.stats)
					this.setState({
						filterValues: {wards:this.state.filterValues.wards, maxBedCapacity:response.data.initialMetrics.slider["Bed Capacity"]},
						insightValues: {stats: response.data.stats, geojson:response.data.geojson},
						isLoading:false
					})
				}.bind(this)
		)
	},
	handleCheckBoxChange : function(params) {
		// console.log(params);
		var newParameters = {
				"type": this.state.filterParameters.type,
				"ward": this.state.filterParameters.ward, 
				"filters": params, 
				"variables":this.state.filterParameters.variables
		}; 

		this.setState({
			filterParameters: newParameters
		}, this.fetchValues(newParameters))
	},
	handleSliderChange : function(params) {
		var newParameters = {
				"type": this.state.filterParameters.type,
				"ward": this.state.filterParameters.ward, 
				"filters": this.state.filterParameters.filters, 
				"variables":{"Bed Capacity": params}
		}; 

		this.setState({
			filterParameters: newParameters
		}, this.fetchValues(newParameters))
	},
	handleDropDownChange: function(params) {
		var newParameters = {
				"type": this.state.filterParameters.type,
				"ward": params, 
				"filters": this.state.filterParameters.filters, 
				"variables":this.state.filterParameters.variables
			};

		this.setState({
			filterParameters:  newParameters
		}, this.fetchValues(newParameters))
	},
	componentDidMount: function() {
	},
	render: function(){
		if (this.state.isLoading===true) {
			return (
					<div className="header">
					<h1> Im Loading</h1>
					</div>
				)

		} else {

		return (

			<div className="header ">
				<div className="row-fluid">
					<div className="col-md-8 no-padding">
						<div id="map-container" style={{height:"100px"}}>
								<LeafletMap data={this.state.insightValues.geojson}/>
						</div>
						<h2>My Wards</h2>
						<Puker data = {this.state.filterParameters} />
						<Puker data = {this.state.insightValues.stats} />

					</div>

					<div className="col-md-4" id="hospitals-sidebar">
						<SidebarSection title = "filters">
							<Checkbox title= "facilities" values = {["ICU", "NICU", "Ventilator", "Emergency", "Ambulance", "X-Ray", "Operation Theater"]} handler={this.handleCheckBoxChange}/>
							<Slider title= "bed capacity" outputlabel="Greater than" value="0" min="0" max={this.state.filterValues.maxBedCapacity.toString()} step = "1" label="Select number of beds:" handler={this.handleSliderChange}/>
							<Dropdown title= "ward number"  options={this.state.filterValues.wards} handler={this.handleDropDownChange}/>
						</SidebarSection>

						<SidebarSection title="insights">
						<Insight title="hospitals selected" valueL1={this.state.insightValues.stats.selection.total} valueL2={this.state.insightValues.stats.overall.total} subtextL="hospitals selected" valueR={this.state.insightValues.stats.insights.total} subtextR="of total "/>
						<Insight title="bed capacity" valueL1={this.state.insightValues.stats.selection["Bed Capacity"]} valueL2={this.state.insightValues.stats.overall["Bed Capacity"]} subtextL="beds in total" valueR={this.state.insightValues.stats.insights["Bed Capacity"]} subtextR="of total "/>
						<Insight title="personnel" valueL1={this.state.insightValues.stats.selection["Personnel Count"]} valueL2={this.state.insightValues.stats.overall["Personnel Count"]} subtextL="personnel" valueR={this.state.insightValues.stats.insights["Personnel Count"]} subtextR="of total "/>
						</SidebarSection>



					</div>
				</div>
			</div>
			)
		}
	}
})

module.exports = Hospitals;


