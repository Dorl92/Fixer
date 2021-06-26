import React, { useState } from 'react';
import { useAuth } from './contexts/authContext';

import useInputState from './hooks/useInputState';
import useRatingState from './hooks/useRatingState';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles/ReviewFormStyles';
import './styles/stylesheets/stars.css';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

function ReviewForm(props) {
    const { classes, addNewReview, serviceData, serviceId, editService } = props;
    const { loggedUser } = useAuth();

    const [rating, changeRating, resetRating] = useRatingState("0");
    const [text, changeText, resetText] = useInputState("");

    const [isText, setIsText] = useState(false);


    const submitNewReview = evt => {
        evt.preventDefault();
        if (text === '') {
            setIsText(true)
            return;
        } else {
            setIsText(false)
        }
        const newReview = {
            reviewId: uuidv4(),
            username: loggedUser.username,
            rating: parseInt(rating),
            text: text,
            serviceId: serviceId
        }
        const updatedService = {
            ...serviceData,
            totalScore: serviceData.totalScore + newReview.rating,
            numReviews: serviceData.numReviews + 1
        }
        addNewReview(newReview);
        editService(updatedService, serviceId)
        resetRating();
        resetText();
    }
    return (
        <div className={classes.reviewForm}>
            <span>Leave a Review</span>
            <fieldset class="starability-slot">
                <input type="radio" id="no-rate" class="input-no-rate" name={rating} value="0" checked aria-label="No rating." onChange={changeRating} />
                <input type="radio" id="first-rate1" name={rating} value="1" onChange={changeRating} />
                <label for="first-rate1" title="Terrible">1 star</label>
                <input type="radio" id="first-rate2" name={rating} value="2" onChange={changeRating} />
                <label for="first-rate2" title="Not good">2 stars</label>
                <input type="radio" id="first-rate3" name={rating} value="3" onChange={changeRating} />
                <label for="first-rate3" title="Average">3 stars</label>
                <input type="radio" id="first-rate4" name={rating} value="4" onChange={changeRating} />
                <label for="first-rate4" title="Very good">4 stars</label>
                <input type="radio" id="first-rate5" name={rating} value="5" onChange={changeRating} />
                <label for="first-rate5" title="Amazing">5 stars</label>
            </fieldset>
            <div className={classes.reviewText}>
                <label for="text">Review Text:</label>
                <textarea
                    id="text"
                    cols="30"
                    rows="3"
                    onChange={changeText}
                    value={text}>
                </textarea>
                {isText ? <div className={classes.validationError}>Review text is required</div> : null}
            </div>
            <div className={classes.button}>
                <Button
                    variant="contained"
                    style={{ width: "60%", backgroundColor: "#23775a", color: "white" }}
                    onClick={submitNewReview}>
                    Add Review
                </Button>
            </div>
        </div>
    );
}

export default withStyles(styles)(ReviewForm);