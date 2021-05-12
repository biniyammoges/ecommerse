import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../store/auth/actions";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const { loading, error } = useSelector((state) => state.register);

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [history, token]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setMessage("Password do not match");
    } else {
      dispatch(register(name, email, password, phone));
      setMessage(null);
    }
  };

  return (
    <div className="form-section my-3">
      <div className="container">
        <div className="form">
          <h2>
            <i style={{ marginRight: "5px" }} className="fas fa-user-plus"></i>{" "}
            Register
          </h2>
          {error && <h3>{error}</h3>}
          {message && <h3>{message}</h3>}
          {loading && <h3>Loading..</h3>}
          <form className="my-1" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                placeholder="Full name"
              />
            </div>
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
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                name="email"
                placeholder="Phone number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="Enter password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                name="password2"
                placeholder="Confirm password"
              />
            </div>
            <button type="submit" className="btn btn-success">
              <i className="fas fa-user-plus"></i> Register
            </button>
          </form>
          <p className="lead">
            Alreafy have an account? <Link to="/login">login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
