var React = require('react');
var ReactDOM = require('react-dom')
var L = require('leaflet')
var PopupHelpers = require('../utils/PopupHelpers')

require('../styles/contents.css')
require('../styles/popups.css')

var LeafletMap = React.createClass({
    getInitialState: function() {
        var maxWindowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 55;
        return {
            height: maxWindowHeight,
            isLoading: false,
            customOptions: { 'maxWidth': '600' }
        }
    },

    rendermap: function() {
        var map = this.map = L.map(ReactDOM.findDOMNode(this)).setView([28.207, 83.992], 12);
        L.tileLayer('https://api.mapbox.com/styles/v1/arkoblog/ciy2j6jja00g52sqdi7u4114x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJrb2Jsb2ciLCJhIjoiY2l5MmczdzJyMDAxODJxcDY5NHMyeHpkMyJ9.la6WiYXrUzF1Iy4aST9tnA', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    },

    onSubmitData: function(e) {
        this.props.parentprops.router.push({pathname:'/hospitals'})
        // var payload = {}
        // var target = e.target
        // for (var i = 0; i < target.length; i++) {
        //     payload[target[i].id] = target[i].value
        // }
    },

    addMarkers: function(data) {
        markerLayer = new L.featureGroup;
        data.features.map(function(d, i) {
            var marker = new L.marker([d.geometry.coordinates[1], d.geometry.coordinates[0]]).addTo(markerLayer)
                .bindPopup(PopupHelpers.getPopupContent(this.props.type, d.properties.tags, i), this.state.customOptions)

            $('body').on('submit', '.form' + i, this.onSubmitData);
        }.bind(this));

        markerLayer.addTo(this.map);

    },

    updateMarkers: function(data) {
        this.map.removeLayer(markerLayer)
        this.addMarkers(data)
    },

    updateDimensions: function() {
        var maxWindowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 55;
        this.setState({
            height: maxWindowHeight
        })
    },


    componentDidMount: function() {
        this.rendermap();
        this.addMarkers(this.props.data);
        window.addEventListener("resize", this.updateDimensions);
    },


    componentDidUpdate: function() {
        this.updateMarkers(this.props.data);
    },

    render: function() {
        return (
            <div>
                        <div id="map" className="clearfix" style={{height:this.state.height}}>
                        </div> 
                        </div>
        )

    }
})

module.exports = LeafletMap
