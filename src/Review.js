import React from 'react';
import { useAuth } from './contexts/authContext';

import './styles/stylesheets/stars.css';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import styles from './styles/ReviewStyles';

function Review(props) {
    const { classes, review, removeReview, serviceData, editService } = props;
    const { loggedUser } = useAuth();

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
                <ClearIcon
                    className={classes.deleteReview}
                    onClick={handleRemoveReview} />
            }
        </div>
    );
}

export default withStyles(styles)(Review);