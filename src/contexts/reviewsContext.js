import React, { createContext, useContext } from "react";
import useReviewsState from "../hooks/useReviewsState";

const ReviewsContext = createContext();

export function useReviewsContext() {
    return useContext(ReviewsContext);
}

export function ReviewsProvider(props) {
    const { reviews, setReviews, addNewReview, editReview, removeReview } = useReviewsState([])
    const value = {
        reviews,
        setReviews,
        addNewReview,
        editReview,
        removeReview
    }
    return (
        <ReviewsContext.Provider value={value}>
            {props.children}
        </ReviewsContext.Provider>
    )
}
