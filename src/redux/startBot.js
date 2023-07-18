/* eslint-disable camelcase */
import axios from "axios";
import * as R from "ramda";

// import Constants from '../constants'
import { truyCapCookie } from "../ultil/common";

import { API_TX } from "../ultil/services";

import {
  START_BOT_BAT_DAU,
  START_BOT_THANH_CONG,
  START_BOT_THAT_BAI,
} from "./constants";

export const startBot =
  ({ duLieu = {}, type }) =>
  (dispatch) => {
    dispatch({
      type: START_BOT_BAT_DAU,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(`auto/${type}`, duLieu, {
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
            type: START_BOT_THANH_CONG,
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
        type: START_BOT_THAT_BAI,
      });
      return loi;
    });
  };

export const reducer = (state, action) => {
  switch (action.type) {
    case START_BOT_BAT_DAU:
      return {
        ...state,
        chiTietBet: {
          ...state.chiTietBet,
          loi: null,
          dangXuLy: true,
        },
      };
    case START_BOT_THANH_CONG:
      return {
        ...state,
        chiTietBet: {
          duLieu: action.duLieu,
          loi: null,
          dangXuLy: false,
        },
      };

    case START_BOT_THAT_BAI:
      return {
        ...state,
        chiTietBet: {
          ...state.chiTietBet,
          loi: action.loi,
          dangXuLy: false,
        },
      };

    default:
      return state;
  }
};
