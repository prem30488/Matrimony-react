import React, {Component} from 'react';
//import solrReducer from "./solr-reducer";
import {fetchSolrEntitiesShortlistedDesc,fetchByMaritalStatus,fetchByMotherTounge,
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
class Search extends Component {

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
        fetchSolrEntitiesShortlistedDesc(this.state.page,this.state.rowsPerPage)
            .then((res) => {
                //console.log(JSON.stringify(res.content));
                
                this.setState({
					users:res.content,
					count: res.totalElements
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
        <li className="current-page">Regular Search</li>
     </ul>
   </div>
   <div className="col-md-9 profile_left2">
     
	  <div className="form_but2">
		{/* <label className="col-md-2 control-lable1" htmlFor="sex">Don't Show : </label>
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
		</div> */}
		<div className="clearfix"> </div>
	  </div>
	  <form>	
   <div class="form_but1">
	<label class="col-sm-5 control-lable1" for="sex">Gender : </label>
	<div class="col-sm-7 form_radios">
		<input type="radio" class="radio_1" /> Male &nbsp;&nbsp;
		<input type="radio" class="radio_1" checked="checked" /> Female
		
		{/* <hr />
		<p id="sel"></p><br />
		<input id="btnRadio" type="button" value="Get Selected Value" /> */}
	</div>
	<div class="clearfix"> </div>
  </div>
  <div class="form_but1">
	<label class="col-sm-5 control-lable1" for="sex">Marital Status : </label>
	<div class="col-sm-7 form_radios">
		<input type="checkbox" class="radio_1" /> Single &nbsp;&nbsp;
		<input type="checkbox" class="radio_1" checked="checked" /> Divorced &nbsp;&nbsp;
		<input type="checkbox" class="radio_1" value="Cheese" /> Widowed &nbsp;&nbsp;
		<input type="checkbox" class="radio_1" value="Cheese" /> Separated &nbsp;&nbsp;
		<input type="checkbox" class="radio_1" value="Cheese" /> Any
	</div>
	<div class="clearfix"> </div>
  </div>
  <div class="form_but1">
    <label class="col-sm-5 control-lable1" for="sex">Country : </label>
    <div class="col-sm-7 form_radios">
      <div class="select-block1">
        <select>
            <option value="">Country</option>
            <option value="">Japan</option>
            <option value="">Kenya</option>
            <option value="">Dubai</option>
            <option value="">Italy</option>
            <option value="">Greece</option> 
            <option value="">Iceland</option> 
            <option value="">China</option> 
            <option value="">Doha</option> 
            <option value="">Irland</option> 
            <option value="">Srilanka</option> 
            <option value="">Russia</option> 
            <option value="">Hong Kong</option> 
            <option value="">Germany</option>
            <option value="">Canada</option>  
            <option value="">Mexico</option> 
            <option value="">Nepal</option>
            <option value="">Norway</option> 
            <option value="">Oman</option>
            <option value="">Pakistan</option>  
            <option value="">Kuwait</option> 
            <option value="">Indonesia</option>  
            <option value="">Spain</option>
            <option value="">Thailand</option>  
            <option value="">Saudi Arabia</option> 
            <option value="">Poland</option> 
        </select>
      </div>
    </div>
    <div class="clearfix"> </div>
  </div>
  <div class="form_but1">
    <label class="col-sm-5 control-lable1" for="sex">District / City : </label>
    <div class="col-sm-7 form_radios">
      <div class="select-block1">
        <select>
            <option value="">District / City</option>
            <option value="">Japan</option>
            <option value="">Kenya</option>
            <option value="">Dubai</option>
            <option value="">Italy</option>
            <option value="">Greece</option> 
            <option value="">Iceland</option> 
            <option value="">China</option> 
            <option value="">Doha</option> 
            <option value="">Irland</option> 
            <option value="">Srilanka</option> 
            <option value="">Russia</option> 
            <option value="">Hong Kong</option> 
            <option value="">Germany</option>
            <option value="">Canada</option>  
            <option value="">Mexico</option> 
            <option value="">Nepal</option>
            <option value="">Norway</option> 
            <option value="">Oman</option>
            <option value="">Pakistan</option>  
            <option value="">Kuwait</option> 
            <option value="">Indonesia</option>  
            <option value="">Spain</option>
            <option value="">Thailand</option>  
            <option value="">Saudi Arabia</option> 
            <option value="">Poland</option> 
        </select>
      </div>
    </div>
    <div class="clearfix"> </div>
  </div>
  <div class="form_but1">
    <label class="col-sm-5 control-lable1" for="sex">State : </label>
    <div class="col-sm-7 form_radios">
      <div class="select-block1">
        <select>
            <option value="">State</option>
            <option value="">Japan</option>
            <option value="">Kenya</option>
            <option value="">Dubai</option>
            <option value="">Italy</option>
            <option value="">Greece</option> 
            <option value="">Iceland</option> 
            <option value="">China</option> 
            <option value="">Doha</option> 
            <option value="">Irland</option> 
            <option value="">Srilanka</option> 
            <option value="">Russia</option> 
            <option value="">Hong Kong</option> 
            <option value="">Germany</option>
            <option value="">Canada</option>  
            <option value="">Mexico</option> 
            <option value="">Nepal</option>
            <option value="">Norway</option> 
            <option value="">Oman</option>
            <option value="">Pakistan</option>  
            <option value="">Kuwait</option> 
            <option value="">Indonesia</option>  
            <option value="">Spain</option>
            <option value="">Thailand</option>  
            <option value="">Saudi Arabia</option> 
            <option value="">Poland</option> 
        </select>
      </div>
    </div>
    <div class="clearfix"> </div>
  </div>
  <div class="form_but1">
    <label class="col-sm-5 control-lable1" for="sex">Religion : </label>
    <div class="col-sm-7 form_radios">
      <div class="select-block1">
        <select>
            <option value="">Hindu</option>
            <option value="">Sikh</option>
            <option value="">Jain-All</option>
            <option value="">Jain-Digambar</option>
            <option value="">Jain-Others</option>
            <option value="">Muslim-All</option> 
            <option value="">Muslim-Shia</option> 
            <option value="">Muslim-Sunni</option> 
            <option value="">Muslim-Others</option> 
            <option value="">Christian-All</option> 
            <option value="">Christian-Catholic</option> 
            <option value="">Jewish</option> 
            <option value="">Inter-Religion</option> 
        </select>
      </div>
    </div>
    <div class="clearfix"> </div>
  </div>
  <div class="form_but1">
    <label class="col-sm-5 control-lable1" for="sex">Mother Tongue : </label>
    <div class="col-sm-7 form_radios">
      <div class="select-block1">
        <select>
            <option value="">English</option>
            <option value="">French</option>
            <option value="">Telugu</option>
            <option value="">Bengali</option>
            <option value="">Bihari</option>
            <option value="">Hindi</option> 
            <option value="">Koshali</option> 
            <option value="">Khasi</option> 
            <option value="">Tamil</option> 
            <option value="">Urdu</option> 
            <option value="">Manipuri</option> 
        </select>
      </div>
    </div>
    <div class="clearfix"> </div>
  </div>
  <div class="form_but1">
	<label class="col-sm-5 control-lable1" for="sex">Show Profile : </label>
	<div class="col-sm-7 form_radios">
		<input type="checkbox" class="radio_1" /> with Photo &nbsp;&nbsp;
		<input type="checkbox" class="radio_1" checked="checked" /> with Horoscope
	</div>
	<div class="clearfix"> </div>
  </div>
  <div class="form_but1">
	<label class="col-sm-5 control-lable1" for="sex">Don't Show : </label>
	<div class="col-sm-7 form_radios">
		<input type="checkbox" class="radio_1" /> Ignored Profiles &nbsp;&nbsp;
		<input type="checkbox" class="radio_1" checked="checked" /> Profiles already Contacted
	</div>
	<div class="clearfix"> </div>
  </div>
  <div class="form_but1">
	<label class="col-sm-5 control-lable1" for="sex">Age : </label>
	<div class="col-sm-7 form_radios">
	  <div class="col-sm-5 input-group1">
        <input class="form-control has-dark-background" name="28" id="slider-name" placeholder="28" type="text" required="" />
      </div>
      <div class="col-sm-5 input-group1">
        <input class="form-control has-dark-background" name="40" id="slider-name" placeholder="40" type="text" required="" />
      </div>
      <div class="clearfix"> </div>
	</div>
	<div class="clearfix"> </div>
  </div>
 </form>
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


export default Search;