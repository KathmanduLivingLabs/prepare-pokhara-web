var React = require('react');
var ReactRouter = require('react-router')
var Link=ReactRouter.Link;

require('../styles/nav.css');

var Nav = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {

		if (this.props.location.pathname != "/"){
			var str = this.props.location.pathname
			var initialPage = str.split('/').slice(1)

		} else {var initialPage = "hospitals"}
			
		return {
			selectedPage: initialPage,
			pageChoices: []
		}
	},
	changeChoices: function (page) {
		this.setState({selectedPage:page}, this.getChoices)
	},
	getChoices: function() {
		var pageChoices = ["hospitals", "schools", "banks"]
		var newPages =	pageChoices.filter(function(page){return page!= this.state.selectedPage}.bind(this))
		this.setState({pageChoices: newPages});
		this.props.updateRootState(this.state.selectedPage);
	},
	componentWillMount: function () {
		// console.log(this.props.context)
		this.getChoices();
	},
	componentDidMount: function() {
		// console.log("we mounted", this.state.pageChoices)
	},
	render: function(){
		return(
				<div>
				    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
				        <div className="container-fluid">
				            <div className="navbar-header">
				                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#amenity-selection"> <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span> </button>
				                <a className="navbar-brand page-scroll" href="#">Prepare<span>Pokhara</span></a> </div>
				            <div className="collapse navbar-collapse" id="amenity-selection">
				                <ul className="nav navbar-nav navbar-right">
				                    <li ><a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.selectedPage}<span className= "caret"></span></a>
										<ul className="dropdown-menu">
											    {this.state.pageChoices.map(
											    	function(page, i){
											    		return(<li onClick={function(){return this.changeChoices(page)}.bind(this)} key = {i}><Link to={"/"+page}>{page}</Link></li>) 
											    	}.bind(this)
											    )}
										</ul>
				                    </li>
				                </ul>
				            </div>
				        </div>
				    </nav>
				</div>
			)
	}


});

module.exports = Nav
