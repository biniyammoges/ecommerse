import React, { useEffect } from "react";
import RelatedProduct from "../components/RelatedProduct";
import Review from "../components/Review";
import { useSelector, useDispatch } from "react-redux";
import {
  getProduct,
  getProductReview,
  getRelatedProduct,
} from "../store/product/actions";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

const Product = ({ match }) => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productDetail);
  const { products } = useSelector((state) => state.relatedProducts);
  const { reviews } = useSelector((state) => state.productReview);
  const id = match.params.id;

  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getRelatedProduct(id));
    dispatch(getProductReview(id));
  }, [dispatch, id]);

  const updateReview = () => {
    dispatch(getProduct(id));
    dispatch(getRelatedProduct(id));
    dispatch(getProductReview(id));
  };

  return (
    <>
      <div className="products detail my-4">
        <div className="container">
          <div className="my-1">
            {" "}
            <Link to="/products" className="btn btn-success">
              <i className="fas fa-chevron-left"></i> Back
            </Link>
          </div>

          <div className="grid grid-3">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-detail">
              <h3>{product.name}</h3>
              <Rating value={product.rating} text={product.rating} />
              <p className="my-1">{`${product.price}ETB`}</p>
              <p className="lead">
                <strong>Description:</strong> {product.description}
              </p>
            </div>
            <div className="product-cart">
              <ul className="card">
                <li className="flex">
                  <strong>Price:</strong> <span>{product.price}</span>
                </li>
                <li className="flex">
                  <strong>Status:</strong> <span>Available</span>
                </li>
                <li className="flex">
                  <label htmlFor="restaurant">
                    <strong>Restaurant</strong>
                  </label>
                  <select name="qty">
                    <option value="1">Bole momy</option>
                    <option value="2">Wana ber Haymi</option>
                    <option value="3">Bole Etu</option>
                  </select>
                </li>
                <li className="flex">
                  <label htmlFor="select">
                    <strong>Qty</strong>
                  </label>
                  <select name="qty">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </li>
                <Link to="#" className="btn btn-success">
                  Add to cart{" "}
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Review
        updateReview={updateReview}
        productId={product._id}
        reviews={reviews}
      />
      <RelatedProduct products={products} />
    </>
  );
};

export default Product;
