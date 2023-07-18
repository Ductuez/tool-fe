/* eslint-disable camelcase */
import axios from "axios";
import * as R from "ramda";

// import Constants from '../constants'
import { truyCapCookie } from "../ultil/common";

import {
  TRUY_CAP_LOGIN_TK88_BAT_DAU,
  TRUY_CAP_LOGIN_TK88_THANH_CONG,
  TRUY_CAP_LOGIN_TK88_THAT_BAI,
} from "./constants";
import { API_TX } from "../ultil/services";

export const truyCapLogintk88 =
  (duLieuBieuMau = {}) =>
  (dispatch) => {
    dispatch({
      type: TRUY_CAP_LOGIN_TK88_BAT_DAU,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post("login", duLieuBieuMau, {
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
            type: TRUY_CAP_LOGIN_TK88_THANH_CONG,
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
        type: TRUY_CAP_LOGIN_TK88_THAT_BAI,
      });
      return loi;
    });
  };

export const reducer = (state, action) => {
  switch (action.type) {
    case TRUY_CAP_LOGIN_TK88_BAT_DAU:
      return {
        ...state,
        loginTk88: {
          ...state.loginTk88,
          loi: null,
          dangXuLy: true,
        },
      };
    case TRUY_CAP_LOGIN_TK88_THANH_CONG:
      return {
        ...state,
        loginTk88: {
          duLieu: action.duLieu,
          loi: null,
          dangXuLy: false,
        },
      };

    case TRUY_CAP_LOGIN_TK88_THAT_BAI:
      return {
        ...state,
        loginTk88: {
          ...state.loginTk88,
          loi: action.loi,
          dangXuLy: false,
        },
      };

    default:
      return state;
  }
};
