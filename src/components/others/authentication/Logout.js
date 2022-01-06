import { clearSession } from "../../../utilities";
/* ================================================================== */

// This component is used for logout from our application.

const Logout = () => {
  // This method is used to logout the user and clear local storage's data.
  const handleLogout = () => clearSession();

  return (
    <>
      <a onClick={handleLogout} href="^">
        Logout
      </a>
    </>
  );
};

export default Logout;

/* ============================ THE END ====================================== */
