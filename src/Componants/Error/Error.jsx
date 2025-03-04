import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-12 error fs-1 ">
          <h2>We couldn't find the page you're looking for</h2>
          <p>Error 404</p>
          <div>
            Try searching for another template
            <Link to="/">here.</Link>
          </div>
        </div>
        <p></p>
      </div>
    </div>
  );
}
