/* eslint-disable camelcase */
import axios from "axios";
import * as R from "ramda";

// import Constants from '../constants'
import { truyCapCookie } from "../ultil/common";

import { API_TX } from "../ultil/services";

import {
  XU_LY_BET_BAT_DAU,
  XU_LY_BET_THANH_CONG,
  XU_LY_BET_THAT_BAI,
} from "./constants";

export const taoBot =
  ({ duLieu = {}, type }) =>
  (dispatch) => {
    dispatch({
      type: XU_LY_BET_BAT_DAU,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(`bot/add`, duLieu, {
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
            type: XU_LY_BET_THANH_CONG,
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
        type: XU_LY_BET_THAT_BAI,
      });
      return loi;
    });
  };

export const reducer = (state, action) => {
  switch (action.type) {
    case XU_LY_BET_BAT_DAU:
      return {
        ...state,
        ketQuaBet: {
          ...state.ketQuaBet,
          loi: null,
          dangXuLy: true,
        },
      };
    case XU_LY_BET_THANH_CONG:
      return {
        ...state,
        ketQuaBet: {
          duLieu: action.duLieu,
          loi: null,
          dangXuLy: false,
        },
      };

    case XU_LY_BET_THAT_BAI:
      return {
        ...state,
        ketQuaBet: {
          ...state.ketQuaBet,
          loi: action.loi,
          dangXuLy: false,
        },
      };

    default:
      return state;
  }
};
