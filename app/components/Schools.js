var React = require('react');
var Checkbox = require('./Checkbox');
var Slider = require('./Slider');
var Dropdown = require('./Dropdown');
var SidebarPanel = require('./SidebarPanel');
var LeafletMap = require('./Maps')
var Loading = require('../utils/Loading')
var FetchData = require('../utils/FetchData');
var Insight = require('./Insight');
var Updater = require('../utils/Updater')


// var MyMap = require('./Maps')
require("../styles/contents.css")

var Schools = React.createClass({
    getInitialState: function() {
        var maxWindowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 55;
        return {
            updaterConfig: { opacity: 1, allowPointer: "auto" },
            sidebarHeight: maxWindowHeight,
            isLoading: true,
            filterValues: { wards: [], maxStudents: 10000000 },
            insightValues: { stats: {}, geojson: {} },
            filterParameters: { "type": "school", "ward": "*", "filters": { "Operator Type": ["private", "government", "community", "others"] }, "variables": {} }
        }
    },
    componentWillMount: function() {
        FetchData.getWards().then(function(arr) {
            this.setState({
                filterValues: { wards: arr, maxStudents: this.state.filterValues.maxStudents },
            })
        }.bind(this));

        FetchData.getSchoolInsights(this.state.filterParameters).then(function(response) {
            this.setState({
                filterValues: { wards: this.state.filterValues.wards, maxStudents: response.maxStudents },
                insightValues: { stats: response.stats, geojson: response.geojson },
                isLoading: false
            })
        }.bind(this));

    },
    onParameterChange: function(params) {
        FetchData.getHospitalInsights(params).then(function(response) {
            this.setState({
                filterValues: { wards: this.state.filterValues.wards, maxStudents: response.maxStudents },
                insightValues: { stats: response.stats, geojson: response.geojson },
                updaterConfig: { opacity: 1, allowPointer: "auto" }
            })
        }.bind(this));
    },
    componentDidMount: function() {
        window.addEventListener("resize", this.updateDimensions);
    },
    onCheckBoxChange: function(params) {
        var newParameters = {
            "type": this.state.filterParameters.type,
            "ward": this.state.filterParameters.ward,
            "filters": params,
            "variables": this.state.filterParameters.variables
        };

        this.setState({
            filterParameters: newParameters,
            updaterConfig: { opacity: 0.6, allowPointer: "none" }
        }, this.onParameterChange(newParameters))
    },
    onDropDownChange: function(params) {
        var newParameters = {
            "type": this.state.filterParameters.type,
            "ward": params.osmID,
            "filters": this.state.filterParameters.filters,
            "variables": this.state.filterParameters.variables
        };

        this.setState({
            filterParameters: newParameters,
            updaterConfig: { opacity: 0.6, allowPointer: "none" }
        }, this.onParameterChange(newParameters))
    },
    onSliderChange: function(params) {
        var newParameters = {
            "type": this.state.filterParameters.type,
            "ward": this.state.filterParameters.ward,
            "filters": this.state.filterParameters.filters,
            "variables": { "Students": params }
        };

        this.setState({
            filterParameters: newParameters,
            updaterConfig: { opacity: 0.6, allowPointer: "none" }
        }, this.onParameterChange(newParameters))
    },
    updateDimensions: function() {
        var maxWindowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 55;
        this.setState({
            sidebarHeight: maxWindowHeight
        })
    },
    render: function() {
        if (this.state.isLoading === true) {
            return (
                <Loading/>
            )

        } else {
            return (
                <div className="header ">
					<div className="row-fluid">
						<div className="col-md-8 col-xs-8 col-sm-8 no-padding ">
							<Updater config={this.state.updaterConfig}>
							<LeafletMap data={this.state.insightValues.geojson} type="school"/>
							</Updater>
						</div>

						<div className="col-md-4 col-xs-4  col-md-4 clearfix" id="sidebar" style={{height:this.state.sidebarHeight}}>
						<Updater config={this.state.updaterConfig}>
							<SidebarPanel title = "filters">
								{/*<Toggle title= "facilities" values = {["ICU", "NICU", "Ventilator", "Emergency", "Ambulance", "Xray", "Operation Theatre"]} handler={this.onToggleGroupChange}/>*/}
								<Checkbox title= "Operator Type" values = {["private", "community", "government", "others"]} handler={this.onCheckBoxChange}/>
								<Slider title= "students" outputlabel="Greater than" value="0" min="0" max={this.state.filterValues.maxStudents}step = "25" label="Select number of beds:" handler={this.onSliderChange}/>
								<Dropdown.WardDropdown title= "ward number"  options={this.state.filterValues.wards} handler={this.onDropDownChange}/>
							</SidebarPanel>

							<SidebarPanel title="insights">
								<Insight title="Schools Selected" valueL1={this.state.insightValues.stats.selection.total} valueL2={this.state.insightValues.stats.overall.total} subtextL="schools" valueR={this.state.insightValues.stats.insights.total} subtextR="of total "/>
								<Insight title="Students" valueL1={this.state.insightValues.stats.selection["Students"]} valueL2={this.state.insightValues.stats.overall["Students"]} subtextL="students" valueR={this.state.insightValues.stats.insights["Students"]} subtextR="of total "/>
								<Insight title="Personnel" valueL1={this.state.insightValues.stats.selection["Personnel Count"]} valueL2={this.state.insightValues.stats.overall["Personnel Count"]} subtextL="personnel" valueR={this.state.insightValues.stats.insights["Personnel Count"]} subtextR="of total "/>

							</SidebarPanel>
						</Updater>
						</div>
					</div>
				</div>
            )
        }

    }
})

module.exports = Schools;
