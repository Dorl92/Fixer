import { useState } from 'react';

export default (initialVal = "0") => {
    const [rating, setRating] = useState(initialVal)
    const handleRatingChange = evt => {
        setRating(evt.target.value);
    };
    const resetRating = () => {
        setRating("0");
    };
    return [rating, handleRatingChange, resetRating];
}