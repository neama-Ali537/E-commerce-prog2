import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ShoppingCartContext } from "../ShoppingCardContext/ShoppingCardContext";
import { dataContext } from "../DataContext/DataContextProvider";

export default function CardDetails() {
  // to get relatet product
  let { id } = useParams();
  const { mackUp, eat, furniture, mist } = useContext(dataContext);
  const allProducts = [...mackUp, ...eat, ...furniture, ...mist];
  const proDetails = allProducts.find((item) => item.id === Number(id));
  const relatedProduct = allProducts.filter(
    (item) =>
      item.category === proDetails?.category && item.id !== proDetails.id
  );
  // to add product to card
  const { addToCart } = useContext(ShoppingCartContext);

  let [productDetails, setProductDeails] = useState(null);
  async function getProductDetails(proId) {
    let response = await axios.get(`https://dummyjson.com/products/${proId}`);
    setProductDeails(response.data);
  }
  let [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProductDetails(id);
  }, [id]);
  return (
    <div className="m-0 p-4 container-fluid">
      {productDetails ? (
        <div className="product-details-logo">
          <h2 className="product-details-heading ">{productDetails.title}</h2>
         
        </div>
      ) : (
        ""
      )}

      <div className="row d-flex justify-content-between align-items-center">
        {productDetails ? (
          <>
            <div className="col-md-6  ">
              <img className="w-100" src={productDetails.images[0]} alt="" />
            </div>
            <div className="col-md-6">
              <h3>{productDetails.brand}</h3>
              <div className="d-flex  align-items-center">
                <p className="m-2">{productDetails.rating}</p>
                {[...Array(productDetails.rating > 3 ? 5 : 3)].map((_, i) => (
                  <FontAwesomeIcon
                    key={`star-${productDetails.id}-${i}`}
                    className="star-icon"
                    icon={faStar}
                  />
                ))}
              </div>
              <div className="d-flex  align-items-center">
                <p className="fw-bold">${productDetails.price}</p>
                <p className="fw-muted p-2">${productDetails.category}</p>
              </div>

              <p>{productDetails.description}</p>

              <>
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="d-block"
                  type="number"
                  min="1"
                />
                <button
                  onClick={() => addToCart({ ...productDetails, quantity })}
                  className="btn  bg-btn mt-3"
                >
                  {" "}
                  add to card
                </button>
              </>
            </div>
            <p className="m-2 text-muted">{productDetails.description}</p>

            <h3 className="fw-bold"> You might also like:</h3>
            <div className="row d-flex justify-content-between align-items-center">
              {relatedProduct.map((item) => (
                <div
                  key={item.id}
                  className="bg-light p
                m-2 col-md-3 text-center card-body"
                >
                  <img className="w-50" src={item.images[0]} alt="" />
                  <p>{item.brand}</p>
                  {[...Array(item.rating > 3 ? 5 : 3)].map((_, i) => (
                    <FontAwesomeIcon
                      key={`star-${item.id}-${i}`}
                      className="star-icon "
                      icon={faStar}
                    />
                  ))}

                  <p>{item.price}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
