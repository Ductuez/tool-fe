import * as R from 'ramda'
import cookie from 'js-cookie'

const coDocument = typeof document !== 'undefined'

export const accessCookie = (name = '') => {
  if (coDocument && name) {
    const value = '; ' + document.cookie
    const parts = value.split('; ' + name + '=')

    if (R.equals(parts.length, 2)) {
      return parts.pop().split(';').shift()
    }
  }

  return ''
}

export const saveCookie = (name, value) => {
  cookie.set(name, value, { expires: 1 })
}

export const checkLogin = (profile = {}) => {
  const token = truyCapCookie('token')
  const daDangNhap = R.pathOr('', ['duLieu', '_id'])(profile)

  return !!daDangNhap && token
}

export const truyCapCookie = (name = '') => {
  if (coDocument) {
    const value = '; ' + document.cookie
    const parts = value.split('; ' + name + '=')

    if (R.equals(parts.length, 2)) {
      return parts.pop().split(';').shift()
    }

    return ''
  }
}

export const dangNhap = (token = '') => {
  cookie.set('token', token, { expires: 3 })
}

export const ktDangNhap = (hoSoCaNhan = {}) => {
  const token = truyCapCookie('token')
  const daDangNhap = R.pathOr('', ['duLieu', '_id'])(hoSoCaNhan)

  return !!daDangNhap && token
}
