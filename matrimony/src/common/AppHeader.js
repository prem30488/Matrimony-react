import React, { Component } from 'react';
import { Link, NavLink,BrowserRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
// import 'rc-menu/assets/index.css';



function handleClick(info) {
    console.log(`clicked ${info.key}`);
    console.log(info);
  }
  const nestSubMenu = (
    <SubMenu

      title={
        <span className="submenu-title-wrapper">Get Involved</span>
      }
      key="3"
      popupOffset={[10, 15]}
    >
      <SubMenu
        key="3-1"
        title={<span className="submenu-title-wrapper">Partnerships</span>}
      >
        <MenuItem  key="3-1-0">
        Individual Support          
        </MenuItem>
        <MenuItem key="3-1-2">Corporates</MenuItem>
        <MenuItem key="3-1-3">Educational Institutes</MenuItem>
        <MenuItem key="3-1-4">Govt. Sector</MenuItem>
      </SubMenu>
      <MenuItem key="3-2">Careers</MenuItem>
    </SubMenu>
  );
  const nestSubMenu2 = (
    <SubMenu

      title={
        <span className="submenu-title-wrapper">Get Involved</span>
      }
      key="3"
      popupOffset={[10, 15]}
    >
      <SubMenu
        key="3-1"
        title={<span className="submenu-title-wrapper">Partnerships</span>}
      >
        <MenuItem  key="3-1-0">
        Individual Support          
        </MenuItem>
        <MenuItem key="3-1-2">Corporates</MenuItem>
        <MenuItem key="3-1-3">Educational Institutes</MenuItem>
        <MenuItem key="3-1-4">Govt. Sector</MenuItem>
      </SubMenu>
      <MenuItem key="3-2">Careers</MenuItem>
    </SubMenu>
  );
  
  function onOpenChange(value) {
    console.log('onOpenChange', value);
  }

  class CommonMenu extends React.Component {
    state={
      children: children1,
      overflowedIndicator: undefined,
    }
    toggleChildren = () => {
      this.setState({
        children: this.state.children === children1 ? children2 : children1,
      });
    }
    toggleOverflowedIndicator = () => {
      this.setState({
        overflowedIndicator:
          this.state.overflowedIndicator === undefined ?
            customizeIndicator :
            undefined,
      });
    }
    render() {
      const { triggerSubMenuAction } = this.props;
      const { children, overflowedIndicator } = this.state;
      return (
        <div>
          {/* {this.props.updateChildrenAndOverflowedIndicator && <div>
            <button onClick={this.toggleChildren}>toggle children</button>
            <button onClick={this.toggleOverflowedIndicator}>toggle overflowedIndicator</button>
          </div>} */}
          <Menu
            onClick={handleClick}
            triggerSubMenuAction={triggerSubMenuAction}
            onOpenChange={onOpenChange}
            selectedKeys={['3']}
            mode={this.props.mode}
            openAnimation={this.props.openAnimation}
            defaultOpenKeys={this.props.defaultOpenKeys}
            overflowedIndicator={overflowedIndicator}
          >
            {children}
          </Menu>
        </div>
      );
    }
  }
  
  class CommonMenu2 extends React.Component {
    state={
      children: children2,
      overflowedIndicator: undefined,
    }
    toggleChildren = () => {
      this.setState({
        children: this.state.children === children1 ? children2 : children1,
      });
    }
    toggleOverflowedIndicator = () => {
      this.setState({
        overflowedIndicator:
          this.state.overflowedIndicator === undefined ?
            customizeIndicator :
            undefined,
      });
    }
    render() {
      const { triggerSubMenuAction } = this.props;
      const { children, overflowedIndicator } = this.state;
      return (
        <div>
          {/* {this.props.updateChildrenAndOverflowedIndicator && <div>
            <button onClick={this.toggleChildren}>toggle children</button>
            <button onClick={this.toggleOverflowedIndicator}>toggle overflowedIndicator</button>
          </div>} */}
          <Menu
            onClick={handleClick}
            triggerSubMenuAction={triggerSubMenuAction}
            onOpenChange={onOpenChange}
            selectedKeys={['3']}
            mode={this.props.mode}
            openAnimation={this.props.openAnimation}
            defaultOpenKeys={this.props.defaultOpenKeys}
            overflowedIndicator={overflowedIndicator}
          >
            {children}
          </Menu>
        </div>
      );
    }
  }
  

  CommonMenu.propTypes = {
    mode: PropTypes.string,
    openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    triggerSubMenuAction: PropTypes.string,
    defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
    updateChildrenAndOverflowedIndicator: PropTypes.bool,
  };

  CommonMenu2.propTypes = {
    mode: PropTypes.string,
    openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    triggerSubMenuAction: PropTypes.string,
    defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
    updateChildrenAndOverflowedIndicator: PropTypes.bool,
  };

  const children1 = [
    <MenuItem key="0-1" to="/home">
        <BrowserRouter>
        <Link to="/home">
            Home
        </Link>
        </BrowserRouter>
      </MenuItem>,
    <SubMenu title={<span className="submenu-title-wrapper">About Us</span>} key="1">
      <MenuItem key="1-1" to="/overviews">
      <BrowserRouter>
        <Link to="/overviews">
            Overview
        </Link>
        </BrowserRouter>
      </MenuItem>
      <MenuItem key="1-2">
        <BrowserRouter>
        <Link to="/missions">
          Vision &amp; Mission
        </Link>
        </BrowserRouter>
      </MenuItem>
      <MenuItem key="1-3">Advisory Board</MenuItem>
      <MenuItem key="1-4" to="/leaderships">
        <BrowserRouter>
        <Link to="/leaderships">
        Leadership
        </Link>
        </BrowserRouter>
      </MenuItem>
      <MenuItem key="1-5" to="/awards">
      <BrowserRouter>
        <Link to="/awards">Awards</Link>
        </BrowserRouter>
      </MenuItem>
      <MenuItem key="1-6" to="/testimonials">
        <BrowserRouter>
      <Link to="/testimonials">
          Testimonials
        </Link>
        </BrowserRouter>
      </MenuItem>
    </SubMenu>,
    <SubMenu title={<span className="submenu-title-wrapper">Campaigns</span>} key="2">
        <MenuItem key="2-1">Focus Areas</MenuItem>
        <MenuItem key="2-2">Projects &amp; Events</MenuItem>
        <MenuItem key="2-3">Key Partners</MenuItem>
        <MenuItem key="2-4">Impact</MenuItem>
        <MenuItem key="2-5">Upcoming Events</MenuItem>
        <MenuItem key="2-6">Reach &amp; Presence</MenuItem>
    </SubMenu>,
    nestSubMenu,
    <SubMenu title={<span className="submenu-title-wrapper">Resource Centre</span>} key="4">
        <MenuItem key="4-1">Organ Donation</MenuItem>
        <MenuItem key="4-2">Blood Bank</MenuItem>
        <MenuItem key="4-3">Training &amp; Development</MenuItem>
        <MenuItem key="4-4">FAQs</MenuItem>
        <MenuItem key="4-5">Newsletter</MenuItem>
     </SubMenu>,
     <MenuItem key="5-1" to="/contact">
     <Link to="/contact">
         Contact
     </Link>
   </MenuItem>,
   <MenuItem key="6-1" to="/users">
     <BrowserRouter>
   <Link to="/users">
       User
   </Link>
   </BrowserRouter>
 </MenuItem>,
 <MenuItem key="7-1" to="/donate">
   <BrowserRouter>
 <Link to="/donate">
     Donate Now
 </Link></BrowserRouter>
</MenuItem>,
<SubMenu title={<span className="submenu-title-wrapper">Profile</span>} key="8">
    <MenuItem key="8-1" to="/profile">
      <BrowserRouter>
      <Link to="/profile">
          Profile
      </Link>
      </BrowserRouter>
      </MenuItem>,
      <MenuItem key="8-2" to="/profile">
        <BrowserRouter>
      <Link to="/bannerAdmin">
          Banner Images
      </Link>
      </BrowserRouter>
    </MenuItem>,
    <MenuItem key="8-3" to="/logout" Component={Link}>
      Logout
    </MenuItem>
</SubMenu>
  ];

  const children2 = [
    <MenuItem key="0-1" to="/homeUser">
        <BrowserRouter><Link to="/homeUser">
            Home
        </Link>
        </BrowserRouter>
      </MenuItem>,
    <SubMenu title={<span className="submenu-title-wrapper">About Us</span>} key="1">
      <MenuItem key="1-1" to="/overviewsUser">
      <BrowserRouter>
        <Link to="/overviewsUser">
            Overview
        </Link>
        </BrowserRouter>
      </MenuItem>
      <MenuItem key="1-2">
      <BrowserRouter>
        <Link to="/missionsUser">
          Vision &amp; Mission
        </Link>
        </BrowserRouter>
      </MenuItem>
      <MenuItem key="1-3">Advisory Board</MenuItem>
      <MenuItem key="1-4" to="/leadershipsUser">
      <BrowserRouter>
        <Link to="/leadershipsUser">
        Leadership
        </Link>
        </BrowserRouter>
      </MenuItem>
      <MenuItem key="1-5" to="/awardsUser">
      <BrowserRouter><Link to="/awardsUser">Awards</Link></BrowserRouter>
      </MenuItem>
      <MenuItem key="1-6" to="/testimonialsUser">
      <BrowserRouter>
      <Link to="/testimonialsUser">
          Testimonials
        </Link></BrowserRouter>
      </MenuItem>
    </SubMenu>,
    <SubMenu title={<span className="submenu-title-wrapper">Campaigns</span>} key="2">
        <MenuItem key="2-1">Focus Areas</MenuItem>
        <MenuItem key="2-2">Projects &amp; Events</MenuItem>
        <MenuItem key="2-3">Key Partners</MenuItem>
        <MenuItem key="2-4">Impact</MenuItem>
        <MenuItem key="2-5">Upcoming Events</MenuItem>
        <MenuItem key="2-6">Reach &amp; Presence</MenuItem>
    </SubMenu>,
    nestSubMenu2,
    <SubMenu title={<span className="submenu-title-wrapper">Resource Centre</span>} key="4">
        <MenuItem key="4-1">Organ Donation</MenuItem>
        <MenuItem key="4-2">Blood Bank</MenuItem>
        <MenuItem key="4-3">Training &amp; Development</MenuItem>
        <MenuItem key="4-4">FAQs</MenuItem>
        <MenuItem key="4-5">Newsletter</MenuItem>
     </SubMenu>,
     <MenuItem key="5-1" to="/contact">
     <BrowserRouter>
     <Link to="/contact">
         Contact
     </Link>
     </BrowserRouter>
   </MenuItem>,
 <MenuItem key="7-1" to="/donate">
 <BrowserRouter>
 <Link to="/donate">
     Donate Now
 </Link>
 </BrowserRouter>
</MenuItem>,
<MenuItem key="8-1" to="/login">
<BrowserRouter>
 <Link to="/login">
     Login
 </Link>
 </BrowserRouter>
</MenuItem>,
<MenuItem key="9-1" to="/signup">
<BrowserRouter>
 <Link to="/signup">
     Signup
 </Link>
 </BrowserRouter>
</MenuItem>,
  ];

  const customizeIndicator = <span>Add More Items</span>;

  
  const horizontalMenu1 = (
    <CommonMenu
      mode="horizontal"
      // use openTransition for antd
      openAnimation="slide-up"
      triggerSubMenuAction="click"
      updateChildrenAndOverflowedIndicator
    />
  );
const horizontalMenu2 = (
    <CommonMenu2
      mode="horizontal"
      // use openTransition for antd
      openAnimation="slide-up"
      triggerSubMenuAction="click"
      updateChildrenAndOverflowedIndicator
    />
  );

class AppHeader extends Component {
    render() {
        return (
    <React.Fragment>
<div className="navbar navbar-inverse-blue navbar">
      <div className="navbar-inner">
        <div className="container">
           <div className="navigation">
             <nav id="colorNav">
			   <ul>
				<li className="green">
					<a href="#" className="icon-home"></a>
          <ul>
					<li><a href="login">Login</a></li>
					<li><a href="signup">Register</a></li>
					<li><a onClick={this.props.onLogout}>Logout</a></li>
				  </ul>
					 
				</li>
			   </ul>
             </nav>
           </div>
           <a className="brand" href="index.html"><img src="images/logo.png" alt="logo"></img></a>
           <div className="pull-right">
          	<nav className="navbar nav_bottom" role="navigation">
            
		  <div className="navbar-header nav_2">
		      <button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">Menu
		        <span className="sr-only">Toggle navigation</span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		      </button>
		      <a className="navbar-brand" href="#"></a>
		   </div> 
		   
		    <div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
		        <ul className="nav navbar-nav nav_1">
		            <li><a href="/">Home</a></li>
		            <li><a href="about.html">About</a></li>
		    		<li className="dropdown">
		              <a href="#" className="dropdown-toggle" data-toggle="dropdown">Matches<span className="caret"></span></a>
		              <ul className="dropdown-menu" role="menu">
		                <li><a href="matches.html">New Matches</a></li>
		                <li><a href="viewed-profile.html">Who Viewed my Profile</a></li>
		                <li><a href="viewed-not_contacted.html">Viewed & not Contacted</a></li>
		                <li><a href="members.html">Premium Members</a></li>
		                <li><a href="shortlisted.html">Shortlisted Profile</a></li>
		              </ul>
		            </li>
					<li className="dropdown">
		              <a href="#" className="dropdown-toggle" data-toggle="dropdown">Search<span className="caret"></span></a>
		              <ul className="dropdown-menu" role="menu">
		                <li><a href="search.html">Regular Search</a></li>
		                <li><a href="profile.html">Recently Viewed Profiles</a></li>
		                <li><a href="search-id.html">Search By Profile ID</a></li>
		                <li><a href="faq.html">Faq</a></li>
		                <li><a href="shortcodes.html">Shortcodes</a></li>
		              </ul>
		            </li>
		            <li className="dropdown">
		              <a href="#" className="dropdown-toggle" data-toggle="dropdown">Messages<span className="caret"></span></a>
		              <ul className="dropdown-menu" role="menu">
		                <li><a href="inbox.html">Inbox</a></li>
		                <li><a href="inbox.html">New</a></li>
		                <li><a href="inbox.html">Accepted</a></li>
		                <li><a href="sent.html">Sent</a></li>
		                <li><a href="upgrade.html">Upgrade</a></li>
		              </ul>
		            </li>
		            <li className="last"><a href="contact.html">Contacts</a></li>
		        </ul>
		     </div>
		    </nav>
		   </div> 
          <div className="clearfix"> </div>
        </div> 
      </div> 
    </div>     
    </React.Fragment>
        )
    }
}
AppHeader.propTypes = {
    authenticated: PropTypes.bool,
    currentUser: PropTypes.object,
    loading: PropTypes.bool
  };
export default AppHeader;