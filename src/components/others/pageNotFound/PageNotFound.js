import React from "react";
import { Link } from "react-router-dom";
//  ===================================================

// This component is used to display "Page Not found" message
// when user try to visit on any other page which is not registered
// in our app's configurations.

const PageNotFound = () => {
  /* CSS Styling of Page Not Found -- Start */
  const container = {
    width: "60%",
    margin: "30px auto",
  };
  const title = {
    fontSize: "4rem",
  };
  const homePageBtn = { margin: "50px auto", width: "30%" };
  /* CSS Styling of Page Not Found -- Finish */

  //  ===================================================
  return (
    <div style={container}>
      <h1 className="text-center" style={title}>
        Indorse
      </h1>
      <h1 className="text-center m-5"> 404 | Page Not Found</h1>
      <Link
        to="/login"
        className="btn btn-primary bg-success"
        style={homePageBtn}
      >
        Go to HomePage
      </Link>
    </div>
  );
};

export default PageNotFound;

// ============================== THE END ===================================
