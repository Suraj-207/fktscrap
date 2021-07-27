import React, {useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
// import { Link } from 'react-router-dom';

import "./Header.css";

const Header = () => {
  const [formData, updateFormData] = useState("");

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    let fetchData
    
    try{
        fetchData = async () => {
            const data = {formData};
            const response = await fetch("http://localhost:5000/find-item", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
    
            if(response.ok){
                console.log("done");
            }
        }
    }catch(err){
        console.log(err);
    }
    

    fetchData();
  };

  return (
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
  );
};
export default Header;
