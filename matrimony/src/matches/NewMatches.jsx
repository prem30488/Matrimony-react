import React, {Component} from 'react';
//import solrReducer from "./solr-reducer";
import {fetchSolrEntitiesDesc,fetchByMaritalStatus,fetchByMotherTounge,
	fetchByEducation, fetchByOccupation,fetchByPhysicalStatus,fetchByDiet,
	fetchBySmoke, fetchByDrink,
	getCurrentUser,fetchWeeklyCount,
	getDistinctMaritalStatus, getDistinctMotherTounge,
	getWeeklyEntities,getMonthlyEntities,findByImageUrl, view,
	fetchMonthlyCount,countwithImage, shortlist,unshortlist,sendInterestTo,
	getDistinctEducation, getDistinctOccupation,getDistinctPhysicalStatus,
	getDistinctDiet, getDistinctSmoke, getDistinctDrink
} from '../util/APIUtils';
import TablePagination from '@material-ui/core/TablePagination';
import AppFooter from "../common/AppFooter";
import Alert from 'react-s-alert';
class NewMatches extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            users:[],
            page:0,
			rowsPerPage:10,
			count:0,
			weekly:0,
			monthly:0,
			photoCount:0,
			maritalStatusList : [],
			motherToungeList : [],
			educationList : [],
			occupationList : [],
			physicalStatusList: [],
			dietList : [],
			smokeList : [],
			drinkList : [],
			alreadyViewed : false,
			alreadyShortlisted: false,
			withPhotoOnly:false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.reloadUserList = this.reloadUserList.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
		this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
		this.shortlistUser = this.shortlistUser.bind(this);
		this.viewUser = this.viewUser.bind(this);
		this.unshortlistUser = this.unshortlistUser.bind(this);
		this.sendInterest = this.sendInterest.bind(this);
		this.setWeeklyUsers = this.setWeeklyUsers.bind(this);
		this.setMonthlyUsers = this.setMonthlyUsers.bind(this);
		this.findByImage = this.findByImage.bind(this);
		
		this.fetchDistinctMaritalStatus = this.fetchDistinctMaritalStatus.bind(this);
		this.findByMaritalStatus = this.findByMaritalStatus.bind(this);
		this.fetchDistinctMotherTounge = this.fetchDistinctMotherTounge.bind(this);
		this.findByMotherTounge = this.findByMotherTounge.bind(this);
		this.fetchDistinctEducation = this.fetchDistinctEducation.bind(this);
		this.findByEducation = this.findByEducation.bind(this);
		this.fetchDistinctOccupation = this.fetchDistinctOccupation.bind(this);
		this.findByOccupation = this.findByOccupation.bind(this);
		this.fetchDistinctPhysicalStatus = this.fetchDistinctPhysicalStatus.bind(this);
		this.findByPhysicalStatus = this.findByPhysicalStatus.bind(this);
		this.fetchDistinctDiet = this.fetchDistinctDiet.bind(this);
		this.findByDiet = this.findByDiet.bind(this);
		this.fetchDistinctSmoke = this.fetchDistinctSmoke.bind(this);
		this.findBySmoke = this.findBySmoke.bind(this);
		this.fetchDistinctDrink = this.fetchDistinctDrink.bind(this);
		this.findByDrink = this.findByDrink.bind(this);

		this.reloadUserList();
		this.fetchDistinctMaritalStatus();
		this.fetchDistinctMotherTounge();
		this.fetchDistinctEducation();
		this.fetchDistinctOccupation();
		this.fetchDistinctPhysicalStatus();
		this.fetchDistinctDiet();
		this.fetchDistinctSmoke();
		this.fetchDistinctDrink();
	}

	toggleChange = () => {
		this.setState({
		  alreadyViewed: !this.state.alreadyViewed,
		});
		this.reloadUserList();
	  }

	  toggleChange2 = () => {
		this.setState({
		  alreadyShortlisted: !this.state.alreadyShortlisted,
		});
		this.reloadUserList();
	  }

	  toggleChange3 = () => {
		this.setState({
		  withPhotoOnly: !this.state.withPhotoOnly,
		});
		this.reloadUserList();
	  }

	fetchDistinctMaritalStatus(){
		getDistinctMaritalStatus()
		.then((resDistinctMaritalStatus) => {
			this.setState({
				maritalStatusList:resDistinctMaritalStatus.data
			});
		});
	}

	fetchDistinctMotherTounge(){
		getDistinctMotherTounge()
		.then((resDistinctMotherTounge) => {
			this.setState({
				motherToungeList:resDistinctMotherTounge.data
			});
		});
	}
	
	fetchDistinctEducation(){
		getDistinctEducation()
		.then((resDistinctEducation) => {
			this.setState({
				educationList:resDistinctEducation.data
			});
		});
	}

	fetchDistinctOccupation(){
		getDistinctOccupation()
		.then((resDistinctOccupation) => {
			this.setState({
				occupationList:resDistinctOccupation.data
			});
		});
	}

	fetchDistinctPhysicalStatus(){
		getDistinctPhysicalStatus()
		.then((resDistinctPhysicalStatus) => {
			this.setState({
				physicalStatusList:resDistinctPhysicalStatus.data
			});
		});
	}

	fetchDistinctDiet(){
		getDistinctDiet()
		.then((resDistinctDiet) => {
			this.setState({
				dietList:resDistinctDiet.data
			});
		});
	}

	fetchDistinctSmoke(){
		getDistinctSmoke()
		.then((resDistinctSmoke) => {
			this.setState({
				smokeList:resDistinctSmoke.data
			});
		});
	}

	fetchDistinctDrink(){
		getDistinctDrink()
		.then((resDistinctDrink) => {
			this.setState({
				drinkList:resDistinctDrink.data
			});
		});
	}

	setWeeklyUsers(e){
		e.preventDefault();
		getWeeklyEntities(this.state.page,this.state.rowsPerPage,'id')
			.then((resWeeklyUsers) => {
				//console.log("weekly :" ,JSON.stringify(resWeeklyUsers));
				this.setState({
					users:resWeeklyUsers.data,
					count: resWeeklyUsers.length,
					page:0,
					rowsPerPage:5
				});
				if(resWeeklyUsers.length){
					this.setState({
						weekly: resWeeklyUsers.length
					});
				}else{
					this.setState({
						weekly: 0
					});
				}
			});
	}

	setMonthlyUsers(e){
		e.preventDefault();
		getMonthlyEntities(this.state.page,this.state.rowsPerPage,'id')
			.then((resMonthlyUsers) => {
				//console.log("weekly :" ,JSON.stringify(res));
				this.setState({
					users:resMonthlyUsers.data,
					count: resMonthlyUsers.length,
					page:0,
					rowsPerPage:5
				});
				
				if(resMonthlyUsers.length){
					this.setState({
						monthly: resMonthlyUsers.length
					});
				}else{
					this.setState({
						monthly: 0
					});
				}
			});
	}

	findByImage(e){
		e.preventDefault();
		findByImageUrl(this.state.page,this.state.rowsPerPage,'id')
			.then((resUsersWithPhoto) => {
				//console.log("image url :" ,JSON.stringify(resUsersWithPhoto));
				this.setState({
					users:resUsersWithPhoto.data,
					count: resUsersWithPhoto.length,
					page:0,
					rowsPerPage:5,
				});
			});
		
	}

	findByMaritalStatus(selectedMaritalStatus){
		//e.preventDefault();
		fetchByMaritalStatus(selectedMaritalStatus,this.state.page,this.state.rowsPerPage,'id')
		.then((resMaritalStatus) => {
			//console.log(JSON.stringify(resMaritalStatus));
			this.setState({
				users:resMaritalStatus.content,
				count: resMaritalStatus.totalElements
			});
		});
	}

	findByMotherTounge(selectedMotherTounge){
		//e.preventDefault();
		fetchByMotherTounge(selectedMotherTounge,this.state.page,this.state.rowsPerPage,'id')
		.then((resMotherTounge) => {
			//console.log(JSON.stringify(resMotherTounge));
			this.setState({
				users:resMotherTounge.content,
				count: resMotherTounge.totalElements
			});
		});
	}

	findByEducation(selectedEducation){
		//e.preventDefault();
		fetchByEducation(selectedEducation,this.state.page,this.state.rowsPerPage,'id')
		.then((resEducation) => {
			//console.log(JSON.stringify(resMotherTounge));
			this.setState({
				users:resEducation.content,
				count: resEducation.totalElements
			});
		});
	}

	findByOccupation(selectedOccupation){
		//e.preventDefault();
		fetchByOccupation(selectedOccupation,this.state.page,this.state.rowsPerPage,'id')
		.then((resOccupation) => {
			//console.log(JSON.stringify(resMotherTounge));
			this.setState({
				users:resOccupation.content,
				count: resOccupation.totalElements
			});
		});
	}

	findByPhysicalStatus(selectedPhysicalStatus){
		//e.preventDefault();
		fetchByPhysicalStatus(selectedPhysicalStatus,this.state.page,this.state.rowsPerPage,'id')
		.then((resPhysicalStatus) => {
			//console.log(JSON.stringify(resMotherTounge));
			this.setState({
				users: resPhysicalStatus.content,
				count: resPhysicalStatus.totalElements
			});
		});
	}

	findByDiet(selectedDiet){
		//e.preventDefault();
		fetchByDiet(selectedDiet,this.state.page,this.state.rowsPerPage,'id')
		.then((resDiet) => {
			//console.log(JSON.stringify(resMotherTounge));
			this.setState({
				users: resDiet.content,
				count: resDiet.totalElements
			});
		});
	}

	findBySmoke(selectedSmoke){
		//e.preventDefault();
		fetchBySmoke(selectedSmoke,this.state.page,this.state.rowsPerPage,'id')
		.then((resSmoke) => {
			//console.log(JSON.stringify(resMotherTounge));
			this.setState({
				users: resSmoke.content,
				count: resSmoke.totalElements
			});
		});
	}

	findByDrink(selectedDrink){
		//e.preventDefault();
		fetchByDrink(selectedDrink,this.state.page,this.state.rowsPerPage,'id')
		.then((resDrink) => {
			//console.log(JSON.stringify(resMotherTounge));
			this.setState({
				users: resDrink.content,
				count: resDrink.totalElements
			});
		});
	}

	shortlistUser(e,id){ 
		shortlist(id);
		Alert.success("Profile shortlisted Successfully!");
		//e.parentNode.removeChild(e);
		setTimeout(function(){
			window.location.reload(1);
		 }, 3000);
	 } 

	 viewUser(e,id){ 
		view(id);
		Alert.success("Profile view in progress!");
		window.localStorage.setItem("profileId", id);
        this.props.history.push('/viewProfile');
		//Alert.success("Profile shortlisted Successfully!");
		//e.parentNode.removeChild(e);
		// setTimeout(function(){
		// 	window.location.reload(1);
		//  }, 3000);
	 } 
	 
	 unshortlistUser(e,id) { 
		unshortlist(id);
		Alert.success("Profile unshortlisted Successfully!");
		setTimeout(function(){
			window.location.reload(1);
		 }, 3000);
	 } 

	 sendInterest(e,id){ 
		sendInterestTo(id);
		Alert.success("Interest sent Successfully!");
		setTimeout(function(){
			window.location.reload(1);
		 }, 3000);
	 }

	setPage(page){
        //console.log('setpage called',page);
        this.setState({
            page: page
      });
      this.reloadUserList();
    }

    setRowsPerPage(rowsPerPage){
        //console.log('setRowsPerPage called',rowsPerPage);
        this.setState({
            rowsPerPage: rowsPerPage
      });
      this.reloadUserList();
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
	
    componentDidMount() {
		this.loadCurrentlyLoggedInUser();
		//this.reloadUserList();
    }
       
    reloadUserList() {
        fetchSolrEntitiesDesc(this.state.page,this.state.rowsPerPage)
            .then((res) => {
                //console.log(JSON.stringify(res.content));
                
                this.setState({
					users:res.content,
					count: res.totalElements
                });
            });
			// fetchWeeklyCount()    
			// .then((resWeeklyUsers) => {
			// 	this.setState({
			// 		weekly:resWeeklyUsers
			// 	});
			// });

			// fetchMonthlyCount()    
			// .then((resMonthlyUsersCount) => {
			// 	this.setState({
			// 		monthly:resMonthlyUsersCount
			// 	});
			// });

			countwithImage()
			.then((res)=> {
				this.setState({
					photoCount:res
				});
			});
    }
	
	handleChangePage = (event, newPage) => {
        this.setPage(newPage);
      };

      handleChangeRowsPerPage = event => {
        this.setRowsPerPage(parseInt(event.target.value, 10));
        this.setPage(0);
      };

      componentDidUpdate() {
        //this.reloadUserList();
        //console.log(JSON.stringify(this.state.users));
      }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        //this.setState({
        //    [inputName] : inputValue
        //});        
    }

	editUser(id) {
        window.localStorage.setItem("profileId", id);
        this.props.history.push('/viewProfile');
    }    

    handleSubmit(event) {
        event.preventDefault();   

        const profileRequest = Object.assign({}, this.state);
       
        console.log('profileRequest :' , profileRequest);
        // updateAstroProfile(profileRequest)
        // .then(response => {
        //    console.log('success!');
           
        // }).catch(error => {
        //    Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        // });
        Alert.success("Profile Updated Successfully!");
    }


  render() {
	
    return (
        <React.Fragment>
            
            <div className="grid_3">
  <div className="container">
   <div className="breadcrumb1">
     <ul>
        <a href="/"><i className="fa fa-home home_1"></i></a>
        <span className="divider">&nbsp;|&nbsp;</span>
        <li className="current-page">New Matches</li>
     </ul>
   </div>
   <div className="col-md-9 profile_left2">
     
	  <div className="form_but2">
		<label className="col-md-2 control-lable1" htmlFor="sex">Don't Show : </label>
		<div className="col-md-10 form_radios">
			<input type="checkbox" className="radio_1" 
			checked={this.state.alreadyViewed}
			onChange={this.toggleChange}
			/> Don't show already viewed &nbsp;&nbsp;&nbsp;
			<input type="checkbox" className="radio_1" 
			checked={this.state.alreadyShortlisted}
			onChange={this.toggleChange2}
			/> Don't show already shortlisted &nbsp;&nbsp;&nbsp;
			<input type="checkbox" className="radio_1" 
			checked={this.state.withPhotoOnly}
			onChange={this.toggleChange3}
			/> Only show profiles with photo
		</div>
		<div className="clearfix"> </div>
	  </div>
	  {this.state.users.map(row => (
		  (this.state.alreadyViewed && row.isViewed ) || (this.state.alreadyShortlisted && row.isShortlisted )
		 || (this.state.withPhotoOnly && row.image_url!='') 
		  ?<div></div>:
                            <div className="profile_top" key={row.id}><a href="#">
      <h2>{row.id} | Profile Created by {row.profileCreatedBy}</h2>
	    <div className="col-sm-3 profile_left-top">
	    	<img src={`images/${row.id}.jpg`} className="img-responsive" alt=""/>
	    </div>
	    <div className="col-sm-3">
	      <ul className="login_details1">
			 <li>Last Login : 1 hours ago</li>
			 <li><p>{row.about}</p></li>
		  </ul>
	    </div>
	    <div className="col-sm-6">
	    	<table className="table_working_hours">
	        	<tbody>
					<tr className="opened_1">
						<td className="day_label1">Name :</td>
						<td className="day_value"><a onClick={() => this.editUser(row.id)}>{row.name}</a></td>
					</tr>
	        		<tr className="opened_1">
						<td className="day_label1">Age / Height :</td>
						<td className="day_value">{row.age}</td>
					</tr>
				    <tr className="opened">
						<td className="day_label1">Last Login :</td>
						<td className="day_value">1 hours ago</td>
					</tr>
				    <tr className="opened">
						<td className="day_label1">Religion :</td>
						<td className="day_value">{row.religion}</td>
					</tr>
				    <tr className="opened">
						<td className="day_label1">Marital Status :</td>
	  					<td className="day_value">{row.maritalStatus}</td>
					</tr>
				    <tr className="opened">
						<td className="day_label1">Location :</td>
						<td className="day_value">{row.locationOfHome}</td>
					</tr>
				    <tr className="closed">
						<td className="day_label1">Profile Created by :</td>
						<td className="day_value closed"><span>{row.profileCreatedBy}</span></td>
					</tr>
				    <tr className="closed">
						<td className="day_label1">Education :</td>
						<td className="day_value closed"><span>{row.education}</span></td>
					</tr>
					<tr className="closed">
						<td className="day_label1">Occupation :</td>
						<td className="day_value closed"><span>{row.occupation}</span></td>
					</tr>
			    </tbody>
		   </table>
		   <div className='buttons' >
			   <div className="vertical">
				   <a href={`mailto:${row.email}?subject=Matrimony&body=Hi`} style={{color:"#fff"}}>
					Send Mail
					</a>
				</div>
			   {
			   row.isShortlisted?
			   <div className="vertical" onClick={e => this.unshortlistUser(e,row.id)}>
			   Unshortlist
			    </div>
			   :
			   <div className="vertical" onClick={e => this.shortlistUser(e,row.id)}>
			   Shortlist
			    </div>
			   }
			   <div className="vertical" onClick={e => this.sendInterest(e,row.id)}>Send Interest</div>
			   {
			   row.isViewed?
			   <div className="vertical" onClick={e => this.viewUser(e,row.id)}>
			   Already Viewed
			    </div>
			   :
			   <div className="vertical" onClick={e => this.viewUser(e,row.id)}>
			   View User
			    </div>
			   }
		   </div>
	    </div>
	    <div className="clearfix"> </div>
    </a></div>
	

                        ))}
						 <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={this.state.count}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
  </div>
  <div className="col-md-3 match_right">
    <ul className="menu">
		<li className="item1"><h3 className="m_2">Show Profiles Created</h3>
		  <ul className="cute">
			<li className="subitem1"><a href="javascript:void(0)" onClick={this.setWeeklyUsers}>within a week ({this.state.weekly}) </a></li>
			<li className="subitem2"><a href="javascript:void(0)" onClick={this.setMonthlyUsers}>within a month ({this.state.monthly})</a></li>
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Profile type</h3>
		  <ul className="cute">
			<li className="subitem1"><a href="javascript:void(0)" onClick={this.findByImage}>with Photo ({this.state.photoCount}) </a></li>
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Marital Status</h3>
		  <ul className="cute">
		  {Object.keys(this.state.maritalStatusList).map(keyOuter => {
        //return Object.keys(this.state.maritalStatusList[keyOuter]).map(keyInner => {
          return (
            <li className="subitem1" key={`${keyOuter}`}><a href="javascript:void(0)" 
			onClick={() => this.findByMaritalStatus(this.state.maritalStatusList[keyOuter][0])}
			>
				{this.state.maritalStatusList[keyOuter][0]} 
				&nbsp;({this.state.maritalStatusList[keyOuter][1]})</a></li>
          );
        
      })}
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Mother Tongue</h3>
		  <ul className="cute">
		  {Object.keys(this.state.motherToungeList).map(keyOuterMotherTounge => {
        //return Object.keys(this.state.maritalStatusList[keyOuter]).map(keyInner => {
          return (
            <li className="subitem1" key={`${keyOuterMotherTounge}`}><a href="javascript:void(0)" 
			onClick={() => this.findByMotherTounge(this.state.motherToungeList[keyOuterMotherTounge][0])}
			>
				{this.state.motherToungeList[keyOuterMotherTounge][0]} 
				&nbsp;({this.state.motherToungeList[keyOuterMotherTounge][1]})</a></li>
          );
        
      })}
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Education</h3>
		<ul className="cute">
		  {Object.keys(this.state.educationList).map(keyOuterEducation => {
        //return Object.keys(this.state.maritalStatusList[keyOuter]).map(keyInner => {
          return (
            <li className="subitem1" key={`${keyOuterEducation}`}><a href="javascript:void(0)" 
			onClick={() => this.findByEducation(this.state.educationList[keyOuterEducation][0])}
			>
				{this.state.educationList[keyOuterEducation][0]} 
				&nbsp;({this.state.educationList[keyOuterEducation][1]})</a></li>
          );
        
      })}
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Occupation</h3>
		<ul className="cute">
		  {Object.keys(this.state.occupationList).map(keyOuterOccupation => {
        //return Object.keys(this.state.maritalStatusList[keyOuter]).map(keyInner => {
          return (
            <li className="subitem1" key={`${keyOuterOccupation}`}><a href="javascript:void(0)" 
			onClick={() => this.findByOccupation(this.state.occupationList[keyOuterOccupation][0])}
			>
				{this.state.occupationList[keyOuterOccupation][0]} 
				&nbsp;({this.state.occupationList[keyOuterOccupation][1]})</a></li>
          );
        
      })}
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Physical Status</h3>
		<ul className="cute">
		  {Object.keys(this.state.physicalStatusList).map(keyOuterPhysicalStatus => {
        //return Object.keys(this.state.maritalStatusList[keyOuter]).map(keyInner => {
          return (
            <li className="subitem1" key={`${keyOuterPhysicalStatus}`}><a href="javascript:void(0)" 
			onClick={() => this.findByPhysicalStatus(this.state.physicalStatusList[keyOuterPhysicalStatus][0])}
			>
				{this.state.physicalStatusList[keyOuterPhysicalStatus][0]} 
				&nbsp;({this.state.physicalStatusList[keyOuterPhysicalStatus][1]})</a></li>
          );
        
      })}
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Eating Habits</h3>
		<ul className="cute">
		  {Object.keys(this.state.dietList).map(keyOuterDiet => {
        //return Object.keys(this.state.maritalStatusList[keyOuter]).map(keyInner => {
          return (
            <li className="subitem1" key={`${keyOuterDiet}`}><a href="javascript:void(0)" 
			onClick={() => this.findByDiet(this.state.dietList[keyOuterDiet][0])}
			>
				{this.state.dietList[keyOuterDiet][0]} 
				&nbsp;({this.state.dietList[keyOuterDiet][1]})</a></li>
          );
        
      })}
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Smoking</h3>
		<ul className="cute">
		  {Object.keys(this.state.smokeList).map(keyOuterSmoke => {
        //return Object.keys(this.state.maritalStatusList[keyOuter]).map(keyInner => {
          return (
            <li className="subitem1" key={`${keyOuterSmoke}`}><a href="javascript:void(0)" 
			onClick={() => this.findBySmoke(this.state.smokeList[keyOuterSmoke][0])}
			>
				{this.state.smokeList[keyOuterSmoke][0]?"Yes":"No"} 
				&nbsp;({this.state.smokeList[keyOuterSmoke][1]})</a></li>
          );
        
      })}
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Drinking</h3>
		<ul className="cute">
		  {Object.keys(this.state.drinkList).map(keyOuterDrink => {
        //return Object.keys(this.state.maritalStatusList[keyOuter]).map(keyInner => {
          return (
            <li className="subitem1" key={`${keyOuterDrink}`}><a href="javascript:void(0)" 
			onClick={() => this.findByDrink(this.state.drinkList[keyOuterDrink][0])}
			>
				{this.state.drinkList[keyOuterDrink][0]?"Yes":"No"} 
				&nbsp;({this.state.drinkList[keyOuterDrink][1]})</a></li>
          );
        
      })}
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Profile Created by</h3>
		  <ul className="cute">
			<li className="subitem1"><a href="#">Self</a></li>
		  </ul>
		</li>
	  </ul>
   </div>
   <div className="clearfix"> </div>
  </div>
</div>

<AppFooter/>
<Alert stack={{limit: 3}} 
          timeout = {5000}
          position='top-right' effect='slide' offset={65} />
        </React.Fragment>
    );
}
}


export default NewMatches;