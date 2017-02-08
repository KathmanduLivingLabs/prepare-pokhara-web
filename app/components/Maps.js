var React = require('react');
var ReactDOM = require('react-dom')
var L = require('leaflet')


var LeafletMap = React.createClass({
    rendermap: function() {
        var map = this.map = L.map(ReactDOM.findDOMNode(this)).setView([28.207, 83.992], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/arkoblog/ciy2j6jja00g52sqdi7u4114x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJrb2Jsb2ciLCJhIjoiY2l5MmczdzJyMDAxODJxcDY5NHMyeHpkMyJ9.la6WiYXrUzF1Iy4aST9tnA', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
         
    },

    addMarkers:function(data) {
        markerLayer =new L.featureGroup;
        data.features.map(function(d){
          var marker = new L.marker([d.geometry.coordinates[1], d.geometry.coordinates[0]]).addTo(markerLayer)
          .bindPopup('<strong>Name</strong><br>'+d.properties.tags.name)
        });
        markerLayer.addTo(this.map);
    },

    updateMarkers:function(data) {
        this.map.removeLayer(markerLayer)
        markerLayer = new L.featureGroup;
        data.features.map(function(d){
          var marker = new L.marker([d.geometry.coordinates[1], d.geometry.coordinates[0]]).addTo(markerLayer)
          .bindPopup('<strong>Name</strong><br>'+d.properties.tags.name)
        });
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
          <div id="map" style={{height:"100vh"}}></div> 
        )
    }
})

module.exports = LeafletMap