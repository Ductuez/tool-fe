// ** Next Imports
import Head from 'next/head'
import Router from 'next/router'
import { Provider, useStore } from 'react-redux'
import { useDispatch } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import { userProfile, listBot, listDsBet } from 'src/action'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import store from '../store.js' // Import Redux store

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import { useEffect, useState } from 'react'
import Layout from 'src/views/Layout.js'
import { truyCapCookie } from 'src/ultil/common.js'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const [ready, setReady] = useState(false)

  useEffect(() => {
    const token = truyCapCookie('token')

    if (token) {
      store.dispatch(userProfile()).then(result => {
        if (!result._id) {
          Router.push('/pages/login')
        }
      })
      store.dispatch(listBot())
      store.dispatch(listDsBet())
    } else {
      Router.push('/pages/login')
    }
    setReady(true)
  }, [])

  console.log(ready)

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
        />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <Provider store={store}>
        <SettingsProvider>
          {ready && (
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <Layout> {getLayout(<Component {...pageProps} />)}</Layout>
                  </ThemeComponent>
                )
              }}
            </SettingsConsumer>
          )}
        </SettingsProvider>
      </Provider>
    </CacheProvider>
  )
}

export default App
