var React = require('react');
var ReactDOM = require('react-dom')
var L = require('leaflet')

require('../styles/contents.css')

var LeafletMap = React.createClass({
    getInitialState: function() {
        var maxWindowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-55;
        return {
            height: maxWindowHeight,
            isLoading:false
        }
    },
    addPopup: function (d, type) {
        // console.log(type)
        switch(type) {
            case "hospital":
                return ('<strong>Name: </strong>'+d.name
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
                    )
            case "school":
                return ('<strong>Name: </strong>'+d.name
                        +'<br/><strong>Name (Nepali):  </strong>'+d["name:ne"]
                        +'<br/><strong>Operator Type: </strong>'+d["operator:type"]
                        +'<br/><strong>Total Students: </strong>'+d["student:count"]
                        +'<br/><strong>Total Personnel: </strong>'+d["personnel:count"]


                    )
            default:
                return ('<strong>Name: </strong>'+d.name)
        } 

    },
    rendermap: function() {
        var map = this.map = L.map(ReactDOM.findDOMNode(this)).setView([28.207, 83.992], 12);
        L.tileLayer('https://api.mapbox.com/styles/v1/arkoblog/ciy2j6jja00g52sqdi7u4114x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJrb2Jsb2ciLCJhIjoiY2l5MmczdzJyMDAxODJxcDY5NHMyeHpkMyJ9.la6WiYXrUzF1Iy4aST9tnA', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);

    },

    addMarkers:function(data) {
        markerLayer = new L.featureGroup;
        data.features.map(function(d){
          var marker = new L.marker([d.geometry.coordinates[1], d.geometry.coordinates[0]]).addTo(markerLayer)
          .bindPopup(this.addPopup(d.properties.tags, this.props.type))
        }.bind(this));
        markerLayer.addTo(this.map);
    },

    updateMarkers:function(data) {

        this.map.removeLayer(markerLayer)
        markerLayer = new L.featureGroup;
        data.features.map(function(d){
          var marker = new L.marker([d.geometry.coordinates[1], d.geometry.coordinates[0]]).addTo(markerLayer)
          .bindPopup(this.addPopup(d.properties.tags, this.props.type))
          // .bindPopup('<strong>Name</strong><br>'+d.properties.tags.name)
        }.bind(this));
        markerLayer.addTo(this.map);

    },

    updateDimensions: function() {
        var maxWindowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-55;
        this.setState({
            height: maxWindowHeight 
        })
    },


    componentDidMount: function () {
        this.rendermap();
        this.addMarkers(this.props.data);
        window.addEventListener("resize", this.updateDimensions);
    },


    componentDidUpdate: function () {
        this.updateMarkers(this.props.data);
    },

    render: function() {
            return(
                        <div>
                        <div id="map" className="clearfix" style={{height:this.state.height}}>
                        </div> 
                        </div> 
                    )

    }
})

module.exports = LeafletMap