import React from 'react';
//contexts
import { useAuth } from './contexts/authContext';
import { useServicesContext } from './contexts/servicesContext';
import { useReviewsContext } from './contexts/reviewsContext';
//style
import styles from './styles/ReviewStyles';
import './styles/stylesheets/stars.css';
//material-ui
import { Clear } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';

function Review(props) {
    const { classes, review, serviceData } = props;

    const { loggedUser } = useAuth();
    const { editService } = useServicesContext();
    const { removeReview } = useReviewsContext();

    const handleRemoveReview = () => {
        const updatedService = {
            ...serviceData,
            totalScore: serviceData.totalScore - review.rating,
            numReviews: serviceData.numReviews - 1
        }
        editService(updatedService, serviceData.serviceId)
        removeReview(review.reviewId)
    }

    return (
        <div className={classes.review}>
            <div>
                <p class="starability-result" data-rating={`${review.rating}`}>
                    Rated: {`${review.rating}`} stars
                </p>
                <div className={classes.text}>{`${review.text}`}</div>
                <div className={classes.name}>Writen By <strong>{`${review.username}`}</strong></div>
            </div>
            {loggedUser && loggedUser.username === review.username &&
                <Clear
                    className={classes.deleteReview}
                    onClick={handleRemoveReview} />
            }
        </div>
    );
}

export default withStyles(styles)(Review);