/* eslint-disable camelcase */
import axios from "axios";
import * as R from "ramda";

// import Constants from '../constants'
import { API_TX } from "../ultil/services";
import { truyCapCookie } from "../ultil/common";

import {
  TRUY_CAP_DS_BET_BAT_DAU,
  TRUY_CAP_DS_BET_THANH_CONG,
  TRUY_CAP_DS_BET_THAT_BAI,
} from "./constants";

export const listDsBet = (duLieu) => (dispatch) => {
  dispatch({
    type: TRUY_CAP_DS_BET_BAT_DAU,
  });

  const promise = new Promise((resolve, reject) => {
    const doRequest = axios.post("listbet", duLieu, {
      ...API_TX,
      headers: {
        Authorization: truyCapCookie("token"),
      },
    });

    doRequest
      .then((ketQua) => {
        const duLieu = R.pathOr({}, ["data"])(ketQua);

        dispatch({
          duLieu: duLieu,
          type: TRUY_CAP_DS_BET_THANH_CONG,
        });

        resolve(duLieu);
      })
      .catch((loi) => {
        reject(loi);
      });
  });

  return promise.catch((loi) => {
    dispatch({
      loi,
      type: TRUY_CAP_DS_BET_THAT_BAI,
    });
    return loi;
  });
};

export const reducer = (state, action) => {
  switch (action.type) {
    case TRUY_CAP_DS_BET_BAT_DAU:
      return {
        ...state,
        dsBet: {
          ...state.dsBet,
          loi: null,
          dangXuLy: true,
        },
      };
    case TRUY_CAP_DS_BET_THANH_CONG:
      return {
        ...state,
        dsBet: {
          duLieu: action.duLieu,
          loi: null,
          dangXuLy: false,
        },
      };

    case TRUY_CAP_DS_BET_THAT_BAI:
      return {
        ...state,
        dsBet: {
          ...state.dsBet,
          loi: action.loi,
          dangXuLy: false,
        },
      };

    default:
      return state;
  }
};
