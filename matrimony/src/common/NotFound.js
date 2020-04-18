import React, { Component } from 'react';
import './NotFound.css';
import { BrowserRouter, Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                <h1 className="title">
                    404
                </h1>
                <div className="desc">
                    The Page you're looking for was not found.
                </div>
                <BrowserRouter>
                <Link to="/"><button className="go-back-btn btn btn-primary" type="button">Go Back</button></Link>
                </BrowserRouter>    
            </div>
        );
    }
}

export default NotFound;