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
            <div className="search-bar">
              <div className="search">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Search Deals, Forms & Addresses..."
                />
                <div>
                  <span className="mag-icon"></span>
                  <select>
                    <option>Jobs</option>
                  </select>
                </div>
                <div className="search-list d-none">
                  <ul>
                    <li>
                      <div className="search-li">
                        Haul - Search in jobs, dispatches, reports and more
                      </div>
                    </li>
                    <li>
                      <div className="search-li">
                        Haul - Truck <mark>Haul</mark>er{" "}
                        <span className="search-attr">/ Job Name</span>
                      </div>
                    </li>
                    <li>
                      <div className="search-li">
                        Haul - Scrap Metal <mark>Haul</mark>{" "}
                        <span className="search-attr">
                          / Scope Of Work / Title{" "}
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="search-li">
                        Haul - Cement <mark>Haul</mark>{" "}
                        <span className="search-attr">
                          / Routes / Route Name
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="search-li">
                        Haul - Cargo <mark>Haul</mark>er{" "}
                        <span className="search-attr">/ Customer Name</span>
                      </div>
                    </li>
                    <li>
                      <div className="search-li">
                        Haul - Metal <mark>Haul</mark>{" "}
                        <span className="search-attr">
                          / Scope Of Work / Title{" "}
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="search-li">
                        Haul - Pick And Drop <mark>Haul</mark>{" "}
                        <span className="search-attr">/ Job Name</span>
                      </div>
                    </li>
                    <li>
                      <div className="search-li">
                        Haul - Club <mark>Haul</mark>{" "}
                        <span className="search-attr">/ Customer Name</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="header-btns">
              <div className="">
                <a href="^" className="notification active">
                  <span className="notif-num">0</span>
                </a>
              </div>

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
                  <a
                    className=""
                    onClick={redirectToChangePasswordPage}
                    href="^"
                  >
                    Change password
                  </a>

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
