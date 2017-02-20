var React = require('react');
var osmAuth = require('../utils/OAuth');

var EditForm = React.createClass({

	handleEdit : function(e){

		e.preventDefault();
		var formElements = {};
		for(var formfield in this.refs){
			if(this.refs[formfield].value && this.refs[formfield].value.length){
				formElements[formfield] = this.refs[formfield].value;	
			}
		}

		// console.log(formElements);
		// console.log('************* THE REAL AUTH CODE IS COMMENTED !. UNCOMMENT AFTER THIS LINE ***********');
		// console.log('/////////////$$$$$$$$$$$$$$$$$$#####################**************////////////////////');

		var featureData = this.props.location.state.data;
		featureData.properties.type = 'node'; //remove this line later , for LIVE version

		var auth = new osmAuth();
		auth.getFeature(featureData.properties.type,featureData.properties.id)
		    .then(function(response){
		        response = auth.cleanseData(response,featureData.properties.type);
		        var appliedChanges =  auth.applyChanges(formElements,response,featureData.properties.type);
		        return auth.createChangeset(appliedChanges);
		    },function(err){
		        throw err;
		    })
		    .then(function(response){
		        var xml = auth.applyChangeset(response.changeset,response.appliedChanges,featureData.properties.type);
		        return auth.applyEdit(xml);
		    },function(err){
		        throw err;
		    })
		    .then(function(edited){
		        alert('Successfully edited !');
		    },function(err){
		        throw err;
		    })
		    .catch(function(err){
		        throw err;
		    })

	},

	render: function() {

		if (this.props.type === "hospitals") {
			return (
				<div className="container-fluid row-fluid header">
				    <form role="form" className="form" encType="multipart/form-data" onSubmit={this.handleEdit}>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="hospital-name">Name:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text"  ref="name" className="form-control" id="hospital-name" defaultValue={this.props.location.state.data.properties.tags.name}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="nepali-name">Name (Nepali):</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control"  ref="name:ne" id="nepali-name" defaultValue={this.props.location.state.data.properties.tags["name:ne"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="facility-icu">ICU:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="facility-icu"  ref="facility:icu" defaultValue={this.props.location.state.data.properties.tags["facility:icu"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="facility-ventilator">Ventilator:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="facility-ventilator" ref="facility:ventilator" defaultValue={this.props.location.state.data.properties.tags["facility:ventilator"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="facility-emergency-services">Emergency Services:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="facility-emergency-services"  ref="emergency_service" defaultValue={this.props.location.state.data.properties.tags["emergency_service"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="facility-ot">Operation Theater:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="facility-ot" ref="facility:operating_theatre" defaultValue={this.props.location.state.data.properties.tags["facility:operating_theatre"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="facility-nicu">NICU:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="facility-nicu" ref="facility:nicu" defaultValue={this.props.location.state.data.properties.tags["facility:nicu"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="facility-emergency">Emergency:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="facility-emergency" ref="emergency" defaultValue={this.props.location.state.data.properties.tags["emergency"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="facility-xray">X Ray:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="facility-xray" ref="facility:x-ray" defaultValue={this.props.location.state.data.properties.tags["facility:x-ray"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="bed-capacity">Bed Capacity:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="bed-capacity" ref="capacity:beds" defaultValue={this.props.location.state.data.properties.tags["capacity:beds"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="personnel-count">Personnel Count:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="personnel-count" ref="personnel:count"  defaultValue={this.props.location.state.data.properties.tags["personnel:count"]}/>
				                </div>
				            </div>
				        </div>
				        <button type="submit" className="btn btn-large btn-success">Submit</button>
				    </form>
				</div>


				)

		} else if(this.props.type === "schools"){

			return (
				<div className="container-fluid row-fluid header">
				    <form role="form" className="form" encType="multipart/form-data" onSubmit={this.handleEdit}>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="school-name">Name:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text"  ref="name" className="form-control" id="school-name" defaultValue={this.props.location.state.data.properties.tags.name}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="school-name-nepali">Name (Nepali):</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control"  ref="name:ne" id="school-name-nepali" defaultValue={this.props.location.state.data.properties.tags["name:ne"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="operator-type">Operator Type : </label>
				                </div>
				                <div className="col-md-9">
				                	<select className="form-control" id="operator-type"  ref="operator:type" defaultValue={this.props.location.state.data.properties.tags["operator:type"]}>
				                	  <option value=""  selected>Select Operator Type</option>
				                	  <option value="private">Private</option>
				                	  <option value="government">Government</option>
				                	  <option value="community">Community</option>
				                	</select>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="students-count">Students Count :</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="students-count" ref="student:count" defaultValue={this.props.location.state.data.properties.tags["student:count"]}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="personnel-count">Personnel Count :</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="personnel-count"  ref="personnel:count" defaultValue={this.props.location.state.data.properties.tags["personnel:count"]}/>
				                </div>
				            </div>
				        </div>
				        <button type="submit" className="btn btn-large btn-success">Submit</button>
				    </form>
				</div>
				)

		} else if (this.props.type === "banks") {
			return (
				<div className="container-fluid row-fluid header">
				    <form role="form" className="form" encType="multipart/form-data" onSubmit={this.handleEdit}>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="bank-name">Name:</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text"  ref="name" className="form-control" id="bank-name" defaultValue={this.props.location.state.data.properties.tags.name}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="operator-type">Operator : </label>
				                </div>
				                <div className="col-md-9">
				                	<input type="text"  ref="operator" className="form-control" id="operator" defaultValue={this.props.location.state.data.properties.tags['operator']}/>
				                </div>
				            </div>
				        </div>
				        <div className="form-group">
				            <div className="row">
				                <div className="col-md-3 form-label">
				                    <label htmlFor="atm">ATM :</label>
				                </div>
				                <div className="col-md-9">
				                    <input type="text" className="form-control" id="atm" ref="atm" defaultValue={this.props.location.state.data.properties.tags["atm"]}/>
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