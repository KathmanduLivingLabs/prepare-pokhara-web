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

    addPopupTry: function(layer, d, i) {
        var rootLayer = "layer"
        eval(rootLayer + i + "=" + "new L.featureGroup");

        myLayer = eval(rootLayer + i)

        var classname = "form" + i;

        var popupContent = '<form role="form" class="' + classname + '" enctype="multipart/form-data">' + d.name +
            '<div class="form-group">' +
            '<label class="control-label col-sm-5">Enter data:</label>' +
            '<input type="string" placeholder="type here" id="input1"/>' +
            '</div>' +
            '<div class="form-group">' +
            '<div style="text-align:center;" class="col-xs-4">' +
            '<button type="submit">Submit</button></div>' +
            '</div>' +
            '</form>';

        myLayer.bindPopup(popupContent)

        function mySubmitFunction(e) {
            console.log(e)
            e.preventDefault(); // This should really be the first line

            // Other logic
        }

    },

    addPopup: function(d, type, submitfunc) {
        // console.log(type)
        switch (type) {
            case "hospital":
                return ('<strong>Name: </strong>' + d.name + '<br/><strong>Name (Nepali):  </strong>' + d["name:ne"] + '<br/><strong>ICU: </strong>' + d["facility:icu"] + '<br/><strong>Ventilator: </strong>' + d["facility:ventilator"] + '<br/><strong>Emergency Services: </strong>' + d["emergency_service"] + '<br/><strong>Operation Theatre: </strong>' + d["facility:operating_theatre"] + '<br/><strong>NICU: </strong>' + d["facility:nicu"] + '<br/><strong>Emergency: </strong>' + d["emergency"] + '<br/><strong>X-Ray: </strong>' + d["facility:x-ray"] + '<br/><strong>Bed Capacity: </strong>' + d["capacity:beds"] + '<br/><strong>Personnel Count: </strong>' + d["personnel:count"])
            case "school":
                return ('<strong>Name: </strong>' + d.name + '<br/><strong>Name (Nepali):  </strong>' + d["name:ne"] + '<br/><strong>Operator Type: </strong>' + d["operator:type"] + '<br/><strong>Total Students: </strong>' + d["student:count"] + '<br/><strong>Total Personnel: </strong>' + d["personnel:count"]


                )
            case "try":

                return (
                    '<div class = "container-fluid row-fluid popup" style="">' + '<form onsubmit="submitfunction()">' + '<div class = "form-group">' + '<div class="row">' + '<div class = "col-md-3 form-label">' + '<label for="hospital-name">Name:</label>' + '</div>' + '<div class="col-md-9">' + '<input type="text" class="form-control" id="hospital-name" value="' + d.name + '">' + '</div>' + '</div>' + '</div>' + '<div class = "form-group">' + '<div class="row">' + '<div class = "col-md-3 form-label">' + '<label for="nepali-name">Name (Nepali):</label>' + '</div>' + '<div class="col-md-9">' + '<input type="text" class="form-control" id="nepali-name" value="' + d["name:ne"] + '">' + '</div>' + '</div>' + '</div>' + '<div class = "form-group">' + '<div class="row">' + '<div class = "col-md-3 form-label">' + '<label for="facility-icu">ICU:</label>' + '</div>' + '<div class="col-md-9">' + '<input type="text" class="form-control" id="facility-icu" value="' + d["facility:icu"] + '">' + '</div>' + '</div>' + '</div>' + '<div class = "form-group">' + '<div class="row">' + '<div class = "col-md-3 form-label">' + '<label for="facility-ventilator">Ventilator:</label>' + '</div>' + '<div class="col-md-9">' + '<input type="text" class="form-control" id="facility-ventilator" value="' + d["facility:ventilator"] + '">' + '</div>' + '</div>' + '</div>' + '<div class = "form-group">' + '<div class="row">' + '<div class = "col-md-3 form-label">' + '<label for="facility-emergency-services">Emergency Services:</label>' + '</div>' + '<div class="col-md-9">' + '<input type="text" class="form-control" id="facility-emergency-services" value="' + d["emergency_service"] + '">' + '</div>' + '</div>' + '</div>' + '<div class = "form-group">' + '<div class="row">' + '<div class = "col-md-3 form-label">' + '<label for="facility-ot">Operation Theater:</label>' + '</div>' + '<div class="col-md-9">' + '<input type="text" class="form-control" id="facility-ot" value="' + d["facility:operating_theatre"] + '">' + '</div>' + '</div>' + '</div>' + '<div class = "form-group">' + '<div class="row">' + '<div class = "col-md-3 form-label">' + '<label for="facility-nicu">NICU:</label>' + '</div>' + '<div class="col-md-9">' + '<input type="text" class="form-control" id="facility-nicu" value="' + d["facility:nicu"] + '">' + '</div>' + '</div>' + '</div>' + '<div class = "form-group">' + '<div class="row">' + '<div class = "col-md-3 form-label">' + '<label for="facility-emergency">Emergency:</label>' + '</div>' + '<div class="col-md-9">' + '<input type="text" class="form-control" id="facility-emergency" value="' + d["emergency"] + '">' + '</div>' + '</div>' + '</div>' + '<div class = "form-group">' + '<div class="row">' + '<div class = "col-md-3 form-label">' + '<label for="facility-xray">X Ray:</label>' + '</div>' + '<div class="col-md-9">' + '<input type="text" class="form-control" id="facility-xray" value="' + d["facility:x-ray"] + '">' + '</div>' + '</div>' + '</div>' + '<div class = "form-group">' + '<div class="row">' + '<div class = "col-md-3 form-label">' + '<label for="bed-capacity">Bed Capacity:</label>' + '</div>' + '<div class="col-md-9">' + '<input type="text" class="form-control" id="bed-capacity" value="' + d["capacity:beds"] + '">' + '</div>' + '</div>' + '</div>' + '<div class = "form-group">' + '<div class="row">' + '<div class = "col-md-3 form-label">' + '<label for="personnel-count">Personnel Count:</label>' + '</div>' + '<div class="col-md-9">' + '<input type="text" class="form-control" id="personnel-count" value="' + d["personnel:count"] + '">' + '</div>' + '</div>' + '</div>' + '<input type="submit">' + '</form >' + '</div>'

                )
            default:
                return ('<strong>Name: </strong>' + d.name)
        }

    },
    rendermap: function() {
        var map = this.map = L.map(ReactDOM.findDOMNode(this)).setView([28.207, 83.992], 12);
        L.tileLayer('https://api.mapbox.com/styles/v1/arkoblog/ciy2j6jja00g52sqdi7u4114x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJrb2Jsb2ciLCJhIjoiY2l5MmczdzJyMDAxODJxcDY5NHMyeHpkMyJ9.la6WiYXrUzF1Iy4aST9tnA', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    },

    onSubmitData: function(e) {
        var payload = {}
        var target = e.target
        for (var i = 0; i < target.length; i++) {
            payload[target[i].id] = target[i].value
        }
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
