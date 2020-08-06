import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import AppHeader from './common/AppHeader';
import AppFooter from './common/AppFooter';
import Home from './home/Home';
import Login from './user/login/Login';
import Signup from './user/signup/Signup';
import Profile from './user/profile/Profile';
import GeneralProfile from './user/profile/GeneralProfile';
import FamilyProfile from './user/profile/FamilyProfile';
import AstroProfile from './user/profile/AstroProfile';
import CareerProfile from './user/profile/CareerProfile';
import PartnerPreferenceProfile from './user/profile/PartnerPreferenceProfile';
import ViewProfile from './user/profile/ViewProfile';

import NewMatches from './matches/NewMatches';
import ViewedMyProfile from './matches/ViewedMyProfile';
import ViewedNotContacted from './matches/ViewedNotContacted';
import ShortlistedProfiles from './matches/ShortlistedProfiles';
import AdvancedSearch from './search/AdvancedSearch';
import Search from './search/Search';
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
    <div className="App content-container">
		<div className="app-top-box">
          <AppHeader authenticated={this.state.authenticated} currentUser={this.state.currentUser} onLogout={this.handleLogout} />
        </div>
      <div className="header">
		  <Router>
		  <Switch>
		  <Route exact path="/" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Home}></Route>
            <PrivateRoute exact path="/home"  authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...this.props}
             component={Home}></PrivateRoute>
			<PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...this.props}
              component={Profile}></PrivateRoute>
			<Route exact path="/generalProfile" authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...this.props}
              component={GeneralProfile}></Route>
			<Route exact path="/familyProfile" authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...this.props}
              component={FamilyProfile}></Route>
			<Route exact path="/astroProfile" authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...this.props}
              component={AstroProfile}></Route>
			<Route exact path="/careerProfile" authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...this.props}
              component={CareerProfile}></Route>
			  <Route exact path="/partnerPreferenceProfile" authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...this.props}
              component={PartnerPreferenceProfile}></Route>
			  <Route exact path="/newMatches" authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...this.props}
              component={NewMatches}></Route>
			  <Route exact path="/viewProfile" authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...this.props}
              component={ViewProfile}></Route>
			  <Route exact path="/viewedMyProfile" authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...this.props}
              component={ViewedMyProfile}></Route>
			  <Route exact path="/viewedNotContacted" authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...this.props}
              component={ViewedNotContacted}></Route>
			  <Route exact path="/shortlistedProfiles" authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...this.props}
              component={ShortlistedProfiles}></Route>
			  
			  <Route exact path="/advancedSearch" authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...this.props}
              component={AdvancedSearch}></Route>
			  <Route exact path="/search" authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...this.props}
              component={Search}></Route>
	  		<Route path="/login"
              render={(props) => <Login authenticated={this.state.authenticated} 
              onlogin={this.loadCurrentlyLoggedInUser} 
              {...props} />}></Route>
            <Route path="/signup"
              render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>  
			
			<Route component={NotFound}></Route>
            </Switch>
			</Router>
	  </div>

	  <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
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
