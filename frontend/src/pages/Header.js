import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import LoadingSpinner from "../shared/UIComponent/LoadingSpinner";
// import { Link } from 'react-router-dom';
import Item from "../components/Item";

import "./Header.css";

const Header = () => {
  const [formData, updateFormData] = useState("");
  const [res, setRes] = useState([]);
  const [load, setLoad] = useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
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
        if (response.ok) {
          console.log("done");
          setLoad(false);
        }
      };
    } catch (err) {
      console.log(err);
    }

    fetchData();
  };

  return (
    <React.Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div className="header">
          <h1>FKTSCRAP</h1>
          <div className="header_search">
            <input
              className="header_searchInput"
              type="text"
              name="name"
              onChange={handleChange}
              autoComplete="off"
            />
            <SearchIcon className="header_searchIcon" onClick={handleSubmit} />
            <h3>Welcome User</h3>
          </div>
        </div>
      </form>
      <div> {load && <LoadingSpinner asOverlay />} </div>
      <div className="row">
        <div className="row_data">
          {res &&
            res.map((item, index) => {
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  src={item.img_link}
                  price={item.price}
                  href={item.href}
                />
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Header;
