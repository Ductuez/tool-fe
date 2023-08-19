// ** React Imports
import { useState, Fragment } from 'react'
import * as R from 'ramda'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import * as moment from 'moment'
import { NumericFormat } from 'react-number-format'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const createData = (name, calories, fat, carbs, protein, price) => {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1
      }
    ]
  }
}

const Row = props => {
  const { row } = props

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component='th' scope='row'>
          {row.gameName}
        </TableCell>
        <TableCell align='right'>{row.turnNum}</TableCell>
        <TableCell align='right'>{moment(row?.turnDate).format('DD-MM-YYYY HH:mm')}</TableCell>
        <TableCell align='right'>{row.playName}</TableCell>
        <TableCell align='right'>
          <NumericFormat
            value={row?.totalMoney}
            thousandSeparator=','
            displayType='text'
            renderText={value => <b>{value} vnđ</b>}
          />
        </TableCell>
        <TableCell align='right'> {row?.winMoney === 0 ? 'Thua' : row?.winnable ? 'Đang chờ' : 'Thắng'}</TableCell>
      </TableRow>
    </Fragment>
  )
}

const TableCollapsible = props => {
  const { dsBet } = props

  const duLieu = R.pathOr([], ['duLieu', 'rows'])(dsBet)

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell>Loại Xổ số</TableCell>
            <TableCell align='right'>Lượt xổ</TableCell>
            <TableCell align='right'>Thời gian cược</TableCell>
            <TableCell align='right'>Thông tin đặt cược</TableCell>
            <TableCell align='right'>Tổng số tiền</TableCell>
            <TableCell align='right'>Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {duLieu.map(row => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableCollapsible
