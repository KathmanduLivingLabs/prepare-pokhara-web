var React = require('react');
var axios = require('axios');

var rootURL = 'http://api-preparepokhara.herokuapp.com/api'

var fetchDropDowns = function() {
	return axios({
			method:'get',
			url:rootURL+'/v1/wards'
		})	
}

var fetchInsights = function(params) {
	return axios({
		method:'get',
		url:rootURL+'/v1/features',
		params: params
		})
}

var hospitalHelper = {
	getWards: function() {
		var myWards = fetchDropDowns();
		return axios.all([myWards])
			.then(function(response){
				var wards = [{
					"name": "All Wards",
					"number": "0",
					"osmID":"*"
				}];

				response[0].data.metrics.wards.map(function(ward){
					wards.push(ward)
				});

				return wards
				
			})
	},
	getInsights: function(params) {
		var myInsights = fetchInsights(params);
		return axios.all([myInsights])
			.then(function(response){
				
				var maxBedCapacity = response[0].data.initialMetrics.slider["Bed Capacity"];
				var stats = response[0].data.stats;
				var geojson = response[0].data.geojson;

				return {
					maxBedCapacity:maxBedCapacity,
					stats:stats,
					geojson:geojson
				}
				
			})
	}
}

module.exports = hospitalHelper

