var popupHelpers = {
	getPopupContent : function(type, d, id) {
		var popupContent = "";	
		switch (type) {
			case "school":
				popupContent = '<strong>Name: </strong>'+ d.name
	                    +'<br/><strong>Name (Nepali):  </strong>'+d["name:ne"]
	                    +'<br/><strong>Operator Type: </strong>'+d["operator:type"]
	                    +'<br/><strong>Total Students: </strong>'+d["student:count"]
	                    +'<br/><strong>Total Personnel: </strong>'+d["personnel:count"]
				break;
			case "hospital":
	        	popupContent = '<strong>Name: </strong>'+d.name
	                    +'<br/><strong>Name (Nepali):  </strong>'+d["name:ne"]
	                    +'<br/><strong>ICU: </strong>'+d["facility:icu"]
	                    +'<br/><strong>Ventilator: </strong>'+d["facility:ventilator"] 
	                    +'<br/><strong>Emergency Services: </strong>'+d["emergency_service"] 
	                    +'<br/><strong>Operation Theatre: </strong>'+d["facility:operating_theatre"]
	                    +'<br/><strong>NICU: </strong>'+d["facility:nicu"]
	                    +'<br/><strong>Emergency: </strong>'+d["emergency"]
	                    +'<br/><strong>X-Ray: </strong>'+d["facility:x-ray"]
	                    +'<br/><strong>Bed Capacity: </strong>'+ d["capacity:beds"]
	                    +'<br/><strong>Personnel Count: </strong>'+ d["personnel:count"]
				break;
			case "bank":
	        	popupContent = '<strong>Name: </strong>'+d.name

	        case "hospitaledit":
	        	popupContent = '<strong>Name: </strong>'+d.name
	                    +'<br/><strong>Name (Nepali):  </strong>'+d["name:ne"]
	                    +'<br/><strong>ICU: </strong>'+d["facility:icu"]
	                    +'<br/><strong>Ventilator: </strong>'+d["facility:ventilator"] 
	                    +'<br/><strong>Emergency Services: </strong>'+d["emergency_service"] 
	                    +'<br/><strong>Operation Theatre: </strong>'+d["facility:operating_theatre"]
	                    +'<br/><strong>NICU: </strong>'+d["facility:nicu"]
	                    +'<br/><strong>Emergency: </strong>'+d["emergency"]
	                    +'<br/><strong>X-Ray: </strong>'+d["facility:x-ray"]
	                    +'<br/><strong>Bed Capacity: </strong>'+ d["capacity:beds"]
	                    +'<br/><strong>Personnel Count: </strong>'+ d["personnel:count"]
	                    +'<br/><button type="button" id="button'+id+'" class="btn btn-xs btn-success"><span class="glyphicon glyphicon-edit"></span>Edit OSM Data</button>'
	                  
				break;
			case "try":
				popupContent = '<div class = "container-fluid row-fluid popup" style="">'+
	                            '<form role="form" class="form'+id+'" enctype="multipart/form-data">'
	                                +'<div class = "form-group">'
	                                    + '<div class="row">'
	                                        + '<div class = "col-md-3 form-label">'
	                                            + '<label for="hospital-name">Name:</label>'
	                                        + '</div>'
	                                        + '<div class="col-md-9">'
	                                            + '<input type="text" class="form-control" id="hospital-name" value="'+d.name+'">'
	                                        + '</div>'
	                                    + '</div>'
	                                + '</div>'
	                                +'<div class = "form-group">'
	                                    + '<div class="row">'
	                                        + '<div class = "col-md-3 form-label">'
	                                            + '<label for="nepali-name">Name (Nepali):</label>'
	                                        + '</div>'
	                                        + '<div class="col-md-9">'
	                                            + '<input type="text" class="form-control" id="nepali-name" value="'+d["name:ne"]+'">'
	                                        + '</div>'
	                                    + '</div>'
	                                + '</div>'
	                                +'<div class = "form-group">'
	                                    + '<div class="row">'
	                                        + '<div class = "col-md-3 form-label">'
	                                            + '<label for="facility-icu">ICU:</label>'
	                                        + '</div>'
	                                        + '<div class="col-md-9">'
	                                            + '<input type="text" class="form-control" id="facility-icu" value="'+d["facility:icu"]+'">'
	                                        + '</div>'
	                                    + '</div>'
	                                + '</div>'
	                                +'<div class = "form-group">'
	                                    + '<div class="row">'
	                                        + '<div class = "col-md-3 form-label">'
	                                            + '<label for="facility-ventilator">Ventilator:</label>'
	                                        + '</div>'
	                                        + '<div class="col-md-9">'
	                                            + '<input type="text" class="form-control" id="facility-ventilator" value="'+d["facility:ventilator"]+'">'
	                                        + '</div>'
	                                    + '</div>'
	                                + '</div>'
	                                +'<div class = "form-group">'
	                                    + '<div class="row">'
	                                        + '<div class = "col-md-3 form-label">'
	                                            + '<label for="facility-emergency-services">Emergency Services:</label>'
	                                        + '</div>'
	                                        + '<div class="col-md-9">'
	                                            + '<input type="text" class="form-control" id="facility-emergency-services" value="'+d["emergency_service"]+'">'
	                                        + '</div>'
	                                    + '</div>'
	                                + '</div>'
	                                +'<div class = "form-group">'
	                                    + '<div class="row">'
	                                        + '<div class = "col-md-3 form-label">'
	                                            + '<label for="facility-ot">Operation Theater:</label>'
	                                        + '</div>'
	                                        + '<div class="col-md-9">'
	                                            + '<input type="text" class="form-control" id="facility-ot" value="'+d["facility:operating_theatre"]+'">'
	                                        + '</div>'
	                                    + '</div>'
	                                + '</div>'
	                                +'<div class = "form-group">'
	                                    + '<div class="row">'
	                                        + '<div class = "col-md-3 form-label">'
	                                            + '<label for="facility-nicu">NICU:</label>'
	                                        + '</div>'
	                                        + '<div class="col-md-9">'
	                                            + '<input type="text" class="form-control" id="facility-nicu" value="'+d["facility:nicu"]+'">'
	                                        + '</div>'
	                                    + '</div>'
	                                + '</div>'
	                                +'<div class = "form-group">'
	                                    + '<div class="row">'
	                                        + '<div class = "col-md-3 form-label">'
	                                            + '<label for="facility-emergency">Emergency:</label>'
	                                        + '</div>'
	                                        + '<div class="col-md-9">'
	                                            + '<input type="text" class="form-control" id="facility-emergency" value="'+d["emergency"]+'">'
	                                        + '</div>'
	                                    + '</div>'
	                                + '</div>'
	                                +'<div class = "form-group">'
	                                    + '<div class="row">'
	                                        + '<div class = "col-md-3 form-label">'
	                                            + '<label for="facility-xray">X Ray:</label>'
	                                        + '</div>'
	                                        + '<div class="col-md-9">'
	                                            + '<input type="text" class="form-control" id="facility-xray" value="'+d["facility:x-ray"]+'">'
	                                        + '</div>'
	                                    + '</div>'
	                                + '</div>'
	                                +'<div class = "form-group">'
	                                    + '<div class="row">'
	                                        + '<div class = "col-md-3 form-label">'
	                                            + '<label for="bed-capacity">Bed Capacity:</label>'
	                                        + '</div>'
	                                        + '<div class="col-md-9">'
	                                            + '<input type="text" class="form-control" id="bed-capacity" value="'+d["capacity:beds"]+'">'
	                                        + '</div>'
	                                    + '</div>'
	                                + '</div>'
	                                +'<div class = "form-group">'
	                                    + '<div class="row">'
	                                        + '<div class = "col-md-3 form-label">'
	                                            + '<label for="personnel-count">Personnel Count:</label>'
	                                        + '</div>'
	                                        + '<div class="col-md-9">'
	                                            + '<input type="text" class="form-control" id="personnel-count" value="'+d["personnel:count"]+'">' 
	                                        + '</div>'
	                                    + '</div>'
	                                + '</div>'
	                                + '<input type="submit">'
	                        '</form>'                                 
	                        +'</div>';
				break;
			default:

		}
		return popupContent;
	}

}

module.exports = popupHelpers;



		// switch (type)  {
		// 	case "school": 
				
	 //        case "hospital" :

	 //                break;
	 //        case "try":
	        
	 //            break;
	        
	 //        default:
	 //            popupContent ='<strong>Name: </strong>'+d.name
		// }	