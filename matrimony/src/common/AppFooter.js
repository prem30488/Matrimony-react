import React, { Component } from 'react';

class AppFooter extends Component {
    render() {
        return (
    <React.Fragment>
    <div className="footer">
    	<div className="container">
    		<div className="col-md-4 col_2">
    			<h4>About Us</h4>
    			<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."</p>
    		</div>
    		<div className="col-md-2 col_2">
    			<h4>Help & Support</h4>
    			<ul className="footer_links">
    				<li><a href="#">24x7 Live help</a></li>
    				<li><a href="contact.html">Contact us</a></li>
    				<li><a href="#">Feedback</a></li>
    				<li><a href="faq.html">FAQs</a></li>
    			</ul>
    		</div>
    		<div className="col-md-2 col_2">
    			<h4>Quick Links</h4>
    			<ul className="footer_links">
    				<li><a href="privacy.html">Privacy Policy</a></li>
    				<li><a href="terms.html">Terms and Conditions</a></li>
    				<li><a href="services.html">Services</a></li>
    			</ul>
    		</div>
    		<div className="col-md-2 col_2">
    			<h4>Social</h4>
    			<ul className="footer_social">
				  <li><a href="#"><i className="fa fa-facebook fa1"> </i></a></li>
				  <li><a href="#"><i className="fa fa-twitter fa1"> </i></a></li>
				  <li><a href="#"><i className="fa fa-google-plus fa1"> </i></a></li>
				  <li><a href="#"><i className="fa fa-youtube fa1"> </i></a></li>
			    </ul>
    		</div>
    		<div className="clearfix"> </div>
    		<div className="copy">
		      <p>Copyright © 2020 Marital . All Rights Reserved  | Design by <a href="http://w3layouts.com/" target="_blank">W3layouts</a> </p>
	        </div>
    	</div>
    </div>
</React.Fragment>
);
}
}

export default AppFooter;