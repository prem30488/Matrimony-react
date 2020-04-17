import React, { Component } from 'react';

class Banner extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <React.Fragment>
            <section>
            <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
            <div className="">
                <div className="carousel-inner">          
                    <div className="carousel-inner">
                    <div className="item active">                  
                    <img src="images/home/index-me-1.jpg" alt="banner" width="100%" />
                    <a href="https://www.giftinglifefoundationindia.org/me/" className="btn btn-details2 bt-wrp1"></a>
                    </div>
                    <div className="item">
                    <img src="images/home/index-me-2.jpg" alt="banner" width="100%" />
                    <a href="https://www.giftinglifefoundationindia.org/me/" className="btn btn-details2 bt-wrp1"></a>
                    </div>
                    <div className="item">
                    <img src="images/home/index-me-3.jpg" alt="banner" width="100%" />
                    <a href="https://www.giftinglifefoundationindia.org/me/" className="btn btn-details2 bt-wrp1"></a>
                    </div> 
                    <div className="item">
                    <img src="images/home/index-me-4.jpg" alt="banner" className="img-responsive" />
                    <a href="https://www.giftinglifefoundationindia.org/me/" className="btn btn-details2 bt-wrp1"></a>
                    </div> 

            <a className="left carous-control hidden-xs" href="#carousel-example-generic" data-slide="prev">
                <img src="images/me/prev.png" className="arrow-bg" alt="prev"/>
            </a>
            <a className="right carous-control hidden-xs" href="#carousel-example-generic" data-slide="next">
                <img src="images/me/next.png" className="arrow-bg" alt="next"/>
            </a>
            </div>
            </div>
            </div>
            </div>
            </section>
            </React.Fragment>
        )
    }
}
  export default Banner;