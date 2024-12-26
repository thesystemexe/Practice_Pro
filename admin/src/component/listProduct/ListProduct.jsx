import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);


  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((resp) => resp.json())
      .then((data) => {
        setAllProducts(data);
      });

  };

  useEffect(()=>{
    fetchInfo();
  },[])

  const removeProduct = async (id) =>{
    await fetch('http://localhost:4000/removeproduct',{
        method:"POST",
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product, index)=>{
            return (
              <>
                {" "}
                <div
                  key={index}
                  className="listproduct-format-main listproduct-format"
                >
                  <img
                    className="listproduct-product-icon"
                    src={product.image}
                    alt=""
                  />
                  <p>{product.name}</p>
                  <p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <p>{product.category}</p>
                  <img
                    onClick={()=>removeProduct(product.id)}
                    className="listproduct-remove-icon"
                    style={{height:'20px', width:'20px'}}
                    src={cross_icon}
                    alt=""
                  />
                </div>
                <hr />
              </>
            );
            
        })}
      </div>
    </div>
  );
};

export default ListProduct;
