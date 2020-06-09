import React, {Component} from 'react';
//import solrReducer from "./solr-reducer";
import {getCurrentUser,fetchUserById} from '../../util/APIUtils';
import TablePagination from '@material-ui/core/TablePagination';
import AppFooter from "../../common/AppFooter";
import Alert from 'react-s-alert';
class ViewProfile extends Component {

    constructor(props){
        super(props);
        this.state ={
            id:0,
            row:{},
            profile:{},
            astroProfile:{},
            careerProfile:{},
            familyProfile:{},
            partnerPreference:{}
        }
        this.loadCurrentlyLoggedInUser();
        this.loadUser = this.loadUser.bind(this);
    }

    loadUser() {
        fetchUserById(window.localStorage.getItem("profileId"))
            .then((res) => {
                //console.log(res);
                let user = res;
                this.setState({
                    id: user.id,
                    row:user,
                    profile:user.profile,
                    astroProfile:user.astroProfile,
                    familyProfile:user.familyProfile,
                    careerProfile:user.careerProfile,
                    partnerPreference:user.partnerPreference
                })
            });
    }

    componentDidMount() {
		this.loadCurrentlyLoggedInUser();
		this.loadUser();
    }

    loadCurrentlyLoggedInUser() {
		getCurrentUser()
		.then(response => {
		  this.setState({
			currentuser: response,
			authenticated: true,
            loading: false
          });
          
		}).catch(error => {
		  this.setState({
			loading: false
		  });  
		});    
      }

      editUser(id) {
        window.localStorage.setItem("profileId", id);
        //this.props.history.push('/viewProfile');
        window.location.reload(false);
        } 

    render() {	
        return (
            <React.Fragment>
                
<div className="grid_3">
  <div className="container">
   <div className="breadcrumb1">
     <ul>
        <a href="index.html"><i className="fa fa-home home_1"></i></a>
        <span className="divider">&nbsp;|&nbsp;</span>
        <li className="current-page">View Profile</li>
     </ul>
   </div>
   <div className="profile">
   	 <div className="col-md-8 profile_left">
        <h2>Profile Id : {this.state.row.id}</h2>
   	 	<div className="col_3">
   	        <div className="col-sm-4 row_2">
				<div className="flexslider">
					 <ul className="slides">
						<li data-thumb="images/p1.jpg">
							<img src="images/p1.jpg" />
						</li>
						<li data-thumb="images/p2.jpg">
							<img src="images/p2.jpg" />
						</li>
						<li data-thumb="images/p3.jpg">
							<img src="images/p3.jpg" />
						</li>
						<li data-thumb="images/p4.jpg">
							<img src="images/p4.jpg" />
						</li>
					 </ul>
				  </div>
			</div>
			<div className="col-sm-8 row_1">
				<table className="table_working_hours">
		        	<tbody>
		        		<tr className="opened_1">
							<td className="day_label">Age / Height :</td>
                            <td className="day_value">{this.state.profile.age}, {this.state.profile.height}</td>
						</tr>
					    <tr className="opened">
							<td className="day_label">Last Login :</td>
							<td className="day_value">4 hours ago</td>
						</tr>
					    <tr className="opened">
							<td className="day_label">Religion :</td>
                            <td className="day_value">{this.state.profile.religion}</td>
						</tr>
					    <tr className="opened">
							<td className="day_label">Marital Status :</td>
                            <td className="day_value">{this.state.profile.maritalStatus}</td>
						</tr>
					    <tr className="opened">
							<td className="day_label">Location :</td>
                            <td className="day_value">{this.state.profile.location}</td>
						</tr>
					    <tr className="closed">
							<td className="day_label">Profile Created by :</td>
							<td className="day_value closed"><span>{this.state.profile.createdby}</span></td>
						</tr>
					    <tr className="closed">
							<td className="day_label">Education :</td>
							<td className="day_value closed"><span>{this.state.careerProfile.education}</span></td>
						</tr>
				    </tbody>
				</table>
				{/* <ul className="login_details">
			      <li>Already a member? <a href="login.html">Login Now</a></li>
			      <li>If not a member? <a href="register.html">Register Now</a></li>
			    </ul> */}
			</div>
			<div className="clearfix"> </div>
		</div>
		<div className="col_4">
		    <div className="bs-example bs-example-tabs" role="tabpanel" data-example-id="togglable-tabs">
			   <ul id="myTab" className="nav nav-tabs nav-tabs1" role="tablist">
				  <li role="presentation" className="active"><a href="#home" id="home-tab" role="tab" data-toggle="tab" aria-controls="home" aria-expanded="true">About Myself</a></li>
				  <li role="presentation"><a href="#profile" role="tab" id="profile-tab" data-toggle="tab" aria-controls="profile">Family Details</a></li>
				  <li role="presentation"><a href="#profile1" role="tab" id="profile-tab1" data-toggle="tab" aria-controls="profile1">Partner Preference</a></li>
			   </ul>
			   <div id="myTabContent" className="tab-content">
				  <div role="tabpanel" className="tab-pane fade in active" id="home" aria-labelledby="home-tab">
				    <div className="tab_box">
				    	<h1>{this.state.row.name}</h1>
				    	<p>{this.state.profile.about}</p>
				    </div>
				    <div className="basic_1">
				    	<h3>Basics & Lifestyle</h3>
				    	<div className="col-md-6 basic_1-left">
				    	  <table className="table_working_hours">
				        	<tbody>
				        		<tr className="opened_1">
									<td className="day_label">Name :</td>
									<td className="day_value">{this.state.row.name}</td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Marital Status :</td>
									<td className="day_value">{this.state.profile.maritalStatus}</td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Body Type :</td>
									<td className="day_value">{this.state.profile.bodyType}</td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Height :</td>
									<td className="day_value">{this.state.profile.age}, {this.state.profile.height}</td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Physical Status :</td>
									<td className="day_value closed"><span>{this.state.profile.physicalStatus}</span></td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Profile Created by :</td>
									<td className="day_value closed"><span>{this.state.profile.createdby}</span></td>
								</tr>
								<tr className="opened">
									<td className="day_label">Drink :</td>
									<td className="day_value closed"><span>{this.state.profile.drink?"Yes":"No"}</span></td>
								</tr>
						    </tbody>
				          </table>
				         </div>
				         <div className="col-md-6 basic_1-left">
				          <table className="table_working_hours">
				        	<tbody>
				        		<tr className="opened_1">
									<td className="day_label">Age :</td>
									<td className="day_value">{this.state.profile.age} Years</td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Mother Tongue :</td>
									<td className="day_value">{this.state.profile.motherToung}</td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Complexion :</td>
									<td className="day_value">{this.state.profile.complexion}</td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Weight :</td>
									<td className="day_value">{this.state.profile.weight} Kgs</td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Blood Group :</td>
									<td className="day_value">{this.state.profile.bloodGroup}</td>
								</tr>
							    <tr className="closed">
									<td className="day_label">Diet :</td>
									<td className="day_value closed"><span>{this.state.profile.diet}</span></td>
								</tr>
							    <tr className="closed">
									<td className="day_label">Smoke :</td>
									<td className="day_value closed"><span>{this.state.profile.smoke?"Yes":"No"}</span></td>
								</tr>
						    </tbody>
				        </table>
				        </div>
				        <div className="clearfix"> </div>
				    </div>
				    <div className="basic_1">
				    	<h3>Religious / Social & Astro Background</h3>
				    	<div className="col-md-6 basic_1-left">
				    	  <table className="table_working_hours">
				        	<tbody>
				        		<tr className="opened">
									<td className="day_label">Time of Birth :</td>
									<td className="day_value">{this.state.astroProfile.timeOfBirth}</td>
								</tr>
				        		<tr className="opened">
									<td className="day_label">Caste :</td>
									<td className="day_value">{this.state.astroProfile.caste}</td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Date of Birth :</td>
									<td className="day_value closed"><span>{this.state.astroProfile.dateOfBirth}</span></td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Place of Birth :</td>
									<td className="day_value closed"><span>{this.state.astroProfile.placeOfBirth}</span></td>
								</tr>
							 </tbody>
				          </table>
				         </div>
				         <div className="col-md-6 basic_1-left">
				          <table className="table_working_hours">
				        	<tbody>
				        		<tr className="opened_1">
									<td className="day_label">Religion :</td>
									<td className="day_value">{this.state.profile.religion}</td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Sub Caste :</td>
									<td className="day_value">{this.state.astroProfile.subCaste}</td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Raasi :</td>
									<td className="day_value">{this.state.astroProfile.raasi}</td>
								</tr>
							</tbody>
				        </table>
				        </div>
				        <div className="clearfix"> </div>
				    </div>
				    <div className="basic_1 basic_2">
				    	<h3>Education & Career</h3>
				    	<div className="basic_1-left">
				    	  <table className="table_working_hours">
				        	<tbody>
				        		<tr className="opened">
									<td className="day_label">Education   :</td>
									<td className="day_value">{this.state.careerProfile.education}</td>
								</tr>
				        		<tr className="opened">
									<td className="day_label">Education Detail :</td>
									<td className="day_value">{this.state.careerProfile.educationDetails}</td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Occupation Detail :</td>
                                    <td className="day_value closed"><span>{this.state.careerProfile.occupation}</span></td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Annual Income :</td>
									<td className="day_value closed"><span>Rs.{this.state.careerProfile.annualIncome}</span></td>
								</tr>
							 </tbody>
				          </table>
				         </div>
				         <div className="clearfix"> </div>
				    </div>
				  </div>
				  <div role="tabpanel" className="tab-pane fade" id="profile" aria-labelledby="profile-tab">
				    <div className="basic_3">
				    	<h4>Family Details</h4>
				    	<div className="basic_1 basic_2">
				    	<h3>Basics</h3>
				    	<div className="col-md-6 basic_1-left">
				    	  <table className="table_working_hours">
				        	<tbody>
				        		<tr className="opened">
									<td className="day_label">Father's Occupation :</td>
									<td className="day_value">{this.state.familyProfile.occupationFather}</td>
								</tr>
				        		<tr className="opened">
									<td className="day_label">Mother's Occupation :</td>
									<td className="day_value">{this.state.familyProfile.occupationMother}</td>
								</tr>
							    <tr className="opened">
									<td className="day_label">No. of Brothers :</td>
									<td className="day_value closed"><span>{this.state.familyProfile.numOfBrother}</span></td>
								</tr>
							    <tr className="opened">
									<td className="day_label">No. of Sisters :</td>
									<td className="day_value closed"><span>{this.state.familyProfile.numOfSister}</span></td>
								</tr>
							 </tbody>
				          </table>
				         </div>
				       </div>
				    </div>
				 </div>
				 <div role="tabpanel" className="tab-pane fade" id="profile1" aria-labelledby="profile-tab1">
				    <div className="basic_1 basic_2">
				       <div className="basic_1-left">
				    	  <table className="table_working_hours">
				        	<tbody>
				        		<tr className="opened">
									<td className="day_label">Age   :</td>
									<td className="day_value">{this.state.partnerPreference.age}</td>
								</tr>
				        		<tr className="opened">
									<td className="day_label">Marital Status :</td>
									<td className="day_value">{this.state.partnerPreference.maritalStatus}</td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Body Type :</td>
									<td className="day_value closed"><span>{this.state.partnerPreference.bodyType}</span></td>
								</tr>
							    <tr className="opened">
									<td className="day_label">Complexion :</td>
									<td className="day_value closed"><span>{this.state.partnerPreference.complexion}</span></td>
								</tr>
								<tr className="opened">
									<td className="day_label">Height 5ft 9 in / 175cm :</td>
									<td className="day_value closed"><span>{this.state.partnerPreference.height}</span></td>
								</tr>
								<tr className="opened">
									<td className="day_label">Diet :</td>
									<td className="day_value closed"><span>{this.state.partnerPreference.diet}</span></td>
								</tr>
								<tr className="opened">
									<td className="day_label">Kujadosham / Manglik :</td>
									<td className="day_value closed"><span>{this.state.partnerPreference.manglik?"Yes":"No"}</span></td>
								</tr>
								<tr className="opened">
									<td className="day_label">Religion :</td>
									<td className="day_value closed"><span>{this.state.partnerPreference.religion}</span></td>
								</tr>
								<tr className="opened">
									<td className="day_label">Caste :</td>
									<td className="day_value closed"><span>{this.state.partnerPreference.caste}</span></td>
								</tr>
								<tr className="opened">
									<td className="day_label">Mother Tongue :</td>
									<td className="day_value closed"><span>{this.state.partnerPreference.motherTounge}</span></td>
								</tr>
								<tr className="opened">
									<td className="day_label">Education :</td>
									<td className="day_value closed"><span>{this.state.partnerPreference.education}</span></td>
								</tr>
								<tr className="opened">
									<td className="day_label">Occupation :</td>
									<td className="day_value closed"><span>{this.state.partnerPreference.occupation}</span></td>
								</tr>
								<tr className="opened">
									<td className="day_label">Country of Residence :</td>
									<td className="day_value closed"><span>{this.state.partnerPreference.locationOfHome}</span></td>
								</tr>
								<tr className="opened">
									<td className="day_label">State :</td>
									<td className="day_value closed"><span>{this.state.partnerPreference.state}</span></td>
								</tr>
								<tr className="opened">
									<td className="day_label">Residency Status :</td>
									<td className="day_value closed"><span>{this.state.partnerPreference.residencyStatus}</span></td>
								</tr>
							 </tbody>
				          </table>
				        </div>
				     </div>
				 </div>
		     </div>
		  </div>
	   </div>
   	 </div>
     <div className="col-md-4 profile_right">
     	<div className="newsletter">
		   {/* <form>
			  <input type="text" name="ne" size="30" required="required" placeholder="Enter Profile ID :" />
			  <a onClick={() => this.editUser(document.getElementsByName("ne").value)} type="Submit">Go</a>
		   </form> */}
        </div>
        <div className="view_profile">
        	<h3>View Similar Profiles</h3>
        	<ul className="profile_item">
        	  <a href="#">
        	   <li className="profile_item-img">
        	   	  <img src="images/p5.jpg" className="img-responsive" alt=""/>
        	   </li>
        	   <li className="profile_item-desc">
        	   	  <h4>2458741</h4>
        	   	  <p>29 Yrs, 5Ft 5in Christian</p>
        	   	  <h5>View Full Profile</h5>
        	   </li>
        	   <div className="clearfix"> </div>
        	  </a>
           </ul>
           <ul className="profile_item">
        	  <a href="#">
        	   <li className="profile_item-img">
        	   	  <img src="images/p6.jpg" className="img-responsive" alt=""/>
        	   </li>
        	   <li className="profile_item-desc">
        	   	  <h4>2458741</h4>
        	   	  <p>29 Yrs, 5Ft 5in Christian</p>
        	   	  <h5>View Full Profile</h5>
        	   </li>
        	   <div className="clearfix"> </div>
        	  </a>
           </ul>
           <ul className="profile_item">
        	  <a href="#">
        	   <li className="profile_item-img">
        	   	  <img src="images/p7.jpg" className="img-responsive" alt=""/>
        	   </li>
        	   <li className="profile_item-desc">
        	   	  <h4>2458741</h4>
        	   	  <p>29 Yrs, 5Ft 5in Christian</p>
        	   	  <h5>View Full Profile</h5>
        	   </li>
        	   <div className="clearfix"> </div>
        	  </a>
           </ul>
           <ul className="profile_item">
        	  <a href="#">
        	   <li className="profile_item-img">
        	   	  <img src="images/p8.jpg" className="img-responsive" alt=""/>
        	   </li>
        	   <li className="profile_item-desc">
        	   	  <h4>2458741</h4>
        	   	  <p>29 Yrs, 5Ft 5in Christian</p>
        	   	  <h5>View Full Profile</h5>
        	   </li>
        	   <div className="clearfix"> </div>
        	  </a>
           </ul>
       </div>
       <div className="view_profile view_profile1">
        	<h3>Members who viewed this profile also viewed</h3>
        	<ul className="profile_item">
        	  <a href="#">
        	   <li className="profile_item-img">
        	   	  <img src="images/p9.jpg" className="img-responsive" alt=""/>
        	   </li>
        	   <li className="profile_item-desc">
        	   	  <h4>2458741</h4>
        	   	  <p>29 Yrs, 5Ft 5in Christian</p>
        	   	  <h5>View Full Profile</h5>
        	   </li>
        	   <div className="clearfix"> </div>
        	  </a>
           </ul>
           <ul className="profile_item">
        	  <a href="#">
        	   <li className="profile_item-img">
        	   	  <img src="images/p10.jpg" className="img-responsive" alt=""/>
        	   </li>
        	   <li className="profile_item-desc">
        	   	  <h4>2458741</h4>
        	   	  <p>29 Yrs, 5Ft 5in Christian</p>
        	   	  <h5>View Full Profile</h5>
        	   </li>
        	   <div className="clearfix"> </div>
        	  </a>
           </ul>
           <ul className="profile_item">
        	  <a href="#">
        	   <li className="profile_item-img">
        	   	  <img src="images/p11.jpg" className="img-responsive" alt=""/>
        	   </li>
        	   <li className="profile_item-desc">
        	   	  <h4>2458741</h4>
        	   	  <p>29 Yrs, 5Ft 5in Christian</p>
        	   	  <h5>View Full Profile</h5>
        	   </li>
        	   <div className="clearfix"> </div>
        	  </a>
           </ul>
           <ul className="profile_item">
        	  <a href="#">
        	   <li className="profile_item-img">
        	   	  <img src="images/p12.jpg" className="img-responsive" alt=""/>
        	   </li>
        	   <li className="profile_item-desc">
        	   	  <h4>2458741</h4>
        	   	  <p>29 Yrs, 5Ft 5in Christian</p>
        	   	  <h5>View Full Profile</h5>
        	   </li>
        	   <div className="clearfix"> </div>
        	  </a>
           </ul>
         </div>
        </div>
       <div className="clearfix"> </div>
    </div>
  </div>
</div>
            </React.Fragment>
        )
    }    

}

export default ViewProfile;










