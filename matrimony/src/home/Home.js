import React, { Component } from 'react';
import './Home.css';
import PropTypes from 'prop-types';
class Home extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
           <div className="home-container">
                <div className="container">
                    <div className="graf-bg-container">
                        <div className="graf-layout">
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                        </div>
                    </div>
                    <h1 className="home-title">HomePage Front Page Web Page</h1>
                    { this.props.currentUser ? (
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