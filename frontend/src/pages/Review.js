import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/context";
import ReviewItem from "../components/ReviewItem";

const Review = () => {
  const product = useContext(Context);
  const [review, setReview] = useState([]);

  useEffect(() => {
    setReview(product.review);
  },[product.review])

  return (
    <React.Fragment>
      <div className="row">
        <div className="row_data">
          {review &&
            review.map((item, index) => {
              return (
                <ReviewItem
                  key = {index}
                  index = {index}
                  name = {item.name}
                  rating = {item.rating}
                  review = {item.review}
                />
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Review;
