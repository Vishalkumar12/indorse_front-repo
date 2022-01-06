import { useHistory } from "react-router-dom";
import Logout from "../authentication/Logout";
// ===================================================

// This component is used to show Header in our application.

const Header = () => {
  const history = useHistory();

  // Fetch Login data from local storage.
  let userData = null;
  if (localStorage.getItem("loginData"))
    userData = JSON.parse(window.localStorage.getItem("loginData"));

  // This method is used to redirect on Change password component (page).
  const redirectToChangePasswordPage = () =>
    history.push("/dashboard/changePassword");

  // ===================================================

  return (
    <>
      <header>
        <div className="wrapper">
          <div className="header-in">
            <div className="menu-toggle-btn">
              <span className="menu-line top-line"></span>
              <span className="menu-line mid-line"></span>
              <span className="menu-line bottom-line"></span>
            </div>
            <div className="mobile-logo side-logo d-md-none">
              <img src="/assets/images/logo.svg" alt="" />
            </div>

            <div className="header-btns">

              <div className="dropdown drop-profile">
                <a
                  className="drop-link"
                  href="^"
                  id="navbardrop"
                  data-toggle="dropdown"
                >
                  <span className="user-pic"></span>
                  {userData?.User?.email}
                </a>
                <div className="dropdown-menu drop-custom">
              
                  {/* ================== Logout Component Added ================= */}
                  <Logout />
                  {/* =================================================== */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

// =============================== THE END ===============================
