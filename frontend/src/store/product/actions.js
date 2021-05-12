import axios from "axios";
import * as actions from "./constants";

export const getHomeProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actions.PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/products?limit=4");

    dispatch({ type: actions.PRODUCT_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actions.PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/products");

    dispatch({ type: actions.PRODUCT_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    console.log(id);
    dispatch({ type: actions.PRODUCT_DETAIL_REQUEST });

    const { data } = await axios.get(`/api/v1/products/${id}`);

    dispatch({ type: actions.PRODUCT_DETAIL_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const getRelatedProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.RELATED_PRODUCTS_REQUEST });

    const { data } = await axios.get(`/api/v1/products/related/${id}?limit=4`);

    dispatch({
      type: actions.RELATED_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: actions.RELATED_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const getProductReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.PRODUCT_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/products/review/${id}`);

    dispatch({
      type: actions.PRODUCT_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_REVIEW_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const createProductReview = (id, rating, text) => async (dispatch) => {
  try {
    dispatch({ type: actions.CREATE_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/products/review/${id}`,
      { rating, text },
      config
    );

    dispatch({
      type: actions.CREATE_REVIEW_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    dispatch({
      type: actions.CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};
