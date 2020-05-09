import React, { Component } from 'react';
import Alert from 'react-s-alert';
import {updateAstroProfile,fetchAstroProfileById,getCurrentUser} from "../../util/APIUtils";
import DateTimePicker from 'react-datetime-picker';
import Calendar from 'react-calendar';

class AstroProfile extends Component {

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
                  <li className="current-page">Astro Profile</li>
               </ul>
             </div>
            <div className="services">
   	  <div className="col-sm-6 login_left">
	     <AstroProfileForm {...this.props} />
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

class AstroProfileForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id:1,
            dateOfBirth: '',
            timeOfBirth: '',
            religion: '',
            caste:'',
            subCaste:'',
            raasi:'',
            manglik:false,
            mangal:false
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
        fetchAstroProfileById(this.state.id)
            .then((res) => {
                console.log(res);
                let user = res;
                this.setState({
                    id:user.id,
                    dateOfBirth: new Date(user.dateOfBirth),
                    timeOfBirth: user.timeOfBirth,
                    religion: user.religion,
                    caste:user.caste,
                    subCaste:user.subCaste,
                    raasi:user.raasi,
                    manglik:user.manglik,
                    mangal:user.mangal
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
        updateAstroProfile(profileRequest)
        .then(response => {
           console.log('success!');
           
        }).catch(error => {
           Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
        Alert.success("Profile Updated Successfully!");
    }

    //onChange = date => this.setState({ dateOfBirth:date })

    handleChange(momentDate) {
        console.log(momentDate)
        this.setState({dateOfBirth: momentDate});
      }

    render() {
        const { value } = this.state.dateOfBirth; 
        return (
            <form onSubmit={this.handleSubmit}>
            <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-dateOfBirth">Date Of Birth <span className="form-required" title="This field is required.">*</span></label>
              <Calendar          onChange={(val) => this.handleChange(val)}
              dateFormat="DD-MMM-YYYY"
          value={this.state.dateOfBirth} name="dateOfBirth"
        />
            </div>
		    <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-timeOfBirth">Time Of Birth <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-timeOfBirth" name="timeOfBirth" size="60" maxLength="60" className="form-text required"  value={this.state.timeOfBirth} onChange={this.handleInputChange} required/>
                
		    </div>
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
		      <label htmlFor="edit-caste">Caste <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-caste" name="caste" size="60" maxLength="60" className="form-text required"  value={this.state.caste} onChange={this.handleInputChange} required/>
		    </div>
            <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-subCaste">Caste <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-subCaste" name="subCaste" size="60" maxLength="60" className="form-text required"  value={this.state.subCaste} onChange={this.handleInputChange} required/>
		    </div>
            <div className="form-item form-type-textfield form-item-name">
			     <label htmlFor="edit-raasi">Raasi <span className="form-required" title="This field is required.">*</span></label>
                 <select id="edit-raasi" name="raasi" value={this.state.raasi} onChange={this.handleInputChange} className="form-text required">            
                 <option value="Mesha(Aries)">Mesha(Aries)</option>
                <option value="Vrishaba (Taurus)">Vrishaba (Taurus)</option>
                <option value="Mithuna (Gemini)">Mithuna (Gemini)</option>
                <option value="Karkata (Cancer)">Karkata (Cancer)</option>
                <option value="Simha (Leo)">Simha (Leo)</option>
                <option value="Kanya (Virgo)">Kanya (Virgo)</option>
                <option value="Tula (Libra)">Tula (Libra)</option>
                <option value="Vrischika (Scorpio)">Vrischika (Scorpio)</option>
                <option value="Dhanus (Sagittarius)">Dhanus (Sagittarius)</option>
                <option value="Makara (Capricorn)">Makara (Capricorn)</option>
                <option value="Kumbha (Aquarius)">Kumbha (Aquarius)</option>
                <option value="Meena (Pisces)">Meena (Pisces)</option>
            </select>
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
			  <div className="form-actions">
			    <input type="submit" id="edit-submit" name="op" value="Submit" className="btn_1 submit"/>
			  </div>
		 </form>                

        );
    }
}
  export default AstroProfile;