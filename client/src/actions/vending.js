import axios from "axios";

import {
  GET_VENDINGS,
  SET_VENDING,
  REMOVE_VENDING,
  ADD_VENDING,
  VENDING_ERROR,
} from "./types";

export const getVendings = () => async (dispatch) => {
  try {
    const res = await axios.get("api/vending");
    dispatch({
      type: GET_VENDINGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VENDING_ERROR,
      //payload: { msg: err.response.statusText, status: err.response.status}
    });
  }
};

export const setVending = (vending) => async (dispatch) => {
  try {
    dispatch({
      type: SET_VENDING,
      payload: vending,
    });
  } catch (err) {
    dispatch({
      type: VENDING_ERROR,
      //payload: { msg: err.response.statusText, status: err.response.status}
    });
  }
};

export const removeVending = () => async (dispatch) => {
  dispatch({
    type: REMOVE_VENDING,
  });
};

export const addVending = (model, region, adress, lat, lng) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    const body = JSON.stringify({ model, region, adress, lat, lng });
    const res = await axios.post(`api/vending`, body, config);

    dispatch({
      type: ADD_VENDING,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VENDING_ERROR,
      payload: err,
    });
  }
};
