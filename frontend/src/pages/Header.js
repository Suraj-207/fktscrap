import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
// import { Link } from 'react-router-dom';

import "./Header.css";

const Header = () => {
  const [formData, updateFormData] = useState("");
  const [res, setRes] = useState([]);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let fetchData;

    try {
      fetchData = async () => {
        const data = { formData };
        const response = await fetch("http://localhost:5000/find-item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const field = await response.json();
        console.log(field.result);
        setRes(field.result);
        //console.log(res.result.name);
        //console.log(res);
        if (response.ok) {
          console.log("done");
        }
      };
    } catch (err) {
      console.log(err);
    }

    fetchData();
  };

  return (
    <React.Fragment>
      <div className="header">
        <h1>FKTSCRAP</h1>
        <div className="header_search">
          <input
            className="header_searchInput"
            type="text"
            name="name"
            onChange={handleChange}
          />
          <SearchIcon className="header_searchIcon" onClick={handleSubmit} />
        </div>
      </div>
      <div className="row">
        <div className="row_data">
          {res &&
            res.length > 0 &&
            res.map((item, index) => {
              return (
                <div className="row_data_single" key={item.id}>
                  <img src={item.img_link} alt={item.name} />
                  <h5>{item.name}</h5>
                  <h5>{item.price}</h5>
                </div>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Header;
