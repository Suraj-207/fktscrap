import React, { useState, useEffect } from "react";
import Item from "../components/Item";
import LoadingSpinner from "../shared/UIComponent/LoadingSpinner";
import './Products.css';

const Products = () => {
  const [product, setProduct] = useState([]);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setLoad(true);
    let fetchData;
    try {
      fetchData = async () => {
        const response = await fetch("http://localhost:5000/fetch-item");
        const data = await response.json();
        console.log(data.result);
        console.log("1");
        if (data === null || data.length === 0) {
          setErr(true);
        }
        setProduct(data.result);
        setLoad(false);
      };
    } catch (err) {
      console.log(err);
    }

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div>{load && <LoadingSpinner asOverlay /> } </div> 
      <div> {err && <div> <h1>No products found</h1> </div>} </div> 
      <div className="row">
        <div className="row_data">
          {product &&
            product.map((item, index) => {
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

export default Products;
