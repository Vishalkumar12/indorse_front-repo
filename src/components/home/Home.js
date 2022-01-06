import { Switch, Route, BrowserRouter } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import { useEffect } from "react";
// import { tableDataScripts } from "../../scripts";
//  ===================================================

// This is the root component of our application.

const Home = () => {
  // Lifecycle Hook
  useEffect(() => {
    // tableDataScripts();

    const $ = window.$$;

    $(document).on("click", 'a[href="^"]', function (e) {
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    });
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }, []);

  //  ===================================================

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div className="initial-loader" />}>
          {/* List of Routes where authentication (Need for Login) not required  */}
          <Switch>
            <Route {...ROUTES.ROOT} />
            <Route {...ROUTES.LOGIN} />
            <Route {...ROUTES.LOGOUT} />
            <Route {...ROUTES.SIGNUP} />
            <Route {...ROUTES.DASHBOARD} />
            <Route {...ROUTES.CREATE_ACCOUNT} />

            <Route {...ROUTES.PAGE_NOT_FOUND} />
          </Switch>
        </Suspense>
      </BrowserRouter>
      <ToastContainer style={{ width: "auto" }} />
    </>
  );
};

export default Home;

//  ==================== THE END ===============================
