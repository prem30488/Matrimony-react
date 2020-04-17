import React, { Component } from 'react';


class Contact extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <div className="profile-container">
                <div className="container">
                    Contact Us
                </div>    
            </div>
        );
    }
}

export default Contact;