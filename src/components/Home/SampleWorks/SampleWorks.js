import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import caroselImg1 from '../../../images/carousel-1.png'
import caroselImg2 from '../../../images/carousel-2.png'
import caroselImg3 from '../../../images/carousel-3.png'
import caroselImg4 from '../../../images/carousel-4.png'
import caroselImg5 from '../../../images/carousel-2.png'
import caroselImg6 from '../../../images/carousel-3.png'
import './SampleWorks.css';

const SampleWorks = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000
      };
   
    return (
        <section className="recent-work section">
                <div className="container">
                    <h2 className="text-center text-white mb-3">
                        Here are some of <span style={{ color: "#7AB259" }}>our works</span>
                    </h2>
                    <Slider ref={slider => (slider)} {...settings}>
                        <div className="col-12">
                            <img src={caroselImg1} className="img-fluid" alt=""/>
                        </div>
                        <div className="col-12">
                            <img src={caroselImg2} className="img-fluid" alt=""/>
                        </div>
                        <div className="col-12">
                            <img src={caroselImg3} className="img-fluid" alt=""/>
                        </div>
                        <div className="col-12">
                            <img src={caroselImg4} className="img-fluid" alt=""/>
                        </div>
                        <div className="col-12">
                            <img src={caroselImg5} className="img-fluid" alt=""/>
                        </div>
                        <div className="col-12">
                            <img src={caroselImg6} className="img-fluid" alt=""/>
                        </div>
                    </Slider>
                </div>
            </section>
    );
};

export default SampleWorks;