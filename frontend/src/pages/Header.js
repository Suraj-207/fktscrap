import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import LoadingSpinner from "../shared/UIComponent/LoadingSpinner";

import "./Header.css";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
  const [formData, updateFormData] = useState("");
  const history = useHistory();
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(false);

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
        console.log(formData.name);
        const response = await fetch("/api/find-item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log("done");
          setLoad(false);
          window.location.reload(history.push("/products"));
        }
      };
    } catch (err) {
      console.log(err);
      setLoad(false);
      setErr(true);
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
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1>FKTSCRAP</h1>
          </Link>
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
      <div> {err && <div><h1>No items found, please try after sometime.</h1> </div> } </div>
    </React.Fragment>
  );
};
export default Header;
