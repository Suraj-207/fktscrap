import React from "react";
import "./Item.css";

const Item = (props) => {
  const handleClick = (e) => {
    let fetchData;
    let href = {
      href : props.href
    }
    console.log(href);

    try {
      fetchData = async () => {
        const data = href;
        const response = await fetch("http://localhost:5000/review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const field = await response.json();
        console.log(field.result);
        // setRes(field.result);
        if (response.ok) {
          console.log("done");
          // setLoad(false);
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
    </div>
  );
};

export default Item;
