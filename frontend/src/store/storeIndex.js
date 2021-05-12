import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// reducers
import {
  registerReducer,
  loginReducer,
  profileReducer,
  profileUpdateReducer,
} from "./auth/reducer";
import {
  productReducer,
  productDetailReducer,
  relatedProductReducer,
  productReviewReducer,
  createReviewReducer,
} from "./product/reducers";

// initial states
const initialToken = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

const initialState = {
  login: { token: initialToken },
};

const reducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  profile: profileReducer,
  updateProfile: profileUpdateReducer,
  products: productReducer,
  productDetail: productDetailReducer,
  relatedProducts: relatedProductReducer,
  productReview: productReviewReducer,
  createReview: createReviewReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
