import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const RelatedProduct = ({ products }) => {
  return (
    <div className="related products my-3">
      <div className="container">
        <h1 className="my-2">Related products</h1>
        <div className="cards grid grid-4 my-3">
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
                  text={`Rate : ${product.rating}`}
                />
                <p>{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
