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
      <div className="app-body">
		  <Home/>
		  <Router>
		  <Switch>
	  <Route path="/login"
              render={(props) => <Login authenticated={this.state.authenticated} 
              onlogin={this.loadCurrentlyLoggedInUser} 
              {...props} />}></Route>
            <Route path="/signup"
              render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>  
			
			<PrivateRoute exact path="/home"  authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...this.props}
             component={Home}></PrivateRoute>
			 <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...this.props}
              component={Profile}></PrivateRoute>
            </Switch>
			</Router>
	  </div>
	  <AppFooter/>
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
