import React from "react";
import './ReviewItem.css'

const ReviewItem = (props) => {
  return (
    <div className="row_data_item" key={props.index}>
      <div className="row_data_single">
        <div className="row_data_single_desc">
          <h3>{props.name}</h3>
          <p>{props.review}</p>
          <h4>{props.rating} ⭐</h4>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default ReviewItem;
