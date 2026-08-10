import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] =
    useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem(
      "staysphereCurrentUser"
    );

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    } else {
      setCurrentUser(null);
    }
  }, [location.pathname]);

  function handleLogout() {
    localStorage.removeItem(
      "staysphereCurrentUser"
    );

    setCurrentUser(null);

    navigate("/");
  }

  const firstName =
    currentUser?.fullName?.split(" ")[0];

  const userInitial =
    currentUser?.fullName
      ?.charAt(0)
      .toUpperCase();

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <Link
          to="/"
          className="navbar-brand"
          aria-label="StaySphere home"
        >
          <span className="brand-icon">
            S
          </span>

          <span className="brand-name">
            Stay<span>Sphere</span>
          </span>
        </Link>

        <div className="navbar-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Home
          </NavLink>

          

          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            My Bookings
          </NavLink>

          <NavLink
           to="/favourites"
           className={({isActive}) =>
             isActive
             ? "nav-link active"
             : "nav-link"
            }
          >
            Favourites
          </NavLink>
        </div>

        <div className="navbar-actions">
          {currentUser ? (
            <div className="navbar-user">
              <div className="user-avatar">
                {userInitial}
              </div>

              <div className="user-details">
                <span className="user-welcome">
                  Welcome
                </span>

                <span className="user-name">
                  {firstName}
                </span>
              </div>

              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="login-button"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="register-button"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;