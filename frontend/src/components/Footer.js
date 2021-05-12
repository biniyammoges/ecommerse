import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-dark py-5">
      <div className="container grid grid-3">
        <div>
          <h1 className="my-1">
            <i className="fas fa-pizza-slice"></i> AOFD
          </h1>
          <p>Copyright &copy; 2020</p>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="index.html">Home</Link>
            </li>
            <li>
              <Link to="features.html">Products</Link>
            </li>
            <li>
              <Link to="docs.html">About</Link>
            </li>
          </ul>
        </nav>
        <div className="social">
          <Link to="#">
            <i className="fab fa-github fa-2x"></i>
          </Link>
          <Link to="#">
            <i className="fab fa-facebook fa-2x"></i>
          </Link>
          <Link to="#">
            <i className="fab fa-instagram fa-2x"></i>
          </Link>
          <Link to="#">
            <i className="fab fa-twitter fa-2x"></i>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
