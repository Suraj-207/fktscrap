import React, { useState } from "react";
import "./Item.css";
import LoadingSpinner from "../shared/UIComponent/LoadingSpinner";
import {useHistory} from 'react-router-dom';

const Item = (props) => {
  const history = useHistory();
  const [load, setLoad] = useState(false);
  const handleClick = (e) => {
    let fetchData;
    let href = {
      href : props.href
    }
    console.log(href);
    setLoad(true);

    try {
      fetchData = async () => {
        const data = href;
        const response = await fetch("/api/review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log("done");
          setLoad(false);
          history.push('/review');
        }
      };
    } catch (err) {
      console.log(err);
    }

    fetchData();

  }

  return (
    <div className="row_data_item" key={props.id}>
      <div className="row_data_single">
        <img src={props.src} alt={props.name} />
        <div className="row_data_single_desc" name="href" onClick={handleClick}>
          <h2>{props.name}</h2>
          <h3>{props.price}</h3>
        </div>
      </div>
      <hr></hr>
      {load && <LoadingSpinner asOverlay />}
    </div>
  );
};

export default Item;
