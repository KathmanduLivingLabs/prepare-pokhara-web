var React = require('react');

var EditForm = React.createClass({
	render: function() {
		if (this.props.type = "hospitals") {
			return (
				<div className="container-fluid row-fluid header">
				    <form role="form" className="form" encType="multipart/form-data">
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="hospital-name">Name:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="hospital-name" value={this.props.location.state.data.properties.tags.name}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="nepali-name">Name (Nepali):</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="nepali-name" value={this.props.location.state.data.properties.tags["name:ne "]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="facility-icu">ICU:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="facility-icu" value={this.props.location.state.data.properties.tags["facility:icu"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="facility-ventilator">Ventilator:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="facility-ventilator" value={this.props.location.state.data.properties.tags["facility:ventilator"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="facility-emergency-services">Emergency Services:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="facility-emergency-services" value={this.props.location.state.data.properties.tags["emergency_service"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="facility-ot">Operation Theater:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="facility-ot" value={this.props.location.state.data.properties.tags["facility:operating_theatre"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="facility-nicu">NICU:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="facility-nicu" value={this.props.location.state.data.properties.tags["facility:nicu"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="facility-emergency">Emergency:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="facility-emergency" value={this.props.location.state.data.properties.tags["emergency"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="facility-xray">X Ray:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="facility-xray" value={this.props.location.state.data.properties.tags["facility:x-ray"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="bed-capacity">Bed Capacity:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="bed-capacity" value={this.props.location.state.data.properties.tags["capacity:beds"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="personnel-count">Personnel Count:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="personnel-count" value={this.props.location.state.data.properties.tags["personnel:count"]}/>
				                </div>
				            </div>
				        </div>
				        <button type="submit" className="btn btn-large btn-success">Submit</button>
				    </form>
				</div>


				)
		} else return (null)
	}
})

module.exports = EditForm