var React = require('react');
var PropTypes = React.PropTypes;

var styles = {
    container: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        fontSize: '55px'
    },
    content: {
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        marginTop: '30px'
    }
}

var Loading = React.createClass({
    propTypes: {
        text: PropTypes.string,
        speed: PropTypes.number
    },
    getDefaultProps: function() {
        return {
            text: 'Loading',
            speed: 500
        }
    },
    getInitialState: function() {
        this.originalText = this.props.text;
        return {
            text: this.originalText
        }
    },
    componentDidMount: function() {
        var stopper = this.originalText + '...';
        this.interval = setInterval(function() {
            if (this.state.text === stopper) {
                this.setState({
                    text: this.originalText
                })
            } else {
                this.setState({
                    text: this.state.text + '.'
                })
            }
        }.bind(this), this.props.speed)
    },
    componentWillUnmount: function() {
        clearInterval(this.interval)
    },
    render: function() {
        return (

            <div className="header row-fluid">
					<div className="jumbotron jumbotron-loading text-center">
					<h1>{this.state.text}</h1>	
					<hr/>
					<h3>Please wait until the page loads.</h3>	
					</div>
				</div>
        );
    }
})

module.exports = Loading;
