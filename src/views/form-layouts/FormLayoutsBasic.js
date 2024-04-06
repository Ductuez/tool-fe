// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { Checkbox, FormControlLabel, FormGroup, FormLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material'

const FormLayoutsBasic = props => {
  const { xuLyTaoBot } = props

  // ** States
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })
  const [chooseGame, setChooseGame] = useState({})

  useEffect(() => {
    setValues({ ...values, game: chooseGame })
  }, [chooseGame])

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const checkbox = [
    {
      label: 'Xổ số Miền bắc 75s',
      value: 'mb75s',
      valueCL: 'CLmb75s',
      valueTX: 'TXmb75s',
      labelCL: 'Chọn Chẳn Lẻ',
      labelTX: 'Chọn Tài Xỉu',
      active: true
    },
    {
      label: ' Xổ số miền trung 75s',
      value: 'mt75s',
      valueCL: 'CLmt75s',
      valueTX: 'TXmt75s',
      labelCL: 'Chọn Chẳn Lẻ',
      labelTX: 'Chọn Tài Xỉu'
    },
    {
      label: 'TKXSST1Phut',
      value: 'tkxsst1p',
      valueCL: 'CLtkxsst1p',
      valueTX: 'TXtkxsst1p',
      labelCL: 'Chọn Chẳn Lẻ',
      labelTX: 'Chọn Tài Xỉu'
    },
    {
      label: 'Xổ số Miền bắc TK 75s',
      value: 'mbtk75s',
      valueCL: 'CLmbtk75s',
      valueTX: 'TXmbtk75s',
      labelCL: 'Chọn Chẳn Lẻ',
      labelTX: 'Chọn Tài Xỉu'
    },
    {
      label: 'Xổ số Miền bắc TK 45s',
      value: 'tkxsmn45',
      valueCL: 'CLmbtk45s',
      valueTX: 'TXmbtk45s',
      labelCL: 'Chọn Chẳn Lẻ',
      labelTX: 'Chọn Tài Xỉu'
    },
    {
      label: 'Xổ số Miền222 bắc TK 45s',
      value: '173mbtk45s',
      valueCL: 'CLmbtk45s',
      valueTX: 'TXmbtk45s',
      labelCL: 'Chọn Chẳn Lẻ',
      labelTX: 'Chọn Tài Xỉu'
    }
  ]

  return (
    <Card>
      <CardHeader title='Basic' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Tên Bot'
                placeholder='Leonard Carter'
                onChange={handleChange('name')}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Giá trị vào lệnh'
                placeholder='Giá trị vào lệnh'
                onChange={handleChange('von')}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label='LaTai' placeholder='LaTai' onChange={handleChange('isTai')} />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='demo-simple-select-label'>Hình thức tăng giá trị</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  // value={age}
                  label='Hình thức tăng giá trị'
                  onChange={handleChange('tangGiaTri')}
                  xs={12}
                  required
                >
                  <MenuItem value='gapLose'>Tăng khi thua</MenuItem>
                  <MenuItem value='gapWin'>Tăng khi thắng</MenuItem>
                  <MenuItem value='alwayTang'>Luôn luôn tăng</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-lai'>Chốt lãi</InputLabel>
                <OutlinedInput
                  label='Chốt lãi'
                  onChange={handleChange('chotLai')}
                  id='form-layouts-lai'
                  aria-describedby='form-layouts-lai-helper'
                  type='text'
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label='Chốt lỗ' placeholder='4000' onChange={handleChange('chotLo')} />
            </Grid>

            <Grid item xs={12}>
              <FormGroup>
                {checkbox.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          onChange={e => {
                            setChooseGame(prevState => {
                              return {
                                ...prevState,
                                [item.value]: e.target.checked
                              }
                            })
                          }}
                        />
                      }
                      label={item.label}
                    />
                  )
                })}
              </FormGroup>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button type='submit' variant='contained' size='large' onClick={() => xuLyTaoBot(values)}>
                  Get Started!
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsBasic
