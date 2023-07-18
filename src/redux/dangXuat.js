/* eslint-disable camelcase */
import axios from "axios";
import * as R from "ramda";

// import Constants from '../constants'
import { dangXuat as dangXuatNguoiDung, truyCapCookie } from "../ultil/common";

import { API_TX } from "../ultil/services";

import {
  DANG_XUAT_BAT_DAU,
  DANG_XUAT_THANH_CONG,
  DANG_XUAT_THAT_BAI,
} from "./constants";

export const dangXuat =
  (duLieuBieuMau = {}) =>
  (dispatch) => {
    dispatch({
      type: DANG_XUAT_BAT_DAU,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post("authorsystem/logout", duLieuBieuMau, {
        ...API_TX,
        headers: {
          Authorization: truyCapCookie("token"),
        },
      });

      doRequest
        .then((ketQua) => {
          const token = R.pathOr({}, ["data", "token"])(ketQua);

          dangXuatNguoiDung();

          dispatch({
            duLieu: token,
            type: DANG_XUAT_THANH_CONG,
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
        type: DANG_XUAT_THAT_BAI,
      });
      return loi;
    });
  };

export const reducer = (state, action) => {
  switch (action.type) {
    case DANG_XUAT_BAT_DAU:
      return {
        ...state,
        ketQuaDangXuat: {
          ...state.ketQuaDangXuat,
          loi: null,
          dangXuLy: true,
        },
      };
    case DANG_XUAT_THANH_CONG:
      return {
        ...state,
        ketQuaDangXuat: {
          duLieu: action.duLieu,
          loi: null,
          dangXuLy: false,
        },
      };

    case DANG_XUAT_THAT_BAI:
      return {
        ...state,
        ketQuaDangXuat: {
          ...state.ketQuaDangXuat,
          loi: action.loi,
          dangXuLy: false,
        },
      };

    default:
      return state;
  }
};
