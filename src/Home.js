import React from 'react';

import Navbar from './Navbar';
import AutocompleteSearch from './AutocompleteSearch';
import styles from './styles/HomeStyles';

import Slider from "react-slick";
import { withStyles } from '@material-ui/styles';

import logoDesign from './images/logo_design.jpg';
import tranlation from './images/translation.jpg';
import webDevelopment from './images/web_development.jpg';
import video from './images/video.jpg';
import music from './images/music.jpg';
import socialMedia from './images/social_media.jpg';

import img1 from './images/homeImage_1.jpg';
import img2 from './images/homeImage_2.jpg';
import about from './images/info.png';
import design from './images/web-design.png';

function Home(props) {
    const { classes, history, searchData } = props;

    const settings = {
        className: "center",
        pauseOnHover: true,
        autoplay: true,
        centerMode: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 900,
        autoplaySpeed: 4000,
        cssEase: "linear",
    };

    return (
        <div>
            <Navbar searchData={searchData} />
            <div className={classes.searchContainer}>
                <AutocompleteSearch
                    searchData={searchData}
                />
            </div>
            <div className={classes.popularServices}>
                <div className={classes.sliderTitle}>Some of our popular services</div>
                <Slider {...settings} className={classes.slider}>
                    <div>
                        <h4><small>Engage audience</small>Video</h4>
                        <img src={video} onClick={() => history.push("/services/video editing")} />
                    </div>
                    <div>
                        <h4><small>Bulid your</small>Logo</h4>
                        <img src={logoDesign} onClick={() => history.push("/services/logo design")} />
                    </div>
                    <div>
                        <h4><small>Go global</small>Translation</h4>
                        <img src={tranlation} onClick={() => history.push("/services/translation")} />
                    </div>
                    <div>
                        <h4><small>Design your own</small>Website</h4>
                        <img src={webDevelopment} onClick={() => history.push("/services/website design")} />
                    </div>
                    <div>
                        <h4><small>Record songs</small>Music</h4>
                        <img src={music} onClick={() => history.push("/services/sound design")} />
                    </div>
                    <div>
                        <h4><small>Reach customers</small>Social Media</h4>
                        <img src={socialMedia} onClick={() => history.push("/services/social media")} />
                    </div>
                </Slider>
            </div>
            <div className={classes.firstContainer}>
                <div className={classes.image}>
                    <img src={img1} style={{ width: "100%", height: "100%" }} />
                </div>
                <div className={classes.text}>
                    <h2>DESIGN WITH SERVICE<span style={{ fontFamily: "Oleo Script" }}>IM</span></h2>
                    <img src={design} style={{ width: "50px", height: "50px" }} />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, iste molestiae beatae,
                        maiores deserunt in voluptatibus aspernatur architecto excepturi delectus soluta? Ipsa,
                        deleniti dolorem hic consequatur repellat eveniet quidem voluptate necessitatibus dolorum
                        delectus minus vitae, ut, veritatis sint ipsum magnam autem nam ex deserunt debitis eaque
                        ratione! Nobis, quidem assumenda.
                    </p>
                </div>
            </div>
            <div className={classes.secondContainer}>
                <div className={classes.text}>
                    <h2>ABOUT SERVICE<span style={{ fontFamily: "Oleo Script" }}>IM</span></h2>
                    <img src={about} style={{ width: "50px", height: "50px" }} />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, iste molestiae beatae,
                        maiores deserunt in voluptatibus aspernatur architecto excepturi delectus soluta? Ipsa,
                        deleniti dolorem hic consequatur repellat eveniet quidem voluptate necessitatibus dolorum
                        delectus minus vitae, ut, veritatis sint ipsum magnam autem nam ex deserunt debitis eaque
                        ratione! Nobis, quidem assumenda.
                    </p>
                </div>
                <div className={classes.image}>
                    <img src={img2} style={{ width: "100%", height: "100%" }} />
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(Home);
