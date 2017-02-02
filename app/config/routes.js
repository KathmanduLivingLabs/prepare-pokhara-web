var React = require('react');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var Home = require('../components/Home')
var Banks = require('../components/Banks')
var Schools = require('../components/Schools')
var Hospitals = require('../components/Hospitals')

var routes = (
	<Router history={hashHistory}>
		<Route path='/' component = {Home}>
			<IndexRoute component={Hospitals}/>
			<Route path = "/banks" component={Banks}/>
			<Route path = "/schools" component={Schools}/>
			<Route path = "/hospitals" component={Hospitals}/>
		</Route>
	</Router>
);

module.exports = routes;