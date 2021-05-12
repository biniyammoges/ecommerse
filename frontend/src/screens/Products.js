import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../store/product/actions";
import Rating from "../components/Rating";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
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
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="card"
                >
                  <div className="card-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{product.name}</h3>
                    <Rating
                      value={product.rating}
                      text={`Rate - ${product.rating}`}
                    />
                    <p>1{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
