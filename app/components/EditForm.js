var React = require('react');
var osmAuth = require('../utils/OAuth');
var EditFormElements = require('../config/editformelements').amenities;

var EditForm = React.createClass({

	handleEdit : function(e){

		e.preventDefault();

		var formElements = {};
		for(var formfield in this.refs){
			if(this.refs[formfield].value && this.refs[formfield].value.length){
				formElements[formfield] = this.refs[formfield].value;	
			}
		}

		for(var tag in this.props.location.state.data.properties.tags){
			if(!formElements[tag]){
				formElements[tag] = this.props.location.state.data.properties.tags[tag];
			}
		}

		console.log(formElements);
		
		// console.log('************* THE REAL AUTH CODE IS COMMENTED !. UNCOMMENT AFTER THIS LINE ***********');
		// console.log('/////////////$$$$$$$$$$$$$$$$$$#####################**************////////////////////');

		// var featureData = this.props.location.state.data;
		// // featureData.properties.type = 'node'; //remove this line later , for LIVE version

		// var auth = new osmAuth();
		// auth.getFeature(featureData.properties.type,featureData.properties.id)
		//     .then(function(response){
		//         response = auth.cleanseData(response,featureData.properties.type);
		//         var appliedChanges =  auth.applyChanges(formElements,response,featureData.properties.type);
		//         return auth.createChangeset(appliedChanges);
		//     },function(err){
		//         throw err;
		//     })
		//     .then(function(response){
		//         var xml = auth.applyChangeset(response.changeset,response.appliedChanges,featureData.properties.type);
		//         return auth.applyEdit(xml,featureData.properties.type,featureData.properties.id);
		//     },function(err){
		//         throw err;
		//     })
		//     .then(function(edited){
		//         alert('Successfully edited !');
		//     },function(err){
		//         throw err;
		//     })
		//     .catch(function(err){
		//         throw err;
		//     })

	},

	formFieldsGenerator : function(data){

		
		var elements = EditFormElements[this.props.type].fields.map(function(field,index){

				for(var osmtag in data.properties.tags){
					if(field['tag'].indexOf(osmtag) !== -1){
						var matchingTag = field['tag'][field['tag'].indexOf(osmtag)];
						break;
					}
				}

				if(!matchingTag){ // if no any OSM tags are present for the field use the zeroth index osm tag as default
					matchingTag = field['tag'][0];
				}

				if (field.type === 'dropdown'){
					var options = field.options.map(function(option,index){
						return(
								<option value={option.toLowerCase()} key={index} >{option}</option>
						)
					})

					var inputType = <select className="form-control" id={field['readable']+'id'}  ref={matchingTag} defaultValue={matchingTag && data.properties.tags[matchingTag] ? data.properties.tags[matchingTag].toLowerCase() : ""} required={field.required ? "required" : ""} >
					                	  <option value="">Select {field.readable} </option>
					                	  {options}
				                	</select>
				}else{
					var inputType = <input type={field.type}  ref={matchingTag} className="form-control" id={field['readable']+'id'} defaultValue={matchingTag && data.properties.tags[matchingTag] ? matchingTag && data.properties.tags[matchingTag] : ""} required={field.required ? "required" : ""}/>
				}

				return (
						<div className="form-group" key={index} >
						    <div className="row">
						        <div className="col-md-3 form-label">
						            <label htmlFor={field['readable']+'id'}> {field.readable} :</label>
						        </div>
						        <div className="col-md-9">
						            {inputType}
						        </div>
						    </div>
						</div>
				)


		})

		return elements;




	},

	render: function() {

		var elements = this.formFieldsGenerator(this.props.location.state.data);

		return (
				<div className="container-fluid row-fluid header">
				    <form role="form" className="form" encType="multipart/form-data" onSubmit={this.handleEdit}>
				        {elements}
				        <button type="submit" className="btn btn-large btn-success">Submit</button>
				    </form>
				</div>
		)
	}
})

module.exports = EditForm