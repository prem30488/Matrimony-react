import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './common/AppHeader';
import AppFooter from './common/AppFooter';
import Home from './home/Home';
import Login from './user/login/Login';
import Signup from './user/signup/Signup';
import Profile from './user/profile/Profile';
import Contact from './user/contact/Contact';
import OAuth2RedirectHandler from './user/oauth2/OAuth2RedirectHandler';
import NotFound from './common/NotFound';
import LoadingIndicator from './common/LoadingIndicator';
import { getCurrentUser } from './util/APIUtils';
import { ACCESS_TOKEN } from './constants';
import PrivateRoute from './common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom'
import {
	Route,
	Switch
  } from 'react-router-dom';
import HomeUser from './home/HomeUser';
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  authenticated: false,
		  currentUser: null,
		  loading: false
		}
	
		this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}
	loadCurrentlyLoggedInUser() {
		this.setState({
		  loading: true
		});
	
		getCurrentUser()
		.then(response => {
		  this.setState({
			currentUser: response,
			authenticated: true,
			loading: false
		  });
		}).catch(error => {
		  this.setState({
			loading: false
		  });  
		});    
	  }
	
	  handleLogout() {
		localStorage.removeItem(ACCESS_TOKEN);
		this.setState({
		  authenticated: false,
		  currentUser: null
		});
		Alert.success("You're safely logged out!");
		window.location.reload();
	  }
	
	  componentDidMount() {
		this.loadCurrentlyLoggedInUser();
	  }
	
  render (){
	if(this.state.loading) {
		return <LoadingIndicator />
	  }
	  return(
    <div className="App">
		<div className="app-top-box">
          <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
        </div>
      <div className="navbar navbar-inverse-blue navbar">
      <div className="navbar-inner">
        <div className="container">
           <div className="navigation">
             <nav id="colorNav">
			   <ul>
				<li className="green">
					<a href="#" className="icon-home"></a>
					<ul>
						<li><a href="login.html">Login</a></li>
					    <li><a href="register.html">Register</a></li>
					    <li><a href="index.html">Logout</a></li>
					</ul>
				</li>
			   </ul>
             </nav>
           </div>
           <a className="brand" href="index.html"><img src="images/logo.png" alt="logo"></img></a>
           <div className="pull-right">
          	<nav className="navbar nav_bottom" role="navigation">
            
		  <div className="navbar-header nav_2">
		      <button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">Menu
		        <span className="sr-only">Toggle navigation</span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		      </button>
		      <a className="navbar-brand" href="#"></a>
		   </div> 
		   
		    <div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
		        <ul className="nav navbar-nav nav_1">
		            <li><a href="index.html">Home</a></li>
		            <li><a href="about.html">About</a></li>
		    		<li className="dropdown">
		              <a href="#" className="dropdown-toggle" data-toggle="dropdown">Matches<span className="caret"></span></a>
		              <ul className="dropdown-menu" role="menu">
		                <li><a href="matches.html">New Matches</a></li>
		                <li><a href="viewed-profile.html">Who Viewed my Profile</a></li>
		                <li><a href="viewed-not_contacted.html">Viewed & not Contacted</a></li>
		                <li><a href="members.html">Premium Members</a></li>
		                <li><a href="shortlisted.html">Shortlisted Profile</a></li>
		              </ul>
		            </li>
					<li className="dropdown">
		              <a href="#" className="dropdown-toggle" data-toggle="dropdown">Search<span className="caret"></span></a>
		              <ul className="dropdown-menu" role="menu">
		                <li><a href="search.html">Regular Search</a></li>
		                <li><a href="profile.html">Recently Viewed Profiles</a></li>
		                <li><a href="search-id.html">Search By Profile ID</a></li>
		                <li><a href="faq.html">Faq</a></li>
		                <li><a href="shortcodes.html">Shortcodes</a></li>
		              </ul>
		            </li>
		            <li className="dropdown">
		              <a href="#" className="dropdown-toggle" data-toggle="dropdown">Messages<span className="caret"></span></a>
		              <ul className="dropdown-menu" role="menu">
		                <li><a href="inbox.html">Inbox</a></li>
		                <li><a href="inbox.html">New</a></li>
		                <li><a href="inbox.html">Accepted</a></li>
		                <li><a href="sent.html">Sent</a></li>
		                <li><a href="upgrade.html">Upgrade</a></li>
		              </ul>
		            </li>
		            <li className="last"><a href="contact.html">Contacts</a></li>
		        </ul>
		     </div>
		    </nav>
		   </div> 
          <div className="clearfix"> </div>
        </div> 
      </div> 
    </div> 

<div className="banner">
  <div className="container">
    <div className="banner_info">
      <h3>Millions of verified Members</h3>
      <a href="view_profile.html" className="hvr-shutter-out-horizontal">Create your Profile</a>
    </div>
  </div>
   
</div>

</div>
	  );
}
}

App.propTypes = {
	authenticated: PropTypes.bool,
	currentUser: PropTypes.object,
	loading: PropTypes.bool
  };

export default App;
