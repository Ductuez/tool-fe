/* eslint-disable camelcase */
import axios from "axios";
import * as R from "ramda";

// import Constants from '../constants'
import { dangNhap as dangNhapNguoiDung } from "../ultil/common";

import { API_TX } from "../ultil/services";

import {
  DANG_NHAP_BAT_DAU,
  DANG_NHAP_THANH_CONG,
  DANG_NHAP_THAT_BAI,
} from "./constants";

export const dangNhap =
  (duLieuBieuMau = {}) =>
  (dispatch) => {
    dispatch({
      type: DANG_NHAP_BAT_DAU,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post(
        "authorsystem/signin",
        duLieuBieuMau,
        API_TX
      );

      doRequest
        .then((ketQua) => {
          const token = R.pathOr({}, ["data", "token"])(ketQua);

          if (token) {
            dangNhapNguoiDung(token);
          }

          dispatch({
            duLieu: token,
            type: DANG_NHAP_THANH_CONG,
          });

          resolve(token);
        })
        .catch((loi) => {
          reject(loi);
        });
    });

    return promise.catch((loi) => {
      dispatch({
        loi,
        type: DANG_NHAP_THAT_BAI,
      });
      return loi;
    });
  };

export const reducer = (state, action) => {
  switch (action.type) {
    case DANG_NHAP_BAT_DAU:
      return {
        ...state,
        ketQuaDangNhap: {
          ...state.ketQuaDangNhap,
          loi: null,
          dangXuLy: true,
        },
      };
    case DANG_NHAP_THANH_CONG:
      return {
        ...state,
        ketQuaDangNhap: {
          duLieu: action.duLieu,
          loi: null,
          dangXuLy: false,
        },
      };

    case DANG_NHAP_THAT_BAI:
      return {
        ...state,
        ketQuaDangNhap: {
          ...state.ketQuaDangNhap,
          loi: action.loi,
          dangXuLy: false,
        },
      };

    default:
      return state;
  }
};
