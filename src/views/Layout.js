import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { userProfile } from 'src/action'
import { ktDangNhap, truyCapCookie } from 'src/ultil/common'
import { xuLyDieuHuong } from 'src/ultil/handler'

const Layout = props => {
  const { children } = props

  return (
    <Fragment>
      {children}
      <ToastContainer />
    </Fragment>
  )
}

const mapStateToProps = common => {
  return common
}

const mapDispatchToProps = {
  userProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
