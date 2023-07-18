/* eslint-disable camelcase */
import axios from "axios";
import * as R from "ramda";

// import Constants from '../constants'
import { truyCapCookie } from "../ultil/common";

import { API_TX } from "../ultil/services";

import {
  CAP_NHAT_TOKEN_88_BAT_DAU,
  CAP_NHAT_TOKEN_88_THANH_CONG,
  CAP_NHAT_TOKEN_88_THAT_BAI,
} from "./constants";

export const capNhatToken88 = (duLieu) => (dispatch) => {
  dispatch({
    type: CAP_NHAT_TOKEN_88_BAT_DAU,
  });

  const promise = new Promise((resolve, reject) => {
    const doRequest = axios.post("info/token88", duLieu, {
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
          type: CAP_NHAT_TOKEN_88_THANH_CONG,
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
      type: CAP_NHAT_TOKEN_88_THAT_BAI,
    });
    return loi;
  });
};

export const reducer = (state, action) => {
  switch (action.type) {
    case CAP_NHAT_TOKEN_88_BAT_DAU:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          loi: null,
          dangXuLy: true,
        },
      };
    case CAP_NHAT_TOKEN_88_THANH_CONG:
      return {
        ...state,
        userDetail: {
          duLieu: action.duLieu,
          loi: null,
          dangXuLy: false,
        },
      };

    case CAP_NHAT_TOKEN_88_THAT_BAI:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          loi: action.loi,
          dangXuLy: false,
        },
      };

    default:
      return state;
  }
};
