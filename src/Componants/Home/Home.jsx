import {
  faCar,
  faCreditCard,
  faHeadphones,
  faHeart,
  faShieldHalved,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { dataContext } from "../DataContext/DataContextProvider";
import { ShoppingCartContext } from "../ShoppingCardContext/ShoppingCardContext";
import { Link } from "react-router-dom";

export default function Home() {
  const {
    cardItems,
    addToCart,
    decreaseItemQuantity,
    increaseItemQuantity,

  } = useContext(ShoppingCartContext);
  const { mackUp, eat, furniture, mist } = useContext(dataContext);

  // carsoul
  const [carsoulImg, setCarsoulImag] = useState([]);

  useEffect(() => {
    if (mackUp.length > 0) {
      let carsoulData = mackUp
        .flatMap((product) => product.images?.[0])
        .filter((img) => img)
        .slice(0, 3);
      setCarsoulImag(carsoulData);
    }
  }, [mackUp]);
  // carsoul
  return (
    <>
      <div className="mt-4 container-fluid bgColor rounded-1">
        <div
          id="mainCarousel"
          className="carousel slide row d-flex justify-content-between align-items-center"
        >
          <div className="col-md-6">
            <h2 className="fs-1 fw-bold">50% Off For Your First Shopping</h2>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <p className="text-muted">Visit Collections</p>
          </div>
          <div className="col-md-6">
            <div className="carousel-indicators">
              {carsoulImg.map((_, index) => (
                <button
                  key={`indicator-${index}`}
                  type="button"
                  data-bs-target="#mainCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {carsoulImg.map((img, index) => (
                <div
                  key={`slide-${index}`}
                  className={`w-100 carousel-item ${
                    index === 0 ? "active" : ""
                  }`}
                >
                  <img
                    src={img}
                    className="d-block w-100"
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#mainCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#mainCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container m-auto p-2">
        <div className="row d-flex justify-content-center align-items-center">
          {[faCar, faCreditCard, faShieldHalved, faHeadphones].map(
            (icon, index) => (
              <div
                key={index}
                className={`m-auto col-md-3 gap-1 text-center card${
                  index + 1
                } rounded-2 p-3`}
              >
                <div className="icon-brdr m-auto ">
                  <FontAwesomeIcon icon={icon} />
                </div>
                <h5>
                  {
                    [
                      "Free Shipping",
                      "Safe Payment",
                      "Secure Payment",
                      "Back Guarantee",
                    ][index]
                  }
                </h5>
                <p>Show more details</p>
              </div>
            )
          )}
        </div>
      </div>
      <section id="products">
        <div className="container bgColor">
          <div className="row d-flex justify-content-center align-items-center card-div">
            <h3 className="text-center m-auto h2 fw-bold p-2">Our Products</h3>
            {[...mackUp, ...mist, ...furniture, ...eat].map((product) => {
              let quantity =
                cardItems.find((item) => item.id === product.id)?.quantity || 0;

              let sectionTitle = "";
              switch (product.category) {
                case "makeup":
                  sectionTitle = "Big Discount";
                  break;
                case "fragrances":
                  sectionTitle = "New Arrivals";
                  break;
                case "furniture":
                  sectionTitle = "Best Sales";
                  break;
                case "groceries":
                  sectionTitle = "New Section";
                  break;
                default:
                  sectionTitle = "Our Products";
              }

              return (
                <div
                  key={product.id || product.title}
                  className="card col-md-3"
                >
                  <h4 className="text-center">{sectionTitle}</h4>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="rating text-center rounded-4">
                      {Math.floor(product.rating)}0% Off
                    </div>
                    <FontAwesomeIcon className="heart-icon" icon={faHeart} />
                  </div>
                  <Link to={`/carddetails/${product.id}`}>
                    <img
                      src={product.images[0]}
                      className="card-img card-img-top m-auto"
                      alt={product.category}
                    />
                  </Link>

                  <div className="card-body">
                    <p>
                      {product.description.split(" ").slice(0, 3).join(" ")}
                    </p>
                    {[...Array(product.rating > 3 ? 5 : 3)].map((_, i) => (
                      <FontAwesomeIcon
                        key={`star-${product.id}-${i}`}
                        className="star-icon"
                        icon={faStar}
                      />
                    ))}
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="card-text fw-bold">${product.price}</div>
                      {quantity === 0 ? (
                        <button
                          onClick={() => addToCart(product)}
                          className="btn btn-light "
                        >
                          Add To Cart
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => decreaseItemQuantity(product.id)}
                            className="btn btn-light "
                          >
                            -
                          </button>
                          <span>{quantity}</span>
                          <button
                            onClick={() =>
                              increaseItemQuantity(
                                product.id,
                                product.title,
                                product.images[0],
                                product.price
                              )
                            }
                            className="btn btn-light fs-4"
                          >
                            +
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="border-bottom"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
