import React, {Component} from 'react';
//import solrReducer from "./solr-reducer";
import {fetchSolrEntitiesDesc,fetchByMaritalStatus,getCurrentUser,fetchWeeklyCount,
	getDistinctMaritalStatus,
	getWeeklyEntities,getMonthlyEntities,findByImageUrlIsNotNullOrderById,
	fetchMonthlyCount,countwithImage, shortlist} from '../util/APIUtils';
import TablePagination from '@material-ui/core/TablePagination';
import AppFooter from "../common/AppFooter";
import Alert from 'react-s-alert';
class NewMatches extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            users:[],
            page:0,
			rowsPerPage:5,
			count:0,
			weekly:0,
			monthly:0,
			photoCount:0,
			maritalStatusList : []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.reloadUserList = this.reloadUserList.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
		this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
		this.shortlistUser = this.shortlistUser.bind(this);
		this.unshortlistUser = this.unshortlistUser.bind(this);
		this.setWeeklyUsers = this.setWeeklyUsers.bind(this);
		this.setMonthlyUsers = this.setMonthlyUsers.bind(this);
		this.findByImageUrlI1sNotNullOrderByIdDesc = this.findByImageUrlIsNotNullOrderByIdDesc.bind(this);
		this.fetchDistinctMaritalStatus = this.fetchDistinctMaritalStatus.bind(this);
		this.findByMaritalStatus = this.findByMaritalStatus.bind(this);
		this.reloadUserList();
		this.fetchDistinctMaritalStatus();
	}

	fetchDistinctMaritalStatus(){
		getDistinctMaritalStatus()
		.then((resDistinctMaritalStatus) => {
			this.setState({
				maritalStatusList:resDistinctMaritalStatus.data
			});
		});
	}
	
	setWeeklyUsers(e){
		e.preventDefault();
		getWeeklyEntities(this.state.page,this.state.rowsPerPage,'id')
			.then((resWeeklyUsers) => {
				//console.log("weekly :" ,JSON.stringify(res));
				this.setState({
					users:resWeeklyUsers,
					count: resWeeklyUsers.length,
					page:0,
					rowsPerPage:5
				});
			});
	}

	setMonthlyUsers(e){
		e.preventDefault();
		getMonthlyEntities(this.state.page,this.state.rowsPerPage,'id')
			.then((resMonthlyUsers) => {
				//console.log("weekly :" ,JSON.stringify(res));
				this.setState({
					users:resMonthlyUsers,
					count: resMonthlyUsers.length,
					page:0,
					rowsPerPage:5
				});
			});
	}

	findByImageUrlIsNotNullOrderByIdDesc(e){
		e.preventDefault();
		findByImageUrlIsNotNullOrderById(this.state.page,this.state.rowsPerPage,'id')
			.then((resUsersWithPhoto) => {
				this.setState({
					users:resUsersWithPhoto,
					count: resUsersWithPhoto.length
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
	shortlistUser(id){ 
		shortlist(id);
		Alert.success("Profile shortlisted Successfully!");
	 } 
	 
	 unshortlistUser(id) { 
		shortlist(id);
		Alert.success("Profile unshortlisted Successfully!");
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
			fetchWeeklyCount()    
			.then((resWeeklyUsers) => {
				this.setState({
					weekly:resWeeklyUsers
				});
			});

			fetchMonthlyCount()    
			.then((resMonthlyUsersCount) => {
				this.setState({
					monthly:resMonthlyUsersCount
				});
			});

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

        this.setState({
            [inputName] : inputValue
        });        
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
			<input type="checkbox" className="radio_1" /> Don't show already viewed &nbsp;&nbsp;&nbsp;
			<input type="checkbox" className="radio_1" checked="checked" /> Don't show already contacted &nbsp;&nbsp;&nbsp;
			<input type="checkbox" className="radio_1" checked="checked" /> Show profiles with photo
		</div>
		<div className="clearfix"> </div>
	  </div>
	  {this.state.users.map(row => (
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
			    </tbody>
		   </table>
		   <div className="buttons">
			   <div className="vertical">Send Mail</div>
			   <div className="vertical">
			   {row.isShortlisted?"Shortlisted":"Shortlist"}
			    </div>
			   <div className="vertical">Send Interest</div>
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
			<li className="subitem1"><a href="javascript:void(0)" onClick={this.findByImageUrlIsNotNullOrderByIdDesc}>with Photo ({this.state.photoCount}) </a></li>
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
				({this.state.maritalStatusList[keyOuter][1]})</a></li>
          );
        
      })}
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Mother Tongue</h3>
		  <ul className="cute">
			<li className="subitem1"><a href="#">English </a></li>
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Education</h3>
		  <ul className="cute">
			<li className="subitem1"><a href="#">Bachelors-Engineering </a></li>
			<li className="subitem1"><a href="#">Masters-Engineering </a></li>
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Occupation</h3>
		  <ul className="cute">
			<li className="subitem1"><a href="#">Engineer-Non IT (2) </a></li>
			<li className="subitem1"><a href="#">Software Professional (3)</a></li>
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Physical Status</h3>
		  <ul className="cute">
			<li className="subitem1"><a href="#">Normal (2) </a></li>
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Eating Habits</h3>
		  <ul className="cute">
			<li className="subitem1"><a href="#">Non Vegetarian (3)</a></li>
			<li className="subitem1"><a href="#">Vegetarian (2)</a></li>
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Smoking</h3>
		  <ul className="cute">
			<li className="subitem1"><a href="#">Not Specified (3)</a></li>
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Drinking</h3>
		  <ul className="cute">
			<li className="subitem1"><a href="#">Not Specified (3)</a></li>
			<li className="subitem1"><a href="#">Never Drinks (3)</a></li>
		  </ul>
		</li>
		<li className="item1"><h3 className="m_2">Profile Created by</h3>
		  <ul className="cute">
			<li className="subitem1"><a href="#">Self (1)</a></li>
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