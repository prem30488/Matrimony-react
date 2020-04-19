import React, { Component } from 'react';
//import './Signup.css';
import { Link, Redirect,BrowserRouter } from 'react-router-dom'
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from '../../constants';
import { signup } from '../../util/APIUtils';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import Alert from 'react-s-alert';

class Signup extends Component {
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="grid_3">
            <div className="container">
             <div className="breadcrumb1">
               <ul>
                  <a href="/signup"><i className="fa fa-home home_1"></i></a>
                  <span className="divider">&nbsp;|&nbsp;</span>
                  <li className="current-page">Registration</li>
               </ul>
             </div>
            <div className="services">
   	  <div className="col-sm-6 login_left">
	     <SignupForm {...this.props} />
	  </div>
	  <div className="col-sm-6">
	     <ul className="sharing">
			<li><a href="#" className="facebook" title="Facebook"><i className="fa fa-boxed fa-fw fa-facebook"></i> Share on Facebook</a></li>
		  	<li><a href="#" className="twitter" title="Twitter"><i className="fa fa-boxed fa-fw fa-twitter"></i> Tweet</a></li>
		  	<li><a href="#" className="google" title="Google"><i className="fa fa-boxed fa-fw fa-google-plus"></i> Share on Google+</a></li>
		  	<li><a href="#" className="linkedin" title="Linkedin"><i className="fa fa-boxed fa-fw fa-linkedin"></i> Share on LinkedIn</a></li>
		  	<li><a href="#" className="mail" title="Email"><i className="fa fa-boxed fa-fw fa-envelope-o"></i> E-mail</a></li>
		 </ul>
	  </div>
	  <div className="clearfix"> </div>
   </div>
   </div></div>
        );
    }
}


class SocialSignup extends Component {
    render() {
        return (
            <div className="social-signup">
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /> Sign up with Google</a>
                <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook" /> Sign up with Facebook</a>
                <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                    <img src={githubLogo} alt="Github" /> Sign up with Github</a>
            </div>
        );
    }
}

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            email: '',
            sex : '',
            phoneNumber:'',
            premium:false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }

    setGender(event) {
        console.log(event.target.value);
        this.setState({
            sex: event.target.value
            });
      }

    handleSubmit(event) {
        event.preventDefault();   

        const signUpRequest = Object.assign({}, this.state);
        console.log('event :',event);
        console.log('signUpRequest :' , signUpRequest);
        signup(signUpRequest)
        .then(response => {
            Alert.success("You're successfully registered. Please login to continue!");
            this.props.history.push("/login");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
	  	    <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-name">Name <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-name" name="name" size="60" maxLength="60" className="form-text required"  value={this.state.name} onChange={this.handleInputChange} required/>
		    </div>
            <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-username">Username <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-username" name="username" size="60" maxLength="60" className="form-text required"  value={this.state.username} onChange={this.handleInputChange} required/>
		    </div>
		    <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-pass">Password <span className="form-required" title="This field is required.">*</span></label>
		      <input type="password" id="edit-pass" name="password" size="60" maxLength="128" className="form-text required"  value={this.state.password} onChange={this.handleInputChange} required/>
		    </div>
		    <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-email">Email <span className="form-required" title="This field is required.">*</span></label>
		      <input type="email" id="edit-email" name="email" size="60" maxLength="60" className="form-text required"  value={this.state.email} onChange={this.handleInputChange} required/>
		    </div>
            <div className="form-item form-type-textfield form-item-name">
                <label className="col-sm-7 control-lable" htmlFor="sex">Sex : </label>
                <div className="col-sm-5">
                    <div className="radios" onChange={this.setGender.bind(this)}>
				        <label htmlFor="radio-01" className="label_radio">
				            <input id="radio-01" defaultValue="MALE" name="sex" type="radio" onChange={this.setGender.bind(this)} /> Male
				        </label>
				        <label htmlFor="radio-02" className="label_radio">
				            <input id="radio-02" defaultValue = "FEMALE" name="sex" type="radio" onChange={this.setGender.bind(this)}/> Female
				        </label>
	                </div>
                </div>
                <div className="clearfix"> </div>
             </div>
             <div className="form-item form-type-textfield form-item-name">
			     <label htmlFor="edit-phoneNumber">Phone Number <span className="form-required" title="This field is required.">*</span></label>
				 <input type="text" id="edit-phoneNumber" name="phoneNumber" size="60" maxLength="60" className="form-text required"  value={this.state.phoneNumber} onChange={this.handleInputChange} required />
			  </div>
			  <div className="form-actions">
			    <input type="submit" id="edit-submit" name="op" value="Submit" className="btn_1 submit"/>
			  </div>
		 </form>                

        );
    }
}

export default Signup;