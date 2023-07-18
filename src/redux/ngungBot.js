/* eslint-disable camelcase */
import axios from "axios";
import * as R from "ramda";

// import Constants from '../constants'
import { truyCapCookie } from "../ultil/common";

import {
  XU_LY_NGUNG_BOT_BAT_DAU,
  XU_LY_NGUNG_BOT_THANH_CONG,
  XU_LY_NGUNG_BOT_THAT_BAI,
} from "./constants";
import { API_TX } from "../ultil/services";

export const ngungBot = (duLieu) => (dispatch) => {
  dispatch({
    type: XU_LY_NGUNG_BOT_BAT_DAU,
  });

  const promise = new Promise((resolve, reject) => {
    const doRequest = axios.post(`bot/stopBot`, duLieu, {
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
          type: XU_LY_NGUNG_BOT_THANH_CONG,
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
      type: XU_LY_NGUNG_BOT_THAT_BAI,
    });
    return loi;
  });
};

export const reducer = (state, action) => {
  switch (action.type) {
    case XU_LY_NGUNG_BOT_BAT_DAU:
      return {
        ...state,
        ketQuaNgungBot: {
          ...state.ketQuaNgungBot,
          loi: null,
          dangXuLy: true,
        },
      };
    case XU_LY_NGUNG_BOT_THANH_CONG:
      return {
        ...state,
        ketQuaNgungBot: {
          duLieu: action.duLieu,
          loi: null,
          dangXuLy: false,
        },
      };

    case XU_LY_NGUNG_BOT_THAT_BAI:
      return {
        ...state,
        ketQuaNgungBot: {
          ...state.ketQuaNgungBot,
          loi: action.loi,
          dangXuLy: false,
        },
      };

    default:
      return state;
  }
};
