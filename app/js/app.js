var React   = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var IndexRoute = require('react-router').IndexRoute;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;
var transitionTo = Router.transitionTo;
var Button = require('react-button');
var {Lifecycle, RouteContext} = require('react-router');
var History = require('react-router').History;
var App = React.createClass({
  render: function() 
  {
      return(
        <div>
          <nav className="navbar navbar-default" role="navigation" id='navbar'>
            <div className="nav navbar-nav navbar-left">                
              <Link className="navbar-brand" to="/home">Home</Link>                  
            </div>
            <div className="nav navbar-nav navbar-right" id="bs-example-navbar-collapse-1">
              <li><Link>Sign in</Link></li>
              <li><Link>Sign up</Link></li>
            </div>
          </nav>
          <div className="container">
            {this.props.children}
          </div>
        </div>
      );
  }
});
var learnMoreStyle =
{
  width: '50%',
  marginLeft: '25%',
  textAlign: 'center'
};
var inputStyle =
{
  width: '50%',
  marginLeft: '25%'
};
var homeStyle =
{
  textAlign: 'center',
  fontFamily: '100 50px proxima-nova-1,proxima-nova-2,\'Proxima Nova\',HelveticaNeue,Helvetica,Arial,sans-serif',
  fontSize: '30',
  align: 'center',
  color: '#ECF3F7',
  left: '0',
  position: 'absolute'
};
var Home = React.createClass
({
	mixins: [History, Lifecycle, RouteContext],
  getInitialState: function() 
  {

    return {address:''};
  },
  render: function() {
    var address = this.state.address;
    if(document.getElementById('navbar'))
    {
      document.getElementById('navbar').style.marginBottom ='0';
    }
    return (
    <div>
      <div  className="Intro bg-primary" style={homeStyle}>
      <br/>
      <br/>
        <p> <strong>Millions</strong> of driveways in one place.</p>
        <div className="row">
          <div className="input-group" style={inputStyle}>
            <input type="text" className="form-control" value={address} placeholder="Search the address of an event"/>
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">Go!</button>
            </span>
          </div>
        </div>
      </div>

      <div className="panel panel-primary" style={learnMoreStyle}>
        <div className="panel-body" > 
          <h2>Rent out your driveway</h2>
          <h4>Easy as 1...2...3...</h4>
          <button className="btn btn-primary" type="button">
          Learn more
          </button>
        </div>
      </div>
    

    </div>

    );
  }
});
var learnMoreStyle =
{
  width: '50%',
  marginLeft: '25%',
  textAlign: 'center'
};
var routes = (
      <Router>
        <Route name="app" path="/" component={App} handler={App}>
          <IndexRoute component={Home} />
          <Route name="home" path="/home" component={Home}/>
        </Route>
      </Router>
);
//ReactDOM.render(routes, document.getElementById('content'));
ReactDOM.render(
  <Home />,
  document.getElementById('content')
);