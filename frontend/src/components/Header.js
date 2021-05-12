import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../store/auth/actions";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);

  return (
    <header>
      <div className="container flex">
        <Link to="/" className="nav-brand">
          <i className="fas fa-pizza-slice"></i> AOPDS
        </Link>
        <form className="search flex">
          <input type="text" placeholder="Search" />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </form>
        <ul className="flex">
          <li>
            <Link to="/products">Products</Link>
          </li>
          {token ? (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Signin</Link>
            </li>
          )}
          <li className="cart">
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i>
              <span>0</span>
            </Link>
          </li>
          {token && (
            <li>
              <button
                onClick={() => dispatch(logout())}
                className="btn btn-error"
                to="/login"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
