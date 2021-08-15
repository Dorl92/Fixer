import React, { Fragment, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Aos from 'aos';
import 'aos/dist/aos.css';
import styles from './styles/AutoCompleteSearchStyles';
import Slider from "react-slick";
import SearchBar from './SearchBar.js'
import img1 from './images/homepageImage_1.jpg';
import img2 from './images/homepageImage_2.jpg';
import img3 from './images/homepageImage_3.jpg';

function AutocompleteSearch(props) {
    const { classes, history, searchData } = props;

    useEffect(() => {
        Aos.init({
            duration: 2000,
            once: true,
        })
    }, [])

    const settings = {
        dots: false,
        arrows: false,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 10000,
        cssEase: "linear"
    };

    return (
        <Fragment>
            <div className={classes.searchContainer}>
                <div className={classes.searchTitle}>Find a <span>service</span> that fit your needs</div>
                <SearchBar searchData={searchData} />
                <div className={classes.popularTabs}>
                    <span>Popular:</span>
                    <div className={classes.tab} onClick={()=> history.push(`/services/${"Programming & Tech".toLowerCase()}`)}>Programming & Tech</div>
                    <div className={classes.tab} onClick={()=> history.push(`/services/${"Graphics & Design".toLowerCase()}`)}>Graphics & Design</div>
                    <div className={classes.tab} onClick={()=> history.push(`/services/${"Music & Audio".toLowerCase()}`)}>Music & Audio</div>
                </div>
            </div>
            <div className={classes.carousel}>
                <Slider {...settings}>
                    <div>
                        <img src={img1} alt="homepage-img" />
                    </div>
                    <div>
                        <img src={img2} alt="homepage-img" />
                    </div>
                    <div>
                        <img src={img3} alt="homepage-img" />
                    </div>
                </Slider>
            </div>
        </Fragment>
    );
}

export default withRouter(withStyles(styles)(AutocompleteSearch));

