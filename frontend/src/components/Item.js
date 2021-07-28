import React from "react";
import "./Item.css";

const Item = (props) => {
  return (
    <div className="row_data_item" key={props.key}>
      <div className="row_data_single">
        <img src={props.src} alt={props.name} />
        <div className="row_data_single_desc">
          <h2>{props.name}</h2>
          <h3>{props.price}</h3>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default Item;
