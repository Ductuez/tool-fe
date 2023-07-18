// ** MUI Imports
import Grid from '@mui/material/Grid'
import { connect } from 'react-redux'
import * as R from 'ramda'

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { useEffect, useState } from 'react'

import {
  //  xuLyDieuHuongKhoiTao,
  xuLyLoginTk88,
  xuLyToken88
} from 'src/ultil/handler'

import { truyCapLogintk88, userProfile } from 'src/action'

const Dashboard = props => {
  const { userDetail } = props

  const tokenBet = R.pathOr('', ['tokenBet', 'tokenBet'])(userDetail)

  useEffect(() => {
    // xuLyDieuHuongKhoiTao(props)()
  }, [])

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const xuLyLoginTk88NoiBo = e => {
    e.preventDefault()
    xuLyLoginTk88(props)(values)
  }

  const xuLyToken88NoiBo = e => {
    e.preventDefault()
    xuLyToken88(props)(values)
  }

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        {/* <Grid item xs={12} md={4}>
          <Trophy />
        </Grid> */}
        <Grid item xs={12} md={12}>
          <StatisticsCard {...props} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          {tokenBet && (
            <Card>
              <CardHeader title='Tài khoản tk88' titleTypographyProps={{ variant: 'h6' }} />
              <form onSubmit={e => xuLyLoginTk88NoiBo(e)}>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <Typography variant='body2' sx={{ fontWeight: 600 }}>
                        1. Account Details
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Account'
                        placeholder='carterLeonard'
                        onChange={handlePasswordChange('account')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='form-layouts-separator-password'>Password</InputLabel>
                        <OutlinedInput
                          label='Password'
                          value={values.password}
                          id='form-layouts-separator-password'
                          onChange={handlePasswordChange('password')}
                          type={values.showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                aria-label='toggle password visibility'
                              >
                                {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider sx={{ margin: 0 }} />
                <CardActions>
                  <Button
                    size='large'
                    type='submit'
                    sx={{ mr: 2 }}
                    variant='contained'
                    onClick={e => xuLyLoginTk88NoiBo(e)}
                  >
                    Submit
                  </Button>
                </CardActions>
              </form>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          {tokenBet && (
            <Card>
              <CardHeader title='Tài khoản tk88' titleTypographyProps={{ variant: 'h6' }} />
              <form onSubmit={e => xuLyLoginTk88NoiBo(e)}>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <Typography variant='body2' sx={{ fontWeight: 600 }}>
                        Token tk88
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Token'
                        placeholder='carterLeonard'
                        onChange={handlePasswordChange('tokenBet')}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider sx={{ margin: 0 }} />
                <CardActions>
                  <Button
                    size='large'
                    type='submit'
                    sx={{ mr: 2 }}
                    variant='contained'
                    onClick={e => xuLyToken88NoiBo(e)}
                  >
                    Submit
                  </Button>
                </CardActions>
              </form>
            </Card>
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

const mapStateToProps = common => {
  return common
}

const mapDispatchToProps = {
  truyCapLogintk88,
  userProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
