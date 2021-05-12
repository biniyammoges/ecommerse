import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getHomeProducts } from "../store/product/actions";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getHomeProducts());
  }, [dispatch]);

  return (
    <>
      {/* Showcase */}
      <div className="showcase">
        <div className="container flex">
          <div className="showcase-text">
            <h1 className="my-2">Astu Online Product Delivery System</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              molestias culpa natus excepturi nam quos dolorum aliquam
              blanditiis aspernatur soluta.
            </p>
          </div>
          <div className="showcase-image">
            <img src="./images/logo.svg" alt="" />
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="products my-4">
        <div className="container">
          <h1 className="my-2">Products</h1>
          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            <>
              <div className="cards grid grid-4">
                {products.map((product) => (
                  <Link to={`/products/${product._id}`} className="card">
                    <div className="card-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">{product.name}</h3>
                      <div className="rating">
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                      </div>
                      <p>{product.price}ETB</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="my-1">
                <Link to="/products" className="btn btn-success">
                  View All
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
