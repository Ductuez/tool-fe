/* eslint-disable camelcase */
import axios from "axios";
import * as R from "ramda";

// import Constants from '../constants'
import { truyCapCookie } from "../ultil/common";

import { API_TX } from "../ultil/services";

import {
  CHOI_THU_BAT_DAU,
  CHOI_THU_THANH_CONG,
  CHOI_THU_THAT_BAI,
} from "./constants";

export const choiThu = () => (dispatch) => {
  dispatch({
    type: CHOI_THU_BAT_DAU,
  });

  const promise = new Promise((resolve, reject) => {
    const doRequest = axios.get("trial", {
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
          type: CHOI_THU_THANH_CONG,
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
      type: CHOI_THU_THAT_BAI,
    });
    return loi;
  });
};

export const reducer = (state, action) => {
  switch (action.type) {
    case CHOI_THU_BAT_DAU:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          loi: null,
          dangXuLy: true,
        },
      };
    case CHOI_THU_THANH_CONG:
      return {
        ...state,
        userDetail: {
          duLieu: action.duLieu,
          loi: null,
          dangXuLy: false,
        },
      };

    case CHOI_THU_THAT_BAI:
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
