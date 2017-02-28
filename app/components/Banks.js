var React = require('react');
var FetchData = require('../utils/FetchData');
var Loading = require('../utils/Loading')
var Updater = require('../utils/Updater')
var Dropdown = require('./Dropdown');
var SidebarPanel = require('./SidebarPanel');
var Maps = require('./Maps')
var Toggle = require('./Toggle')
var Insight = require('./Insight');


require("../styles/contents.css")

var Banks = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getATMCoverageSubtext: function(response) {
              
        var coverage = ((response.stats.selection.ATM/response.stats.selection.total)*100).toFixed(0)
        if (isNaN(coverage)) {
            var coverage = 0;
        } else  {
            var coverage = coverage;
        }
    
        if (this.state.selectedWard== "*") {
                var wardText = "all wards"
        } else {
            var wardText = this.state.selectedWard
        }

        if (this.state.filterParameters.filters.Operator == "*") {
                var bankText = "all bank"
        } else {
            var bankText = this.state.filterParameters.filters.Operator
        }


        if (this.state.filterParameters.filters.ATM) {
            var atmSwitch = "that have an atm "
        } else {
            var atmSwitch = ""
        }
        
        var text = "of " + bankText + " offices " + atmSwitch + "in "+ wardText ;

        return {
            text: text,
            coverage:coverage
        } 
    },
    getInitialState: function() {
        var maxWindowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 55;
        return {

            updaterConfig: { opacity: 1, allowPointer: "auto" },
            sidebarHeight: maxWindowHeight,
            isLoading: true,

            filterValues: { wards: [], operators: [] },
            insightValues: { stats: {}, geojson: {} },
            filterParameters: { "type": "bank", "ward": "*", "filters": {"Operator":"*"}},
            atmCoverageSubText: {text:"", coverage:0},
            selectedWard: "*"

        }
    },
    componentWillMount: function() {
        FetchData.getWards().then(function(arr) {
            this.setState({
                filterValues: { wards: arr, operators: this.state.filterValues.operators }
            })
        }.bind(this));

        FetchData.getBanks(this.state.filterParameters).then(function(arr) {
            this.setState({
                filterValues: { wards: this.state.filterValues.wards, operators: arr }
            })
        }.bind(this));

        FetchData.getBankInsights(this.state.filterParameters).then(function(response) {
            var subtext = this.getATMCoverageSubtext(response).text;
            var coverage = this.getATMCoverageSubtext(response).coverage;

            this.setState({
                insightValues: {stats : response.stats, geojson: response.geojson},
                atmCoverageSubText: {text:subtext, coverage:coverage},
                isLoading:false
            })
        }.bind(this));
    },
    componentDidMount: function() {
        window.addEventListener("resize", this.updateDimensions);
    },
    onParameterChange: function(params) {
        // console.log(JSON.stringify(params)); 
        FetchData.getBankInsights(params).then(function(response) {
            var subtext = this.getATMCoverageSubtext(response).text;
            var coverage = this.getATMCoverageSubtext(response).coverage;
            this.setState({
                insightValues: { stats: response.stats, geojson: response.geojson },
                atmCoverageSubText: {text:subtext, coverage:coverage},
                updaterConfig: { opacity: 1, allowPointer: "auto" }
            })
        }.bind(this));
    },
    onWardChange: function(params){
        var newParameters = {
            "type": this.state.filterParameters.type,
            "ward": params.osmID,
            "filters": this.state.filterParameters.filters
        };

        this.setState({
            selectedWard: params.name,
            filterParameters: newParameters,
            updaterConfig: { opacity: 0.6, allowPointer: "none" }
        }, this.onParameterChange(newParameters))

    },
    onBankChange: function(params){
        if (this.state.filterParameters.filters.ATM) {
            var newParameters = {
                "type": this.state.filterParameters.type,
                "ward": this.state.filterParameters.ward,
                "filters": {"Operator": params, "ATM": this.state.filterParameters.filters.ATM}
            };
            this.setState({
                filterParameters: newParameters,
                updaterConfig: { opacity: 0.6, allowPointer: "none" }
            }, this.onParameterChange(newParameters))

        } else {
            var newParameters = {
                "type": this.state.filterParameters.type,
                "ward": this.state.filterParameters.ward,
                "filters": {"Operator": params}
            };

            this.setState({
                filterParameters: newParameters,
                updaterConfig: { opacity: 0.6, allowPointer: "none" }
            }, this.onParameterChange(newParameters))
        }
    },
    onToggleGroupChange: function(params){
        if(params["Bank Has ATM"]) {
            var newParameters = {
                "type": this.state.filterParameters.type,
                "ward": this.state.filterParameters.ward,
                "filters": {"Operator": this.state.filterParameters.filters.Operator, "ATM": "yes"}
            };

            this.setState({
                filterParameters: newParameters,
                updaterConfig: { opacity: 0.6, allowPointer: "none" }
            }, this.onParameterChange(newParameters))

        } else {
            var newParameters = {
                "type": this.state.filterParameters.type,
                "ward": this.state.filterParameters.ward,
                "filters": {"Operator": this.state.filterParameters.filters.Operator}
            };

            this.setState({
                filterParameters: newParameters,
                updaterConfig: { opacity: 0.6, allowPointer: "none" }
            }, this.onParameterChange(newParameters))
        }
    },
    onEdit: function(data) {

        this.context.router.push({
            pathname:'/edit',
            state: {
                data: data,
                parentLocation: "banks",
                id: data.id
            }
        })

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
                                <Maps.Multi data={this.state.insightValues.geojson} type="bankedit" handler={this.onEdit}/>
                                </Updater>
                    </div>


                    <div className="col-md-4 col-xs-4  col-md-4 clearfix" id="sidebar" style={{height:this.state.sidebarHeight}}>
                    <Updater config={this.state.updaterConfig}>
                        <SidebarPanel title = "filters">
                            {/*<Checkbox title= "facilities" values = {["ICU", "NICU", "Ventilator", "Emergency", "Ambulance", "Xray", "Operation Theatre"]} handler={this.onCheckboxChange}/>*/}
                            <Toggle title= "" values = {["Bank Has ATM"]} handler={this.onToggleGroupChange}/>
                            <Dropdown.WardDropdown title= "ward number"  options={this.state.filterValues.wards} handler={this.onWardChange}/>
                            <Dropdown.BankDropdown title= "bank operator"  options={this.state.filterValues.operators} handler={this.onBankChange}/>
                        </SidebarPanel>

                        <SidebarPanel title="insights">
                            <Insight title="Banks selected" valueL1={this.state.insightValues.stats.selection.total} valueL2={this.state.insightValues.stats.overall.total} subtextL="banks" valueR={this.state.insightValues.stats.insights.total} subtextR="of total "/>
                            <Insight title="ATM Coverage" valueL1={this.state.insightValues.stats.selection.ATM} valueL2={this.state.insightValues.stats.selection.total} subtextL="banks" valueR={this.state.atmCoverageSubText.coverage} subtextR={this.state.atmCoverageSubText.text}/>
                        </SidebarPanel>
                    </Updater>
                    </div>
                </div>
            </div>
            )
        }

    }
})

module.exports = Banks;
