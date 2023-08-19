import Router from 'next/router'
import * as R from 'ramda'
import { toast } from 'react-toastify'
import { ktDangNhap } from './common'

export const xuLyLogin = props => duLieu => {
  const { dangNhap, userProfile } = props

  dangNhap(duLieu).then(result => {
    userProfile()
    Router.push('/')
  })
}

export const xuLyValidCode = props => () => {
  const { truyCapValidCode } = props

  truyCapValidCode()
}

export const xuLyLoginTk88 = props => duLieu => {
  const { truyCapLogintk88, userProfile } = props

  truyCapLogintk88(duLieu).then(() => {
    setTimeout(() => {
      userProfile()
    }, 1500)
  })
}

export const xuLyTaoBot = props => duLieu => {
  const { taoBot, listBot } = props

  taoBot({ duLieu: { ...duLieu, status: false } }).then(() => {
    listBot()
  })
}

export const xuLyStartBot = props => duLieu => {
  const { startBot, dsBot } = props

  const game = R.pathOr([], ['game', 0])(duLieu)

  // Convert the object keys to an array and filter out keys with value `true`
  const stringArray = R.pipe(
    R.toPairs, // Convert object to array of key-value pairs
    R.filter(R.last), // Filter pairs where the value is true
    R.map(R.head) // Extract the first element (the key) from each pair
  )(game)

  const trangThai = R.pathOr(false, ['status'])(duLieu)

  const duLieuDsBot = R.pathOr([], ['duLieu'])(dsBot)

  const duLieuDsCheck = duLieuDsBot.filter(item => {
    return item.status === true
  })

  console.log(stringArray)

  async function callAPIsSequentially() {
    for (let i = 0; i < stringArray.length; i++) {
      const type = stringArray[i]

      try {
        await startBot({ duLieu: { ...duLieu, botId: duLieu._id }, type })
      } catch (error) {
        console.error('Lỗi khi gọi API:', error.message)
      }
    }

    toast('Bot đã được khởi động', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })
  }

  const check1 = !R.isEmpty(duLieuDsCheck)

  check1
    ? toast('Có 1 Bot đang được chạy', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    : trangThai
    ? toast('Bot này đang được chạy !!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    : callAPIsSequentially()
}

export const xuLyChoiThu = self => e => {
  const { choiThu } = self.props
  e.preventDefault()
  choiThu().then(result => {})
}

export const xuLyXoaBot = props => duLieu => {
  const { xoaBot, listBot } = props

  const idBot = duLieu._id

  const duLieuGui = {
    idBot
  }

  xoaBot(duLieuGui).then(() => {
    listBot()
  })
}

export const xuLyDangKy = self => duLieu => {
  const { dangKy, userProfile } = self.props

  const duLieuBieuMau = {
    ...duLieu
  }

  dangKy(duLieuBieuMau).then(() => {
    userProfile().then(reuslt => {
      window.history.pushState({ urlPath: '/' })
    })
  })
}

export const xuLyDangXuat = self => duLieu => {
  const { dangXuat } = self.props
  dangXuat()
}

export const xuLyNgungBot = self => duLieu => {
  const { ngungBot, listBot } = self.props

  const idBot = duLieu._id

  const duLieuGui = {
    idBot
  }
  ngungBot(duLieuGui).then(() => {
    listBot()
    toast('Bot đã được dừng !!')
  })
}

export const xuLyToken88 = props => duLieu => {
  const { capNhatToken88 } = props
  capNhatToken88({ tokenBet: duLieu.tokenBet }).then(result => {
    if (!result.status) {
      toast(result.message)
    } else {
      toast('Cập nhật thành công')
    }
  })
}
