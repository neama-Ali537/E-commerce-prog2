import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { dataContext } from "../DataContext/DataContextProvider";
import { ShoppingCartContext } from "../ShoppingCardContext/ShoppingCardContext";
import { Link } from "react-router-dom";

export default function Shop() {
  const { cardItems, addToCart, decreaseItemQuantity, increaseItemQuantity } =
    useContext(ShoppingCartContext);

  const { mackUp, eat, furniture, mist } = useContext(dataContext);

  // use for sekect
  const [filterSection, setFilterSection] = useState("");
  const choosingSection = () => {
    switch (filterSection) {
      case "beauty":
        return mackUp || [];
      case "fragrances":
        return mist || [];
      case "furniture":
        return furniture || [];
      case "groceries":
        return eat || [];

      default:
        return [
          ...(mackUp || []),
          ...(mist || []),
          ...(furniture || []),
          ...(eat || []),
        ];
    }
  };

  // use for serch input
  const [serchTrem, setSerchTrem] = useState("");

  const filterdProducts = choosingSection().filter((product) =>
    product.title.toLowerCase().includes(serchTrem.toLowerCase())
  );

  return (
    <>
      <section id="serch">
        <div className="container  mt-5 p-5">
          <div className="row">
            <div className="col-md-6 m-sm-2">
              <select
                onChange={(e) => setFilterSection(e.target.value)}
                className="form-select"
                aria-label="Default select example"
              >
                <option value={""}>All Categories</option>
                <option value="beauty">MackUp</option>
                <option value="fragrances">Perfume</option>
                <option value="furniture">Furnature</option>
                <option value="groceries">Eat</option>
              </select>
            </div>
            <div className="col-md-6 m-sm-2">
              {}
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={serchTrem}
                  onChange={(e) => setSerchTrem(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="products">
        <div className="container bgColor mt-5 p-5">
          <div className="row d-flex justify-content-center align-items-center card-div">
            <h3 className="text-center m-auto h2 fw-bold p-2"> Products:</h3>
            {filterdProducts.length > 0 ? (
              filterdProducts.map((product) => {
                let quantity =
                  cardItems.find((item) => item.id === product.id)?.quantity ||
                  0;

                let sectionTitle = "";
                switch (product.category) {
                  case "makeup":
                    sectionTitle = "makeup";
                    break;
                  case "fragrances":
                    sectionTitle = "Perfume";
                    break;
                  case "furniture":
                    sectionTitle = "furniture";
                    break;
                  case "groceries":
                    sectionTitle = "Food Products";
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
                        <div className="card-text fw-bold">
                          ${product.price}
                        </div>
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
              })
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <h2>We don't have this product yet</h2>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
