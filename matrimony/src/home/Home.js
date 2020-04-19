import React, { Component } from 'react';
// import './Home.css';
import PropTypes from 'prop-types';
import { ACCESS_TOKEN } from '../constants';
import { Carousel, Controls, Slider } from 'flex-carousel';
 
const colors = ['red', 'green', 'blue','white','black','pink'];
class Home extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        
    }
    handleAfterSlide = (prevIndex, currentIndex) => {
        console.log(prevIndex, currentIndex)
      }
    render() {
        return (<React.Fragment>
                    { localStorage.getItem(ACCESS_TOKEN)     
     ? (
        
        <div className="grid_1">
        <div className="container">
            <h1>Featured Profiles</h1>
             <div className="heart-divider">
              <span className="grey-line"></span>
              <i className="fa fa-heart pink-heart"></i>
              <i className="fa fa-heart grey-heart"></i>
              <span className="grey-line"></span>
          </div>
          <Carousel
        slideIndex={0}
        autoplay={true}
        itemsToShow={5}
        wrapAround={true} 
        afterSlide={this.handleAfterSlide}
        items={colors.map((color,index) => (
        <React.Fragment>
        <li>
        <div className="col_1 slider-item"><a href="view_profile.html">
              <img key={index} src={`images/${index+1}.jpg`} alt="" className="hover-animation image-zoom-in img-responsive" style={{width:"300px",height: "auto"}}/>
               <div className="layer m_1 hidden-link hover-animation delay1 fade-in">
                  <div className="center-middle"></div>
               </div>
               <h3><span className="m_3">Profile ID : MI-387412</span><br />28, Christian, Australia<br/>Corporate</h3></a></div>
        </li>       
        </React.Fragment>
        ))}
      >
        
            <ul id="flexiselDemo3">
          <Slider />
          </ul>
        
        <div id="slide-controls">
          <Controls>
            {({ slideNext, slidePrev, slideCount, slideIndex }) => (
              <div>
                <button onClick={slidePrev} className="btn_1">Prev</button>
                <span>
                  {slideIndex} / {slideCount-1}
                </span>
                <button onClick={slideNext} className="btn_1">Next</button>
              </div>
            )}
          </Controls>
        </div>
      </Carousel>
      </div>
  </div>    
  
                  
                                ): (
                                    <React.Fragment>
                                    <div class="banner">
  <div class="container">
    <div class="banner_info">
      <h3>Millions of verified Members</h3>
      <a href="/signup" class="hvr-shutter-out-horizontal">Create your Profile</a>
    </div>
  </div>
  </div>                            
                                    </React.Fragment>
                                )}
  </React.Fragment>
        )
    }
}

Home.propTypes = {
    authenticated: PropTypes.bool,
    currentUser: PropTypes.object,
    loading: PropTypes.bool
  };
export default Home;