import * as actions from "./constants";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actions.PRODUCT_REQUEST:
      return { ...state, loading: true };
    case actions.PRODUCT_SUCCESS:
      return { loading: false, products: action.payload };
    case actions.PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actions.PRODUCT_DETAIL_REQUEST:
      return { ...state, loading: true };
    case actions.PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload };
    case actions.PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const relatedProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actions.RELATED_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case actions.RELATED_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case actions.RELATED_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productReviewReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case actions.PRODUCT_REVIEW_REQUEST:
      return { ...state, loading: true };
    case actions.PRODUCT_REVIEW_SUCCESS:
      return { loading: false, reviews: action.payload };
    case actions.PRODUCT_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case actions.PRODUCT_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const createReviewReducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case actions.CREATE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case actions.CREATE_REVIEW_SUCCESS:
      return { loading: false, review: action.payload, success: true };
    case actions.CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
