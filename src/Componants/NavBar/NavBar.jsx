import {
  faBagShopping,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../ShoppingCardContext/ShoppingCardContext";

export default function NavBar() {
  const {
    cardItems,
    getTotalItemsQuantity,
    Massege,
    decreaseItemQuantity,
    increaseItemQuantity,
  } = useContext(ShoppingCartContext);
  const totlaItems = getTotalItemsQuantity();
  const getTotalPrice = cardItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cardItems.length > 0 ? 30 : 0;
  return (
    <div className=" nav">
      <div className="container ">
        <div className="row d-flex justify-content-between align-items-center py-3">
          <div className="col-auto d-flex align-items-center gap-2">
            <FontAwesomeIcon className="icon" icon={faBagShopping} size="lg" />
            <h2 className="m-0 nav-heading">Our Store</h2>
          </div>

          <div className="col-auto position-relative">
            <ul className="cursor nav-heading list-unstyled d-flex align-items-center gap-4 m-0">
              <Link to="/" className=" text-decoration-none nav-heading cursor">
                {" "}
                Home
              </Link>
              <Link
                to="/shop"
                className=" text-decoration-none nav-heading cursor"
              >
                {" "}
                Shop
              </Link>
              <Link
                to="/carddetails"
                className=" text-decoration-none nav-heading cursor"
              >
                Cart
              </Link>
              {/* side bar */}
              <div className="text-decoration-none d-flex align-items-center flex-column position-relative">
                <FontAwesomeIcon
                  className="icon "
                  icon={faCartShopping}
                  size="lg"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasWithBothOptions"
                  aria-controls="offcanvasWithBothOptions"
                />
                <div
                  className="offcanvas offcanvas-end"
                  data-bs-scroll="true"
                  tabIndex="-1"
                  id="offcanvasWithBothOptions"
                  aria-labelledby="offcanvasWithBothOptionsLabel"
                >
                  <div className="offcanvas-header">
                    <h5
                      className="offcanvas-title"
                      id="offcanvasWithBothOptionsLabel"
                    >
                      your Items :
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  {/*  */}
                  <div className="offcanvas-body">
                    {cardItems.length === 0 ? (
                      <p>your card is empty</p>
                    ) : (
                      <>
                        {cardItems.map((item) => (
                          <div key={item.id} class=" container-fluid ">
                            <div className="row ">
                              <div className="d-flex justify-content-between align-items-center bg-gradient bg-body-secondary text-light-emphasis">
                                <div className="col-md-6  ">
                                  <p>{item.title}</p>
                                  <img
                                    className="w-50"
                                    src={item.images}
                                    alt={item.title}
                                  />
                                  <p>Price: {item.price}</p>
                                </div>
                                <div className="col-md-6 d-flex justify-content-between align-items-center">
                                  <button
                                    className="btn btn-dark btn-sm"
                                    onClick={() =>
                                      increaseItemQuantity(item.id)
                                    }
                                  >
                                    +
                                  </button>
                                  <div className="p-2 ">
                                    piece:{item.quantity}
                                  </div>
                                  <button
                                    className="btn btn-dark btn-sm"
                                    onClick={() =>
                                      decreaseItemQuantity(item.id)
                                    }
                                  >
                                    -
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                    <div className="cart-summary mt-3">
                      <p>Total Price: ${getTotalPrice.toFixed(2)}</p>
                      <p>Shipping:{shipping}</p>
                      <h5>
                        Final Total: ${(getTotalPrice + shipping).toFixed(2)}
                      </h5>
                    </div>
                  </div>
                </div>

                {totlaItems > 0 && (
                  <>
                    <span className="card-count position-absolute">
                      {totlaItems}{" "}
                    </span>
                    {Massege && (
                      <div className=" position-relative">
                        <p className="position-absolute massage-nav">
                          {" "}
                          ✅ product has been added in card
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
