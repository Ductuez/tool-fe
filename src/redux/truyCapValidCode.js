/* eslint-disable camelcase */
import axios from 'axios'
import * as R from 'ramda'

// import Constants from '../constants'
import { API_TX } from '../ultil/services'

import { TRUY_CAP_VALID_CODE_BAT_DAU, TRUY_CAP_VALID_CODE_THANH_CONG, TRUY_CAP_VALID_CODE_THAT_BAI } from './constants'

export const truyCapValidCode =
  (duLieuBieuMau = {}) =>
  dispatch => {
    dispatch({
      type: TRUY_CAP_VALID_CODE_BAT_DAU
    })

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get('validcode', API_TX)

      doRequest
        .then(ketQua => {
          const duLieu = R.pathOr({}, ['data', 't'])(ketQua)

          dispatch({
            duLieu: duLieu,
            type: TRUY_CAP_VALID_CODE_THANH_CONG
          })

          resolve(duLieu)
        })
        .catch(loi => {
          reject(loi)
        })
    })

    return promise.catch(loi => {
      dispatch({
        loi,
        type: TRUY_CAP_VALID_CODE_THAT_BAI
      })

      return loi
    })
  }

export const reducer = (state, action) => {
  switch (action.type) {
    case TRUY_CAP_VALID_CODE_BAT_DAU:
      return {
        ...state,
        validCode: {
          ...state.validCode,
          loi: null,
          dangXuLy: true
        }
      }
    case TRUY_CAP_VALID_CODE_THANH_CONG:
      return {
        ...state,
        validCode: {
          duLieu: action.duLieu,
          loi: null,
          dangXuLy: false
        }
      }

    case TRUY_CAP_VALID_CODE_THAT_BAI:
      return {
        ...state,
        validCode: {
          ...state.validCode,
          loi: action.loi,
          dangXuLy: false
        }
      }

    default:
      return state
  }
}
