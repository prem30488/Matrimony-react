import React, { Component } from 'react';
// import './Home.css';
import PropTypes from 'prop-types';
import { ACCESS_TOKEN } from '../constants';
class Home extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        
    }
    render() {
        return (
<div><div>                    <h1 className="home-title">HomePage Front Page Web Page</h1>
                    { localStorage.getItem(ACCESS_TOKEN)     
     ? (
                                    <h2>logged in</h2>                                    
                                ): (
                                    <h2>not logged in</h2>
                                    
                                )}
                                </div>
                                </div>
        )
    }
}

Home.propTypes = {
    authenticated: PropTypes.bool,
    currentUser: PropTypes.object,
    loading: PropTypes.bool
  };
export default Home;