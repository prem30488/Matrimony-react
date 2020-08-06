import React, { Component } from 'react';
import { Link, NavLink,BrowserRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

class AppHeader extends Component {
	constructor(props){
		super(props);
		//console.log('auth',this.props.authenticated);
		//console.log("curuser",this.props.currentUser);
	}
	render() {
		
        return (
    <React.Fragment>
		{this.props.authenticated ?
		
<div className="navbar navbar-inverse-blue navbar">
      <div className="navbar-inner">
        <div className="container">
           <div className="navigation">
             <nav id="colorNav">
			   <ul>
				<li className="green">
					<a href="#" className="icon-home"></a>
          <ul>
    
            <li><a href="#">Change Password</a></li>
            <li><a onClick={this.props.onLogout}>Logout</a></li>
          
				  </ul>
					 
				</li>
			   </ul>
             </nav>
           </div>
           <a className="brand" href="/Home"><img src="images/logo.png" alt="logo"></img></a>
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
		            <li><a href="/Home">Home</a></li>
                
		            <li><a href="about.html">About</a></li>

    
            <li  className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">Profile<span className="caret"></span></a>
              <ul className="dropdown-menu" role="menu">
                    <li><a key="1" href="/generalProfile" {...this.props}>General Profile</a>
                          
                        </li>  
		                <li><a href="/familyProfile">Family Profile</a></li>
		                <li><a href="/astroProfile">Astro Profile</a></li>
		                <li><a href="/careerProfile">Career Profile</a></li>
		                <li><a href="/partnerPreferenceProfile">Partner Preference</a></li>
		          </ul>
            </li>
            <li className="dropdown">
		              <a href="#" className="dropdown-toggle" data-toggle="dropdown">Matches<span className="caret"></span></a>
		              <ul className="dropdown-menu" role="menu">
		                <li><a href="/newMatches">New Matches</a></li>
		                <li><a href="/viewedMyProfile">Who Viewed my Profile</a></li>
		                <li><a href="/viewedNotContacted">Viewed &amp; not Contacted</a></li>
		                {/* <li><a href="members.html">Premium Members</a></li> */}
		                <li><a href="/shortlistedProfiles">Shortlisted Profile</a></li>
		              </ul>
		            </li>
					<li className="dropdown">
		              <a href="#" className="dropdown-toggle" data-toggle="dropdown">Search<span className="caret"></span></a>
		              <ul className="dropdown-menu" role="menu">
		                <li><a href="/search">Regular Search</a></li>
						<li><a href="/advancedSearch">Advanced Search</a></li>
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
    

                <li><a href="/events">News &amp; Events</a></li>

		            <li className="last"><a href="contact.html">Contacts</a></li>
		        </ul>
		     </div>
		    </nav>
		   </div> 
          <div className="clearfix"> </div>
        </div> 
      </div> 
    </div>     		
		: 
		<div className="navbar navbar-inverse-blue navbar">
      <div className="navbar-inner">
        <div className="container">
           <div className="navigation">
             <nav id="colorNav">
			   <ul>
				<li className="green">
					<a href="#" className="icon-home"></a>
          <ul>
          <li><a href="login">Login</a></li>
					<li><a href="signup">Register</a></li>
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
		            <li><a href="/">Home</a></li>
                
		            <li><a href="about.html">About</a></li>

    
                <li><a href="/events">News &amp; Events</a></li>

		            <li className="last"><a href="contact.html">Contacts</a></li>
		        </ul>
		     </div>
		    </nav>
		   </div> 
          <div className="clearfix"> </div>
        </div> 
      </div> 
    </div>
	}
    </React.Fragment>
	)
    }
}
AppHeader.propTypes = {
    authenticated: PropTypes.bool,
    currentUser: PropTypes.object,
    loading: PropTypes.bool
  };
export default AppHeader;