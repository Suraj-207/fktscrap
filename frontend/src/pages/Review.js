import React, { useEffect, useState } from "react";
import ReviewItem from "../components/ReviewItem";
import LoadingSpinner from "../shared/UIComponent/LoadingSpinner";
import { Link } from "react-router-dom";

const Review = () => {
  const [review, setReview] = useState([]);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(false);
  useEffect(() => {
    setLoad(true);
    let fetchData;
    try{
      fetchData = async () => {
        const response = await fetch("/api/fetch-review");
        const data = await response.json();
        if(data === null || data.length === 0 ){
          setErr(true);
        }
        console.log(data);
        setReview(data);
        setLoad(false);
      };
    }catch(err){
      console.log(err);
    }
    fetchData();
  }, [] );

  return (
    <React.Fragment>
      <div> {load && <LoadingSpinner asOverlay />} </div>
      <div> {err && <h1>Review not found for the product</h1> } </div>
      <div> {err && <Link to='/'><h1>Go to home page to search again</h1> </Link>  } </div>
      <div className="row">
        <div className="row_data">
          {review &&
            review.map((item, index) => {
              return (
                <ReviewItem
                  key={index}
                  index={index}
                  name={item.name}
                  rating={item.rating}
                  review={item.review}
                />
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Review;
