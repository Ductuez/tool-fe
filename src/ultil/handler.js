import * as R from 'ramda'
import { toast } from 'react-toastify'

export const xuLyLogin = props => duLieu => {
  const { dangNhap, userProfile } = props

  dangNhap(duLieu).then(result => {
    userProfile()
  })
}

export const xuLyValidCode = props => () => {
  const { truyCapValidCode } = props

  truyCapValidCode()
}

export const xuLyLoginTk88 = self => duLieu => {
  const { truyCapLogintk88, userProfile } = self.props

  truyCapLogintk88(duLieu).then(() => {
    setTimeout(() => {
      userProfile()
    }, 1500)
  })
}

export const xuLyTaoBot = self => duLieu => {
  const { taoBot, listBot } = self.props

  taoBot({ duLieu: { ...duLieu, status: false } }).then(() => {
    listBot()
  })
}

export const xuLyStartBot = self => duLieu => {
  const { startBot, dsBot } = self.props
  const game = R.pathOr([], ['game'])(duLieu)
  const trangThai = R.pathOr(false, ['status'])(duLieu)

  const duLieuDsBot = R.pathOr([], ['duLieu'])(dsBot)

  const duLieuDsCheck = duLieuDsBot.filter(item => {
    return item.status === true
  })

  async function callAPIsSequentially() {
    for (let i = 0; i < game.length; i++) {
      const type = game[i]

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

  !R.isEmpty(duLieuDsCheck)
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
    ? toast('Bot đang được chạy !!', {
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

export const xuLyXoaBot = self => duLieu => {
  const { xoaBot, listBot } = self.props

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
  capNhatToken88({ tokenBet: duLieu }).then(result => {
    console.log(result)
    if (!result.status) {
      toast(result.message)
    } else {
      toast('Cập nhật thành công')
    }
  })
}
