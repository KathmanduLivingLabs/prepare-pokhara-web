var React = require('react')
var Maps = require('./Maps')
var EditForm = require('./EditForm')

var ReactRouter = require('react-router')
var Link = ReactRouter.Link;


var Puker = require('../utils/Puker')


require ('../styles/styles.css');
require ('../styles/contents.css');
require ('../styles/nav.css');

var Edit = React.createClass({
	getInitialState: function(){
		return {
			data: this.props.location.state.data,
			parentLocation: this.props.location.state.parentLocation,
			id:this.props.location.state.id
		}
	},
	render: function() {
		return (
			<div>
				<nav id="menu" className="navbar navbar-default navbar-fixed-top">
				        <div className="container-fluid">
				            <div className="navbar-header">
				                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#amenity-selection"> <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span> </button>
				                <a className="navbar-brand page-scroll" href="#">Prepare<span>Pokhara</span></a>
				            </div>
				                <ul className="nav navbar-nav navbar-right">
				                </ul>
					</div>
				</nav>
				<div className="header">
					<div className="row-fluid">
						<div className="col-md-8 no-padding"><Maps.Single data = {this.props.location.state.data}/></div>
						<div className="col-md-4">
						<EditForm type = {this.props.location.state.parentLocation} location={this.props.location}/>
						</div>
					</div>
				</div>
			</div>

		)
	}
})

module.exports = Edit