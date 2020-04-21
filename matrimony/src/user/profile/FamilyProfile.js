import React, { Component } from 'react';
import Alert from 'react-s-alert';
import {updateFamilyProfile,fetchFamilyProfileById,getCurrentUser} from "../../util/APIUtils";

class FamilyProfile extends Component {

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
                  <li className="current-page">Family Profile</li>
               </ul>
             </div>
            <div className="services">
   	  <div className="col-sm-6 login_left">
	     <FamilyProfileForm {...this.props} />
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

class FamilyProfileForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id:1,
            occupationFather: '',
            occupationMother: '',
            numOfBrother: 0,
            numOfSister: 0
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
        fetchFamilyProfileById(this.state.id)
            .then((res) => {
                console.log(res);
                let user = res;
                this.setState({
                    id:user.id,
                    occupationFather: user.occupationFather,
                    occupationMother: user.occupationMother,
                    numOfBrother: user.numOfBrother,
                    numOfSister: user.numOfSister
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
        updateFamilyProfile(profileRequest)
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
		      <label htmlFor="edit-occupationFather">Occupation of Father <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-occupationFather" name="occupationFather" size="60" maxLength="60" className="form-text required"  value={this.state.occupationFather} onChange={this.handleInputChange} required/>
		    </div>
		    <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-occupationMother">Occupation of Mother <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-occupationMother" name="occupationMother" size="60" maxLength="60" className="form-text required"  value={this.state.occupationMother} onChange={this.handleInputChange} required/>
		    </div>
		    <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-numOfBrother">Number of Brothers <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-numOfBrother" name="numOfBrother" size="60" maxLength="60" className="form-text required"  value={this.state.numOfBrother} onChange={this.handleInputChange} required/>
		    </div>
            <div className="form-item form-type-textfield form-item-name">
		      <label htmlFor="edit-numOfSister">Number of Sisters <span className="form-required" title="This field is required.">*</span></label>
		      <input type="text" id="edit-numOfSister" name="numOfSister" size="60" maxLength="60" className="form-text required"  value={this.state.numOfSister} onChange={this.handleInputChange} required/>
		    </div>
            
			  <div className="form-actions">
			    <input type="submit" id="edit-submit" name="op" value="Submit" className="btn_1 submit"/>
			  </div>
		 </form>                

        );
    }
}

export default FamilyProfile;