import React, { Component } from 'react';
import Alert from 'react-s-alert';
import LoadingIndicator from '../../common/LoadingIndicator';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import {updateGeneralProfile,fetchGeneralProfileById,getCurrentUser} from "../../util/APIUtils";

class GeneralProfile extends Component {

    constructor(props) {
        super(props);
	}
    
    render() {
        return (
            <div className="grid_3">
            <div className="container">
             <div className="breadcrumb1">
               <ul>
                  <a href="/generalProfile"><i className="fa fa-home home_1"></i></a>
                  <span className="divider">&nbsp;|&nbsp;</span>
                  <li className="current-page">General Profile</li>
               </ul>
             </div>
            <div className="services">
   	  <div className="col-sm-6 login_left">
	     <GeneralProfileForm {...this.props} />
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

class GeneralProfileForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id:1,
            name: '',
            about: '',
            age: '',
            height: '',
            weight : '',
            religion:'',
            maritalStatus:'',
            location: '', state: '',
            education:'',
            bodyType:'',
            physicalStatus:'',
            motherToung:'',
            complexion: '',
            bloodGroup:'',
            diet : '',
            drink: '',
            smoke:''

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
        fetchGeneralProfileById(this.state.id)
            .then((res) => {
                console.log(res);
                let user = res;
                this.setState({
                    id:user.id,
                    name: user.name,
                    about: user.about,
                    age: user.age,
                    height: user.height,
                    weight : user.weight,
                    religion:user.religion,
                    maritalStatus:user.maritalStatus,
                    location: user.location, state: user.state,
                    education:user.education,
                    bodyType:user.bodyType,
                    physicalStatus:user.physicalStatus,
                    motherToung:user.motherToung,
                    complexion: user.complexion,
                    bloodGroup:user.bloodGroup,
                    diet : user.diet,
                    drink: user.drink,
                    smoke:user.smoke

                })
            });
            
    }

    selectCountry (val) {
        this.setState({ location: val });
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
        updateGeneralProfile(profileRequest)
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
		      <label htmlFor="edit-about">About <span className="form-required" title="This field is required.">*</span></label>
		      <textarea type="text" id="edit-about" name="about" rows="3" cols="60" size="60" maxLength="60" className="form-control required bio"  value={this.state.about} onChange={this.handleInputChange} required/>
		    </div>
            <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-age">Age <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-age" name="age" size="60" maxLength="60" className="form-text required"  value={this.state.age} onChange={this.handleInputChange} required/>
		    </div>
		    <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-height">Height <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-height" name="height" size="60" maxLength="60" className="form-text required"  value={this.state.height} onChange={this.handleInputChange} required/>
		    </div>
		    <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-weight">Weight <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-weight" name="weight" size="60" maxLength="60" className="form-text required"  value={this.state.weight} onChange={this.handleInputChange} required/>
		    </div>
            {/* <div className="form-item form-type-textfield form-item-name">
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
             </div> */}
             <div className="form-item form-type-textfield form-item-name">
			     <label htmlFor="edit-religion">Religion <span className="form-required" title="This field is required.">*</span></label>
				 {/* <input type="text" id="edit-religion" name="religion" size="60" maxLength="60" className="form-text required"  value={this.state.religion} onChange={this.handleInputChange} required /> */}
                 <select id="edit-religion" name="religion" value={this.state.religion} onChange={this.handleInputChange} className="form-text required">            
                 <option value="Hindu">Hindu</option>
            <option value="Christian">Christian</option>
            <option value="Sikh">Sikh</option>
            <option value="Parasi">Parasi</option>
          </select>
			  </div>
              <div className="form-item form-type-textfield form-item-name">
			     <label htmlFor="edit-maritalStatus">Marital Status <span className="form-required" title="This field is required.">*</span></label>
				 {/* <input type="text" id="edit-religion" name="religion" size="60" maxLength="60" className="form-text required"  value={this.state.religion} onChange={this.handleInputChange} required /> */}
                 <select id="edit-maritalStatus" name="maritalStatus" value={this.state.maritalStatus} onChange={this.handleInputChange} className="form-text required">  
                    <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
			  </div>
              <div className="form-item form-type-textfield form-item-name">
              <label htmlFor="edit-country">Country Location <span className="form-required" title="This field is required.">*</span></label>
        <CountryDropdown id="edit-country" name="location"
          value={location}
          onChange={(val) => this.selectCountry(val)} />
        <RegionDropdown name="state"
          country={location}
          value={state}
          onChange={(val) => this.selectRegion(val)} />
      </div>
      <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-education">Education <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-education" name="education" size="60" maxLength="60" className="form-text required"  value={this.state.education} onChange={this.handleInputChange} required/>
		    </div>
      <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-bodyType">Body Type <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-bodyType" name="bodyType" size="60" maxLength="60" className="form-text required"  value={this.state.bodyType} onChange={this.handleInputChange} required/>
		    </div>
      <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-physicalStatus">Physical Status <span className="form-required" title="This field is required.">*</span></label>
              <input type="text" id="edit-physicalStatus" name="physicalStatus" size="60" maxLength="60" className="form-text required"  value={this.state.physicalStatus
            } onChange={this.handleInputChange} required/>
		    </div>
      <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-motherToung">Mother Tounge <span className="form-required" title="This field is required.">*</span></label>
              <input type="text" id="edit-motherToung" name="motherToung" size="60" maxLength="60" className="form-text required"  value={this.state.motherToung
            } onChange={this.handleInputChange} required/>
		    </div>
            <div className="form-item form-type-textfield form-item-name">
			     <label htmlFor="edit-complexion">Complexion <span className="form-required" title="This field is required.">*</span></label>
				 {/* <input type="text" id="edit-religion" name="religion" size="60" maxLength="60" className="form-text required"  value={this.state.religion} onChange={this.handleInputChange} required /> */}
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
			     <label htmlFor="edit-bloodGroup">Blood Group <span className="form-required" title="This field is required.">*</span></label>
				 {/* <input type="text" id="edit-religion" name="religion" size="60" maxLength="60" className="form-text required"  value={this.state.religion} onChange={this.handleInputChange} required /> */}
                 <select id="edit-bloodGroup" name="bloodGroup" value={this.state.bloodGroup} onChange={this.handleInputChange} className="form-text required">  
                    <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
			  </div>
              <div className="form-item form-type-textfield form-item-name">
			     <label htmlFor="edit-diet">Diet <span className="form-required" title="This field is required.">*</span></label>
				 {/* <input type="text" id="edit-religion" name="religion" size="60" maxLength="60" className="form-text required"  value={this.state.religion} onChange={this.handleInputChange} required /> */}
                 <select id="edit-diet" name="diet" value={this.state.diet} onChange={this.handleInputChange} className="form-text required">  
                    <option value="Vegetarian">Vegetarian</option>
            <option value="Eggiterian">Eggiterian</option>
            <option value="Non-vegetarian">Non-vegetarian</option>
          </select>
			  </div>
              <div className="form-item form-type-textfield form-item-name">
			     <label htmlFor="edit-drink">Drink <span className="form-required" title="This field is required.">*</span></label>
				 {/* <input type="text" id="edit-religion" name="religion" size="60" maxLength="60" className="form-text required"  value={this.state.religion} onChange={this.handleInputChange} required /> */}
                 <select id="edit-drink" name="drink" value={this.state.drink} onChange={this.handleInputChange} className="form-text required">  
                    <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
			  </div>
              <div className="form-item form-type-textfield form-item-name">
			     <label htmlFor="edit-smoke">Smoke <span className="form-required" title="This field is required.">*</span></label>
				 {/* <input type="text" id="edit-religion" name="religion" size="60" maxLength="60" className="form-text required"  value={this.state.religion} onChange={this.handleInputChange} required /> */}
                 <select id="edit-smoke" name="smoke" value={this.state.smoke} onChange={this.handleInputChange} className="form-text required">  
                 <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
			  </div>
			  <div className="form-actions">
			    <input type="submit" id="edit-submit" name="op" value="Submit" className="btn_1 submit"/>
			  </div>
		 </form>                

        );
    }
}

export default GeneralProfile;