import { faShapes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Footer() {
  return (
    <div className="mt-5 container-fluid bgFoter">
      <div className="row text-center">
        <div className="col-md-3 col-sm-3">
          <h3 className="d-flex">
            <FontAwesomeIcon icon={faShapes} />
            MULTIMART
          </h3>
          <p >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
            eaque debitis quasi inventore blanditiis dolores, dignissimos amet
            nesciunt
          </p>
        </div>
        <div className="col-md-3 col-sm-3">
          <h4>About Us</h4>
          <p>carer</p>
          <p>carer</p>
          <p>carer</p>
          <p>carer</p>
          <p>carer</p>
        </div>
        <div className="col-md-3 col-sm-3">
          <h4 className="">Customer Care</h4>
          <p>carer</p>
          <p>carer</p>
          <p>carer</p>
          <p>carer</p>
          <p>carer</p>
        </div>
        <div className="col-md-3 col-sm-3">
          <h4>Contact us</h4>
          <p>carer</p>
          <p>carer</p>
          <p>carer</p>
          <p>carer</p>
          <p>carer</p>
        </div>
      </div>
    </div>
  );
}
