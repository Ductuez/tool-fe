// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { PlayCircleOutline, DeleteOutline } from 'mdi-material-ui'

import * as R from 'ramda'
import { NumericFormat } from 'react-number-format'

const TableBasic = props => {
  const { dsBot, xuLyStartBot, xuLyXoaBot } = props

  const duLieuBot = R.pathOr([], ['duLieu'])(dsBot)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Chốt Lãi</TableCell>
            <TableCell align='right'>Chốt Lỗ</TableCell>
            <TableCell align='right'>Trạng thái</TableCell>
            <TableCell align='right'>Tiền Thắng</TableCell>
            <TableCell align='right'>WinCount</TableCell>
            <TableCell align='right'>LoseCount</TableCell>
            <TableCell align='right'>Kích hoạt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {duLieuBot.map(row => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>
                <NumericFormat
                  value={row?.chotLai}
                  thousandSeparator=','
                  displayType='text'
                  renderText={value => <b>{value} vnđ</b>}
                />
              </TableCell>
              <TableCell align='right'>
                <NumericFormat
                  value={row?.chotLo}
                  thousandSeparator=','
                  displayType='text'
                  renderText={value => <b>{value} vnđ</b>}
                />
              </TableCell>
              <TableCell align='right'>{row.status ? 'Đang bật' : 'Đang tắt'}</TableCell>
              <TableCell align='right'>
                <NumericFormat
                  value={row?.moneyWin}
                  thousandSeparator=','
                  displayType='text'
                  renderText={value => <b>{value} vnđ</b>}
                />
              </TableCell>
              <TableCell align='right'>{row.winCount}</TableCell>
              <TableCell align='right'>{row.loseCount}</TableCell>
              <TableCell align='right'>
                <PlayCircleOutline size={1} onClick={() => xuLyStartBot(row)} />
                <DeleteOutline size={1} onClick={() => xuLyXoaBot(row)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBasic
