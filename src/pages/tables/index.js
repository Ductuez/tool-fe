// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import TableDense from 'src/views/tables/TableDense'
import TableSpanning from 'src/views/tables/TableSpanning'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { connect } from 'react-redux'

import { startBot, xoaBot, listBot, listDsBet } from 'src/action'
import { xuLyStartBot, xuLyXoaBot } from 'src/ultil/handler'
import { useEffect } from 'react'

const MUITable = props => {
  const { dsBot, listDsBet, dsBet, listBot } = props

  useEffect(() => {
    const intervalId = setInterval(() => {
      listDsBet()
      listBot()
    }, 30000)

    return () => clearInterval(intervalId)
  }, [])

  const propertiesTableBasic = {
    xuLyStartBot: xuLyStartBot(props),
    xuLyXoaBot: xuLyXoaBot(props),
    dsBot
  }

  const propertiesTableCollapsible = {
    dsBet
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Basic Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableBasic {...propertiesTableBasic} />
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Lịch sử cược' titleTypographyProps={{ variant: 'h6' }} />
          <TableCollapsible {...propertiesTableCollapsible} />
        </Card>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = common => {
  return common
}

const mapDispatchToProps = {
  startBot,
  xoaBot,
  listBot,
  listDsBet
}

export default connect(mapStateToProps, mapDispatchToProps)(MUITable)
