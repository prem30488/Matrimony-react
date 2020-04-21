import React, { Component } from 'react';
import Alert from 'react-s-alert';
import {updateCareerProfile,fetchCareerProfileById,getCurrentUser} from "../../util/APIUtils";

class CareerProfile extends Component {

    constructor(props) {
        super(props);
	}
    
    render() {
        return (
            <div className="grid_3">
            <div className="container">
             <div className="breadcrumb1">
               <ul>
                  <a href="/familyProfile"><i className="fa fa-home home_1"></i></a>
                  <span className="divider">&nbsp;|&nbsp;</span>
                  <li className="current-page">Career Profile</li>
               </ul>
             </div>
            <div className="services">
   	  <div className="col-sm-6 login_left">
	     <CareerProfileForm {...this.props} />
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

class CareerProfileForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id:1,
            education: '',
            educationDetails: '',
            occupation: '',
            annualIncome: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    loadCurrentlyLoggedInUser() {
		
	
		getCurrentUser()
		.then(response => {
		  this.setState({
			currentUser: response,
			authenticated: true,
            loading: false,
            id: response.id
          });
          this.loadUser();
		}).catch(error => {
		  this.setState({
			loading: false
		  });  
		});    
	  }
	
	
    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }

    loadUser() {
        fetchCareerProfileById(this.state.id)
            .then((res) => {
                console.log(res);
                let user = res;
                this.setState({
                    id:user.id,
                    education: user.education,
                    educationDetails: user.educationDetails,
                    occupation: user.occupation,
                    annualIncome: user.annualIncome
                })
            });
            
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }

    handleSubmit(event) {
        event.preventDefault();   

        const profileRequest = Object.assign({}, this.state);
       
        console.log('profileRequest :' , profileRequest);
        updateCareerProfile(profileRequest)
        .then(response => {
           console.log('success!');
           
        }).catch(error => {
           Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
        Alert.success("Profile Updated Successfully!");
    }


    render() {
        const location = this.state.location;
        const state = this.state.state;
        return (
            <form onSubmit={this.handleSubmit}>
            <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-education">Education <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-education" name="education" size="60" maxLength="60" className="form-text required"  value={this.state.education} onChange={this.handleInputChange} required/>
		    </div>
		    <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-educationDetails">Education Details <span className="form-required" title="This field is required.">*</span></label>
		      <textarea type="text" id="edit-occupationMother" name="educationDetails" size="60" maxLength="60" className="form-text required bio"  value={this.state.educationDetails} onChange={this.handleInputChange} required/>
		    </div>
		    <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-occupation">Your Occupation <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-occupation" name="occupation" size="60" maxLength="60" className="form-text required"  value={this.state.occupation} onChange={this.handleInputChange} required/>
		    </div>
            <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-annualIncome">Annual Income <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-annualIncome" name="annualIncome" size="60" maxLength="60" className="form-text required"  value={this.state.annualIncome} onChange={this.handleInputChange} required/>
		    </div>
            
			  <div className="form-actions">
			    <input type="submit" id="edit-submit" name="op" value="Submit" className="btn_1 submit"/>
			  </div>
		 </form>                

        );
    }
}

export default CareerProfile;