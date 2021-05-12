import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth/actions";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.login);

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [history, token]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="form-section my-3">
      <div className="container">
        <div className="form">
          <h2>
            <i
              style={{ marginRight: "5px" }}
              className="fas fa-sign-in-alt"
            ></i>{" "}
            Signin
          </h2>
          {error && <h3>{error}</h3>}
          {loading && <h3>Loading..</h3>}
          <form className="my-1" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <button type="submit" className="btn btn-success">
              <i className="fas fa-sign-in-alt"></i> Signin
            </button>
          </form>
          <p className="lead">
            No account? <Link to="/register">register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
