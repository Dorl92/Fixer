import React, { useState, useEffect, Fragment } from 'react';
import { database } from "./firebase";
//components
import ReviewForm from './ReviewForm';
import Review from './Review';
import Layout from './Layout';
import NewPurchaseForm from './NewPurchaseForm';
import Slider from "react-slick";
import Loader from 'react-loader-spinner';
//style
import styles from './styles/ServiceInfoStyles';
import './styles/stylesheets/stars.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//contexts
import { useAuth } from './contexts/authContext';
//hooks
import useToggle from './hooks/useToggle';
//material-ui
import { withStyles } from '@material-ui/styles';
import { Divider, Avatar } from '@material-ui/core';


function ServiceInfo(props) {
    const { classes, history, match } = props;

    const { loggedUser } = useAuth();

    const [serviceData, setserviceData] = useState(null);
    const [sellerData, setsellerData] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [serviceReviews, setServiceReviews] = useState([]);

    const [openPurchaseDialog, openPurchaseDialogToggle] = useToggle(false);

    const serviceId = match.params.serviceId;
    let averageScore = 0;
    //settings for slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    useEffect(() => {
        if (!reviews) {
            database.ref('reviews/')
                .on('value', (snapshot) => {
                    const data = snapshot.val();
                    setReviews(data && Object.values(data))
                })
        }
        if (!serviceData) {
            database.ref('services/' + serviceId)
                .on('value', (snapshot) => {
                    const data = snapshot.val();
                    setserviceData(data)
                })
        }
        if (serviceData) {
            database.ref('users/' + serviceData.sellerId)
                .on('value', (snapshot) => {
                    const data = snapshot.val();
                    setsellerData(data)
                })
        }
    }, [serviceData, reviews])

    useEffect(() => {
        if (serviceData && reviews) {
            let filterdReviews = [];
            filterdReviews = reviews.filter(review => review.serviceId === serviceData.serviceId);
            setServiceReviews(filterdReviews)
        } else if (!reviews) {
            setServiceReviews([])
        }
    }, [serviceData, reviews])

    if (serviceData && serviceData.numReviews !== 0) {
        averageScore = serviceData.totalScore / serviceData.numReviews;
    }

    return (
        <Layout>
            {serviceData && sellerData ?
                <Fragment>
                    <div className={classes.root}>
                        <div className={classes.serviceContainer}>
                            <div className={classes.serviceDetails}>
                                <div className={classes.serviceTitle}>
                                    {serviceData.title}
                                </div>
                                <div className={classes.serviceCategory}>
                                    <span >{`${serviceData.category} / ${serviceData.subcategory}`}</span>
                                </div>
                                <div className={classes.serviceData}>
                                    <div className={classes.sellerData}>
                                        <Avatar onClick={() => history.push(`/user-info/${serviceData.sellerId}`)} src={sellerData.photoUrl} className={classes.avatar} />
                                        <div className={classes.sellerName}>{sellerData.firstname} {sellerData.lastname}</div>
                                        <div className={classes.averageStars}>
                                            <p className="starability-result" data-rating={`${Math.round(averageScore)}`}>
                                                Rated: {`${Math.round(averageScore)}`} stars
                                            </p>
                                            <div className={classes.averageRating}>
                                                {`${(averageScore).toFixed(1)}`}
                                                <span style={{ marginLeft: "0.2rem", color: "rgb(168, 167, 167)", fontWeight: "500" }}>({serviceData.numReviews})</span>
                                            </div>
                                        </div>
                                    </div>
                                    {loggedUser && loggedUser.userId !== serviceData.sellerId &&
                                        <button
                                            onClick={openPurchaseDialogToggle}
                                            className={classes.servicePurchaseButton}>
                                            Purchase Service
                                        </button>
                                    }
                                </div>
                                <Divider />
                            </div>
                            <div className={classes.slider}>
                                <Slider {...settings} >
                                    {serviceData && serviceData.images.map(image =>
                                        <div key={image}>
                                            <img src={image} style={{ width: "100%", height: "100%" }} />
                                        </div>
                                    )}
                                </Slider>
                            </div>
                            <div className={classes.fullDescription}>
                                <strong>About This Service</strong>
                                {serviceData.description}
                            </div>
                        </div>
                        <div className={classes.reviewsContainer}>
                            {loggedUser && loggedUser.userId !== serviceData.sellerId &&
                                <ReviewForm serviceData={serviceData} />
                            }
                            <TransitionGroup className={classes.reviews}>
                                {serviceReviews && serviceReviews.map(review =>
                                    <CSSTransition key={review.reviewId} timeout={300} classNames="fade">
                                        <Review
                                            review={review}
                                            serviceData={serviceData}
                                             />
                                    </CSSTransition>
                                )}
                            </TransitionGroup>
                        </div>
                    </div>
                </Fragment>
                : <div>
                    <Loader
                        type="TailSpin"
                        color="#29bb89"
                        height={100}
                        width={100}
                        timeout={10000}
                    />
                </div>
            }
            <NewPurchaseForm
                serviceData={serviceData}
                sellerData={sellerData}
                openDialog={openPurchaseDialog}
                openDialogToggle={openPurchaseDialogToggle} />
        </Layout>
    );
}

export default withStyles(styles)(ServiceInfo);