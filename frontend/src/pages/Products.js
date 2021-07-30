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
        const response = await fetch("/api/fetch-item");
        const data = await response.json();
        console.log(data);
        if(response!== 200){
          setLoad(false);
          setErr(true)
        }
        if (data === null || data.result.length === 0) {
          setErr(true);
          console.log("1");
        }
        setProduct(data.result);
        setLoad(false);
      };
    } catch (err) {
      console.log(err);
      setLoad(false);
      setErr(true);
    }

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div>{load && <LoadingSpinner asOverlay /> } </div> 
      <div>{err && <div>No product found</div> } </div>
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
