// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import FormLayoutsSeparator from 'src/views/form-layouts/FormLayoutsSeparator'
import FormLayoutsAlignment from 'src/views/form-layouts/FormLayoutsAlignment'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { xuLyTaoBot } from 'src/ultil/handler'
import { connect } from 'react-redux'
import { taoBot, listBot } from 'src/action'
import { useEffect } from 'react'

const FormLayouts = props => {
  const { listBot } = props

  const propertiesFormLayoutsBasic = {
    xuLyTaoBot: xuLyTaoBot(props)
  }

  useEffect(() => {
    listBot()
  }, [])

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <FormLayoutsBasic {...propertiesFormLayoutsBasic} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

const mapStateToProps = common => {
  return common
}

const mapDispatchToProps = {
  taoBot,
  listBot
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLayouts)
