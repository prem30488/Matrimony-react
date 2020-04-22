import React, { Component } from 'react';
import Alert from 'react-s-alert';
import LoadingIndicator from '../../common/LoadingIndicator';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import {updatePartnerPreferenceProfile,fetchPartnerPreferenceProfileById,getCurrentUser} from "../../util/APIUtils";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
class PartnerPreferenceProfile extends Component {

    constructor(props) {
        super(props);
	}
    
    render() {
        return (
            <div className="grid_3">
            <div className="container">
             <div className="breadcrumb1">
               <ul>
                  <a href="/"><i className="fa fa-home home_1"></i></a>
                  <span className="divider">&nbsp;|&nbsp;</span>
                  <li className="current-page">Partner Preference Profile</li>
               </ul>
             </div>
            <div className="services">
   	  <div className="col-sm-6 login_left">
	     <PartnerPreferenceProfileForm {...this.props} />
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

class PartnerPreferenceProfileForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id:1,
            age: '',
            maritalStatus:'',
            bodyType:'',
            complexion: '',
            height: '',
            diet : '',
            manglik : '',
            mangal: '',
            religion:'',
            caste:'',
            motherToung:'',
            education:'',
            occupation:'',
            locationOfHome:'',
            state:'',
            residencyStatus:''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    loadCurrentlyLoggedInUser() {
		getCurrentUser()
		.then(response => {
            console.log('resp',response);
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
        fetchPartnerPreferenceProfileById(this.state.id)
            .then((res) => {
                console.log(res);
                let user = res;
                this.setState({
                    id:user.id,
                    age: user.age?user.age:'',
                    maritalStatus:user.maritalStatus,
                    bodyType:user.bodyType,
                    complexion: user.complexion,
                    height: user.height,
                    diet : user.diet,
                    manglik : user.manglik,
                    mangal: user.mangal,
                    religion:user.religion,
                    caste:user.caste,
                    motherTounge:user.motherTounge,
                    education:user.education,
                    occupation:user.occupation,
                    locationOfHome:user.locationOfHome,
                    state:user.state,
                    residencyStatus:user.residencyStatus
                })
            });
            
    }

    selectCountry (val) {
        this.setState({ locationOfHome: val });
      }
     
      selectRegion (val) {
        this.setState({ state: val });
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
        updatePartnerPreferenceProfile(profileRequest)
        .then(response => {
           console.log('success!');
           
        }).catch(error => {
           Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
        Alert.success("Profile Updated Successfully!");
    }

    handleOnSliderChange = (value) => {
        this.setState({
          age: value
        })
      }

    render() {
        const locationOfHome = this.state.locationOfHome;
        const state = this.state.state;
        let { volume } = this.state.age;
        return (
            <form onSubmit={this.handleSubmit}>
            <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-age">Age <span className="form-required" title="This field is required.">*</span></label>
		      {/* <input type="text" id="edit-age" name="age" size="60" maxLength="60" className="form-text required"  value={this.state.age} onChange={this.handleInputChange} required/> */}
              <Slider 
                value={this.state.age}
                orientation="horizontal"
                onChange={this.handleOnSliderChange}
                min={18}
                max={80}
                step={1}
                tooltip={true}
              />
		    </div>
		    <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-height">Height <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-height" name="height" size="60" maxLength="60" className="form-text required"  value={this.state.height} onChange={this.handleInputChange} required/>
		    </div>
            <div className="form-item form-type-textfield form-item-name">
			     <label htmlFor="edit-maritalStatus">Marital Status <span className="form-required" title="This field is required.">*</span></label>
                 <select id="edit-maritalStatus" name="maritalStatus" value={this.state.maritalStatus} onChange={this.handleInputChange} className="form-text required">  
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                </select>
			  </div>
              <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-bodyType">Body Type <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-bodyType" name="bodyType" size="60" maxLength="60" className="form-text required"  value={this.state.bodyType} onChange={this.handleInputChange} required/>
		    </div>
            <div className="form-item form-type-textfield form-item-name">
			     <label htmlFor="edit-complexion">Complexion <span className="form-required" title="This field is required.">*</span></label>
                 <select id="edit-complexion" name="complexion" value={this.state.complexion} onChange={this.handleInputChange} className="form-text required">  
                    <option value="Light Skin">Light Skin</option>
                    <option value="Fair Skin">Fair Skin</option>
                    <option value="Medium Skin">Medium Skin</option>
                    <option value="Olive Skin">Olive Skin</option>
                    <option value="Tan Brown Skin">Tan Brown Skin</option>
                    <option value="Black Brown Skin">Black Brown Skin</option>
                </select>
			  </div>
              <div className="form-item form-type-textfield form-item-name">
			     <label htmlFor="edit-diet">Diet <span className="form-required" title="This field is required.">*</span></label>
                 <select id="edit-diet" name="diet" value={this.state.diet} onChange={this.handleInputChange} className="form-text required">  
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Eggiterian">Eggiterian</option>
                    <option value="Non-vegetarian">Non-vegetarian</option>
                </select>
			  </div>
              <div className="form-item form-type-textfield form-item-name">
			     <label htmlFor="edit-religion">Religion <span className="form-required" title="This field is required.">*</span></label>
                 <select id="edit-religion" name="religion" value={this.state.religion} onChange={this.handleInputChange} className="form-text required">            
                 <option value="Hindu">Hindu</option>
                <option value="Christian">Christian</option>
                <option value="Sikh">Sikh</option>
                <option value="Parasi">Parasi</option>
            </select>
			  </div>
              <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-caste">Caste <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-caste" name="caste" size="60" maxLength="60" className="form-text required"  value={this.state.caste} onChange={this.handleInputChange} required/>
		    </div>

            <div className="form-item form-type-textfield form-item-name">
			     <label htmlFor="edit-manglik">Manglik <span className="form-required" title="This field is required.">*</span></label>
                 <select id="edit-manglik" name="manglik" value={this.state.manglik} onChange={this.handleInputChange} className="form-text required">  
                    <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
			  </div>
              <div className="form-item form-type-textfield form-item-name">
			     <label htmlFor="edit-mangal">Mangal <span className="form-required" title="This field is required.">*</span></label>
                 <select id="edit-mangal" name="mangal" value={this.state.mangal} onChange={this.handleInputChange} className="form-text required">  
                 <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
			  </div>
              <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-motherTounge">Mother Tounge <span className="form-required" title="This field is required.">*</span></label>
              <input type="text" id="edit-motherTounge" name="motherTounge" size="60" maxLength="60" className="form-text required"  value={this.state.motherTounge} onChange={this.handleInputChange} required/>
		    </div>
            <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-education">Education <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-education" name="education" size="60" maxLength="60" className="form-text required"  value={this.state.education} onChange={this.handleInputChange} required/>
		    </div>
            <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-occupation">Occupation <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-occupation" name="occupation" size="60" maxLength="60" className="form-text required"  value={this.state.occupation} onChange={this.handleInputChange} required/>
		    </div>
              <div className="form-item form-type-textfield form-item-name">
              <label htmlFor="edit-country">Country Location <span className="form-required" title="This field is required.">*</span></label>
        <CountryDropdown id="edit-country" name="locationOfHome"
          value={locationOfHome}
          onChange={(val) => this.selectCountry(val)} />
        <RegionDropdown name="state"
          country={locationOfHome}
          value={state}
          onChange={(val) => this.selectRegion(val)} />
      </div>
      <div className="form-item form-type-textfield form-item-name">
			     <label htmlFor="edit-residencyStatus">residencyStatus <span className="form-required" title="This field is required.">*</span></label>
                 <select id="edit-residencyStatus" name="residencyStatus" value={this.state.residencyStatus} onChange={this.handleInputChange} className="form-text required">  
                    <option value="Indian Citizen">Indian Citizen</option>
                    <option value="NRI">NRI</option>
                    <option value="Non-Indian Citizen">Non-Indian Citizen</option>
                </select>
			  </div>
			  <div className="form-actions">
			    <input type="submit" id="edit-submit" name="op" value="Submit" className="btn_1 submit"/>
			  </div>
		 </form>                

        );
    }
}

export default PartnerPreferenceProfile;