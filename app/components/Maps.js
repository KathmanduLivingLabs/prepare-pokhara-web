var React = require('react');
var ReactDOM = require('react-dom')
var L = require('leaflet')


require('../styles/contents.css')

var Popup = React.createClass({
    render: function () {
        return null
    }
})



var LeafletMap = React.createClass({
    popup: function (d) {
        return ('<strong>Name: </strong>'+d.name
                +'<br/><strong>ICU: </strong>'+(function(d){return d["facility:icu"] ? "yes":"no"}(d))
                +'<br/><strong>Ventilator: </strong>'+(function(d){return d["facility:ventilator"] ? "yes":"no"}(d))
                +'<br/><strong>Ambulance: </strong>'+(function(d){return d["emergency_service"] ? "yes":"no"}(d))
                +'<br/><strong>Operation Theatre: </strong>'+(function(d){return d["facility:operating_theatre"] ? "yes":"no"}(d))
                +'<br/><strong>NICU: </strong>'+(function(d){return d["facility:nicu"] ? "yes":"no"}(d))
                +'<br/><strong>Operation Theatre: </strong>'+(function(d){return d["emergency"] ? "yes":"no"}(d))
                +'<br/><strong>X-Ray: </strong>'+(function(d){return d["facility:x_ray"] ? "yes":"no"}(d))
                +'<br/><strong>Bed Capacity: </strong>'+ d["capacity:beds"]
                +'<br/><strong>Personnel Count: </strong>'+ d["personnel:count"]
                )
    },
    rendermap: function() {
        var map = this.map = L.map(ReactDOM.findDOMNode(this)).setView([28.207, 83.992], 12);
        L.tileLayer('https://api.mapbox.com/styles/v1/arkoblog/ciy2j6jja00g52sqdi7u4114x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJrb2Jsb2ciLCJhIjoiY2l5MmczdzJyMDAxODJxcDY5NHMyeHpkMyJ9.la6WiYXrUzF1Iy4aST9tnA', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
         
    },

    addMarkers:function(data) {
        markerLayer =new L.featureGroup;
        data.features.map(function(d){
          // console.log("Hi",d);
          var marker = new L.marker([d.geometry.coordinates[1], d.geometry.coordinates[0]]).addTo(markerLayer)
          .bindPopup(this.popup(d.properties.tags))
          // .bindPopup('<strong>Name</strong><br>'+d.properties.tags.name)
        }.bind(this));
        markerLayer.addTo(this.map);
    },

    updateMarkers:function(data) {
        this.map.removeLayer(markerLayer)
        markerLayer = new L.featureGroup;
        data.features.map(function(d){
          console.log("Hi",d);
          var marker = new L.marker([d.geometry.coordinates[1], d.geometry.coordinates[0]]).addTo(markerLayer)
          .bindPopup(this.popup(d.properties.tags))
          // .bindPopup('<strong>Name</strong><br>'+d.properties.tags.name)
        }.bind(this));
        markerLayer.addTo(this.map);
    },

    componentDidMount: function () {
        this.rendermap();
        this.addMarkers(this.props.data);
    },

    componentDidUpdate: function () {
        this.updateMarkers(this.props.data);
    },
    
    render: function() {
      return(
          <div id="map" style={{height:"90vh"}}></div> 
        )
    }
})

module.exports = LeafletMap