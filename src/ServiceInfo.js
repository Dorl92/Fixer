import React, { useState, useEffect } from 'react';
import { database } from "./firebase";
import { useAuth } from './contexts/authContext';
import useToggle from './hooks/useToggle';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Slider from "react-slick";

import './styles/stylesheets/stars.css';
import styles from './styles/ServiceInfoStyles';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import ReviewForm from './ReviewForm';
import Review from './Review';
import { Divider } from '@material-ui/core';
import Layout from './Layout';
import { Fragment } from 'react';
import NewPurchaseForm from './NewPurchaseForm';

function ServiceInfo(props) {
    const { classes, history, match, addNewReview, removeReview, editService, addNewPurchase, purchasesLength } = props;

    const serviceId = match.params.serviceId;

    const { loggedUser } = useAuth();

    const [serviceData, setserviceData] = useState(null);
    const [sellerData, setsellerData] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [serviceReviews, setServiceReviews] = useState([]);

    const [openPurchaseDialog, openPurchaseDialogToggle] = useToggle(false);

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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    let averageScore = 0;
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
                                <ReviewForm
                                    addNewReview={addNewReview}
                                    editService={editService}
                                    serviceData={serviceData}
                                    serviceId={serviceData.serviceId} />
                            }
                            <TransitionGroup className={classes.reviews}>
                                {serviceReviews && serviceReviews.map(review =>
                                    <CSSTransition key={review.reviewId} timeout={300} classNames="fade">
                                        <Review
                                            key={review.reviewId}
                                            review={review}
                                            serviceData={serviceData}
                                            editService={editService}
                                            removeReview={removeReview} />
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
                purchasesLength={purchasesLength}
                serviceData={serviceData}
                sellerData={sellerData}
                addNewPurchase={addNewPurchase}
                openDialog={openPurchaseDialog}
                openDialogToggle={openPurchaseDialogToggle} />
        </Layout>
    );
}

export default withStyles(styles)(ServiceInfo);