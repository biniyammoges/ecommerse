import * as actions from "./constants";

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return { loading: true };
    case actions.LOGIN_SUCCESS:
      return { loading: false, token: action.payload };
    case actions.LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case actions.LOGOUT:
      return {};
    default:
      return state;
  }
};

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.REGISTER_REQUEST:
      return { loading: true };
    case actions.REGISTER_SUCCESS:
      return { loading: false, token: action.payload };
    case actions.REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.PROFILE_REQUEST:
      return { loading: true };
    case actions.PROFILE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case actions.PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case actions.PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const profileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.PROFILE_UPDATE_REQUEST:
      return { loading: true, success: false };
    case actions.PROFILE_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case actions.PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
