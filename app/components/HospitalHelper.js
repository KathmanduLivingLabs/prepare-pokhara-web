var React = require('react');
var axios = require('axios');

var fetchDropDowns = function() {
	return axios({
			method:'get',
			url:'http://api-preparepokhara.herokuapp.com/api/v1/wards'
		})	
}

var createInsightParams=function(features, bedcapacity, ward){
 return {
 	"type": "hospital",
 	"filters" : features,
 	"Bed Capacity": bedcapacity, 	
 	"ward":ward
 }
}

var fetchInsights = function(params) {
	console.log("gotparams",params)
	return axios({
		method:'get',
		url:'http://api-preparepokhara.herokuapp.com/api/v1/features',
		params: params
		})
}



module.exports = {
	fetchDropDowns: fetchDropDowns,
	fetchInsights: fetchInsights
};