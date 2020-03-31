import { GET_VENDINGS, VENDING_ERROR, ADD_VENDING, SET_VENDING, REMOVE_VENDING } from "../actions/types";

const initialState = {
  vendings: [],
  vending: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_VENDINGS:
      return {
        ...state,
        vendings: payload,
        loading: false
      };

    case SET_VENDING:
      return {
        ...state,
        vending: payload
      }
    case REMOVE_VENDING:
      return {
        ...state,
        vending: null
      }
    case VENDING_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
