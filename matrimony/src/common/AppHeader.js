import React, { Component } from 'react';
import { Link, NavLink,BrowserRouter } from 'react-router-dom';
import './AppHeader.css';
import PropTypes from 'prop-types';

import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import 'rc-menu/assets/index.css';



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
    <div className="main">
      <div className="nav-area">
        <section className="top_section">
          <div className="container">
            <div className="row display-none">
              <div className="col-md-6 col-sm-4 col-xs-12">
                <div className="single">
                  <form action="newsletter.html" method="get" >
                    <div className="input-group">
                      <input type="email" className="form-control" name="emailId" id="emailId" placeholder="Enter Your Email Id" />
                      <span className="input-group-btn">
                      <button className="btn btn-theme" type="submit">SUBSCRIBE</button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="hd_right">
                  <ul>
                  <li><a href="https://www.facebook.com/giftinglifefoundationindia.org"><i className="fa fa-facebook-official" aria-hidden="true"></i></a></li>
                    <li><a href="https://twitter.com/giftinglifefoundation"><i className="fa fa-twitter-square" aria-hidden="true"></i></a></li>
                    <li><a href="https://www.youtube.com/user/tubeforchange"><i className="fa fa-youtube-square" aria-hidden="true"></i></a></li>
                    <li><a href="mailto:yours@email.com?Subject=Please check this site"><i className="fa fa-envelope" aria-hidden="true"></i></a></li>
                    <li><a href="https://www.linkedin.com/company/smile-foundation"><i className="fa fa-linkedin-square" aria-hidden="true"></i></a></li>
                    <li><a href="https://www.instagram.com/giftinglifefoundationindia/"><img src="images/instagram.png" style={{"width" : "22px"}} /></a></li>
                    <li><a href="http://www.giftinglifefoundationindia.org/blog/" ><img src="images/blogger-logo.png" style={{"width" : "22px"}} /></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2 col-sm-6">
                <div className="donate">
                DONATE Coming soon
                  
                </div>
              </div>
            </div>
            <div className="row display-none-large-screen">
              <div className="col-md-2 col-xs-4">
                <div className="donate">
                  <a href="http://www.giftinglifefoundationindia.org/register.asp" className="btn btn-details3 "><b>DONATE NOW</b></a>
                </div>
              </div>
              <div className="col-xs-8">
                <div className="hd_right">
                  <ul>
                    <li><a href="https://www.facebook.com/giftinglifefoundationindia.org"><i className="fa fa-facebook-official" aria-hidden="true"></i></a></li>
                    <li><a href="https://twitter.com/giftinglifefoundation"><i className="fa fa-twitter-square" aria-hidden="true"></i></a></li>
                    <li><a href="https://www.youtube.com/user/tubeforchange"><i className="fa fa-youtube-square" aria-hidden="true"></i></a></li>
                    <li><a href="mailto:yours@email.com?Subject=Please check this site"><i className="fa fa-envelope" aria-hidden="true"></i></a></li>    
                    <li><a href="https://www.linkedin.com/company/smile-foundation"><i className="fa fa-linkedin-square" aria-hidden="true"></i></a></li>
                    <li><a href="https://www.instagram.com/giftinglifefoundationindia/"><img src="images/instagram.png" style={{"width" : "22px"}} /></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-xs-12 spacer-10">
                <div className="single">
                  <form action="newsletter.html" method="get" >
                    <div className="input-group">
                      <input type="email" className="form-control" name="emailId" id="emailId" placeholder="Enter Your Email Id" />
                      <span className="input-group-btn">
                      <button className="btn btn-theme" type="submit">SUBSCRIBE</button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>    
            </div>
          </div>
        </section>
      </div>
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="row">
            <div className="navbar-header">
              <a className="navbar-brand home" href="http://www.giftinglifefoundationindia.org/" data-animate-hover="bounce">
                <div className="logo">
                  <img src="images/cp/logo.png" className="img-responsive" alt="logo" />
                </div>
              </a>
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              </button>
            </div>
            {/* <jsp:include page="menu.jsp"></jsp:include> */}
            { this.props.authenticated ? (
                                  <React.Fragment>
                                    <div style={{ padding: 0 }}>{horizontalMenu1}<a onClick={this.props.onLogout}>Logout</a></div>
                                    
                                  </React.Fragment>
                                ): (
                                  <React.Fragment>
                                    <div style={{ padding: 0 }}>{horizontalMenu2}</div>
                                    {/* <ul>
                                       
                                        <li>
                                            <NavLink to="/login">Login</NavLink>        
                                        </li>
                                        <li>
                                            <NavLink to="/signup">Signup</NavLink>        
                                        </li>
                                    </ul> */}
                                  </React.Fragment>
                                    
                                )}
          </div>
        </div>
      </nav>      
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