import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Product from "./screens/Product";
import Products from "./screens/Products";
import Profile from "./screens/Profile";
import Register from "./screens/Register";

const App = () => {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route path="/products" exact component={Products} />
      <Route path="/products/:id" component={Product} />
      <Footer />
    </Router>
  );
};

export default App;
