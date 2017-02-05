var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;
var L = require('leaflet');
var turf = require('turf');
var ReactDOM = require('react-dom')



var Livemap = React.createClass({
	loadMap: function(data) {
		coords = []
		data.features.map(function(feature, i){
		coords.push({
			"coordinates":[feature.geometry.coordinates[1],feature.geometry.coordinates[0]], 
			"properties":feature.properties
		})
	})
		this.updateMap(coords);
	},
    updateMap: function(data) {
    	    var map = this.map = L.map(ReactDOM.findDOMNode(this), {
            minZoom: 2,
            layers: [
                L.tileLayer(
                    'https://api.mapbox.com/styles/v1/arkoblog/ciy2j6jja00g52sqdi7u4114x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJrb2Jsb2ciLCJhIjoiY2l5MmczdzJyMDAxODJxcDY5NHMyeHpkMyJ9.la6WiYXrUzF1Iy4aST9tnA',
                    {attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
            ],
            attributionControl: false,
        	});
        	map.setView([28.207, 83.992],13);
        	this.addMarkers(data);
    },
	addMarkers: function(coords) {
		var Icon = L.icon({
		    iconUrl: 'data/marker2.png',
		    shadowUrl: 'data/leaf-shadow.png',
		    iconSize:     [17, 20], // size of the icon
		    shadowSize:   [10, 10], // size of the shadow
		    iconAnchor:   [8.5, 20], // point of the icon which will correspond to marker's location
		    shadowAnchor: [4, 62],  // the same for the shadow
		    popupAnchor:  [-1, -12] // point from which the popup should open relative to the iconAnchor
		});
		coords.map(function(coord, i){
			// console.log(coord.coordinates,i, coord.properties["name"]);
			return L.marker(coord.coordinates, {icon: Icon})
					.addTo(this.map)
					.bindPopup(JSON.stringify(coord.properties["name"])+ i);

			}.bind(this))

	},
    componentDidMount: function() {
    	this.loadMap(this.props.data);
    },
    componentWillUpdate: function() {
    	this.map.remove();
    },
    componentWillUnmount: function() {
        this.map.off('click', this.onMapClick);
        this.map = null;
    },
    onMapClick: function() {
        // Do some wonderful map things...
    },
    render: function() {
        return (
            <div className='map' style={{height: "500px"}}></div>
        );
    }
});

module.exports = Livemap;
