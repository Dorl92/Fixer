import { useState } from 'react';
import { database } from "../firebase";

export default initialReviews => {
    const [reviews, setReviews] = useState(initialReviews);
    return {
        reviews,
        setReviews,
        addNewReview: async (newReview) => { database.ref('reviews/' + newReview.reviewId).set(newReview) },
        editReview: (updatedReview, reviewId) => { database.ref('users/' + reviewId).update(updatedReview) },
        removeReview: async (reviewId) => { database.ref('reviews/' + reviewId).remove() },
    }
}
