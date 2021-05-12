import React, { useState } from "react";
import Rating from "./Rating";
import { createProductReview } from "../store/product/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Review = ({ reviews, productId: id, updateReview }) => {
  const [rating, setRate] = useState(5);
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const { review, error, loading, success } = useSelector(
    (state) => state.createReview
  );
  const { token } = useSelector((state) => state.login);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, rating, text));
    updateReview();
  };

  return (
    <div className="reviews">
      <div className="container">
        <h3
          style={{
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            padding: "5px 0",
          }}
        >
          Reviews : {reviews.length}
        </h3>
        <div className="flex">
          {reviews.map((review) => (
            <div key={review._id} className="review">
              <div className="image">
                <img src={review.user.avatar} alt={review.user.name} />
              </div>
              <div className="review-detail">
                <div className="reviewer">
                  <h3>{review.user.name}</h3>
                  <span>{review.createdAt}</span>
                </div>
                <Rating value={review.rating} />
                <p>{review.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="review-form">
          {token ? (
            loading ? (
              <h2>Loading...</h2>
            ) : (
              <>
                {error && <h2>{error}</h2>}
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <label htmlFor="rating">Rate </label>
                    <select
                      name="rating"
                      value={rating}
                      onChange={(e) => setRate(e.target.value)}
                    >
                      <option value="5">5 star</option>
                      <option value="4">4 star</option>
                      <option value="3">3 star</option>
                      <option value="2">2 star</option>
                      <option value="1">1 star</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="text">Comment</label>
                    <textarea
                      name="text"
                      cols="30"
                      rows="4"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    submit
                  </button>
                </form>
              </>
            )
          ) : (
            <h3>
              Please login to write review{" "}
              <Link to="/login" class="btn btn-sm">
                Signin
              </Link>
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
